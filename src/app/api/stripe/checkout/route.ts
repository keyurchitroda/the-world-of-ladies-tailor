import _ from "lodash";
import { NextRequest, NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SK);

const getActiveProducts: any = async () => {
  const allProducts = await stripe.products.list();
  const activeProducts = _.filter(
    _.get(allProducts, "data", []),
    (product: any) => _.get(product, "active") === true
  );
  return activeProducts;
};

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { products, address } = reqBody;
    const activeProducts = await getActiveProducts();

    for await (const product of products) {
      const stripeProduct = activeProducts?.find(
        (stripeProd: any) =>
          stripeProd?.name?.toLowerCase() ===
          product?.product_name?.toLowerCase()
      );
      if (stripeProduct === undefined) {
        const prod = await stripe.products.create({
          name: product.product_name,
          default_price_data: {
            unit_amount: product.product_price * 100,
            currency: "inr",
          },
          metadata: {
            product_id: product._id,
          },
        });
      }
    }

    const newActiveProducts = await getActiveProducts();
    let stripeItems: any = [];
    for await (const product of products) {
      const stripeProduct = newActiveProducts?.find(
        (stripeProd: any) =>
          stripeProd?.name?.toLowerCase() ===
          product?.product_name?.toLowerCase()
      );
      if (stripeProduct) {
        stripeItems.push({
          // price: stripeProduct.default_price,
          quantity: 1,
          price_data: {
            currency: "inr",
            product_data: {
              name: product.product_name,
              images: product.product_image,
              metadata: {
                product_id: product._id,
              },
            },
            unit_amount: product.product_price * 100,
          },
        });
      }
    }

    const customer = await stripe.customers.create({
      name: `${address.first_name} ${address.last_name}`,
      email: address.email_id,
      phone: address.phone,
      address: {
        city: address.city,
        country: address.country,
        line1: address.address1,
        line2: address.address2,
        postal_code: address.postal_code,
        state: address.state,
      },
    });
    const productsID = products.map((prod: any) => prod._id);
    // console.log("productsID", productsID);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      success_url: `http://localhost:3000/checkout/success`,
      cancel_url: `http://localhost:3000/checkout/failed`,
      line_items: stripeItems,
      mode: "payment",
      client_reference_id: customer.id,
      customer: customer.id,
      metadata: {
        address_id: address._id,
        product_id: _.toString(productsID),
      },
    });
    return NextResponse.json(
      {
        message: "Payment..!",
        success: true,
        data: session,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

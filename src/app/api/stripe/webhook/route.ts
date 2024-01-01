import _ from "lodash";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import Orders from "@/models/order.model";
import { connect } from "@/dbConfig/dbConfig";
const stripe = require("stripe")(process.env.STRIPE_SK);

connect();

const endpointSecret =
  "whsec_22e54918d4a91cad20e49ffd6486f0250e2e7c07dacb7fe2c3c6e6d080d22480";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.text();
    console.log("event- webhook callll=-=--=>>>");
    const sig = headers().get("stripe-signature") as string;

    let event;
    let data;
    let eventType;
    try {
      event = stripe.webhooks.constructEvent(reqBody, sig, endpointSecret);
      data = event.data.object;
      eventType = event.type;
    } catch (err: any) {
      console.log("event-=-=--=>>>", err);
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    console.log("eventType>>>>>>>>>>>>>>>>>>>>>>>>", eventType);
    if (eventType === "checkout.session.completed") {
      console.log("data", data.metadata.product_id.split(","));
      try {
        const newOrder = new Orders({
          product_id: data.metadata.product_id.split(","),
          address_id: data.metadata.address_id,
          stripe_payment_id: data.id,
          stripe_customer_id: data.customer,
          payment_status: data.payment_status,
          payment_method_type: data.payment_method_types[0],
          total_amount: data.amount_total / 100,
        });
        console.log("newOrder>>>>>>>>>>>>>>>>>", newOrder);
        const neadd = await newOrder.save();
        console.log("neadd>>>>>>>neadd>>>>>>>>>>", neadd);
      } catch (err: any) {
        console.log("err-=-==-=", err);
      }
    }

    return NextResponse.json(
      {
        message: "Payment..!",
        success: true,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

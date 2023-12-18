import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import AddToCart from "@/models/addtocart.model";

connect();
export async function GET(request: NextRequest) {
  try {
    const isId = await getDataFromToken(request);
    if (!isId) {
      return NextResponse.json(
        {
          message: "Unauthorize error",
          success: true,
        },
        { status: 401 }
      );
    }
    const products = await AddToCart.find({ user_id: isId })
      .populate("user_id")
      .populate("product_id");
    return NextResponse.json(
      {
        message: "Products fetched successfully",
        success: true,
        data: products,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const isId = await getDataFromToken(request);
    if (!isId) {
      return NextResponse.json(
        {
          message: "Unauthorize error",
          success: true,
        },
        { status: 401 }
      );
    }
    const reqBody = await request.json();
    const { product_id } = reqBody;
    if (!product_id) {
      return NextResponse.json(
        { error: "Please enter product", success: false },
        { status: 400 }
      );
    }

    const product = await AddToCart.findOne({
      product_id: product_id,
      user_id: isId,
    });
    if (product) {
      return NextResponse.json(
        { error: "Product already exist in cart", success: false },
        { status: 400 }
      );
    }

    const addToCartNew = new AddToCart({
      product_id: product_id,
      user_id: isId,
    });
    await addToCartNew.save();

    return NextResponse.json(
      {
        message: "Product successfully added in cart",
        success: true,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const isId = await getDataFromToken(request);
    if (!isId) {
      return NextResponse.json(
        {
          message: "Unauthorize error",
          success: true,
        },
        { status: 401 }
      );
    }
    const searchParams = request.nextUrl.searchParams;
    const productId = searchParams.get("productId");

    await AddToCart.deleteOne({ product_id: productId });
    return NextResponse.json(
      {
        message: "Products removed successfully",
        success: true,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import ReadymadeProduct from "@/models/readymadeproduct.model";
import { connect } from "@/dbConfig/dbConfig";
import _ from "lodash";

connect();

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const productId = searchParams.get("productId");

    const product = await ReadymadeProduct.findOne({
      _id: productId,
    });

    return NextResponse.json(
      {
        message: "Product fetched successfully",
        success: true,
        data: product,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Address from "@/models/address.model";
import Jwt from "jsonwebtoken";
import Orders from "@/models/order.model";

connect();
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const emailId = searchParams.get("email");
    if (emailId) {
      const orders = await Orders.find({ email_id: emailId })
        .populate("product_id")
        .populate("address_id");
      return NextResponse.json(
        {
          message: "Orders fetched successfully",
          success: true,
          data: orders,
        },
        { status: 200 }
      );
    } else {
      const orders1 = await Orders.find()
        .populate("product_id")
        .populate("address_id");
      return NextResponse.json(
        {
          message: "Orders fetched successfully",
          success: true,
          data: orders1,
        },
        { status: 200 }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

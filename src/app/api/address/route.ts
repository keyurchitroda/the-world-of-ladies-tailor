import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Category from "@/models/category.model";
import { writeFile } from "fs/promises";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import Address from "@/models/address.model";
import Jwt from "jsonwebtoken";

connect();
export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get("Authorization") || "";
    if (token) {
      const decodeToken: any = Jwt.verify(token, process.env.TOEKN_SECRET!);
      const addresses = await Address.find({ email_id: decodeToken.email });
      return NextResponse.json(
        {
          message: "Address fetched successfully",
          success: true,
          data: addresses,
        },
        { status: 200 }
      );
    } else {
      const searchParams = request.nextUrl.searchParams;
      const emailId = searchParams.get("email");
      const addresses = await Address.find({ email_id: emailId });
      return NextResponse.json(
        {
          message: "Address fetched successfully",
          success: true,
          data: addresses,
        },
        { status: 200 }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const reqData = await request.json();

    const {
      email_id,
      first_name,
      last_name,
      phone,
      address1,
      address2,
      country,
      city,
      state,
      postal_code,
    } = reqData;

    const newAddress = new Address({
      email_id,
      first_name,
      last_name,
      phone,
      address1,
      address2,
      country,
      city,
      state,
      postal_code,
    });
    await newAddress.save();
    return NextResponse.json(
      {
        message: "Address updated successfully",
        success: true,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import Jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
  try {
    const token = request.headers.get("Authorization") || "";
    const decodeToken: any = Jwt.verify(token, process.env.TOEKN_SECRET!);
    return decodeToken.id;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

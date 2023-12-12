import { NextRequest } from "next/server";
import Jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    const decodeToken: any = Jwt.verify(token, process.env.TOEKN_SECRET!);
    return decodeToken.id;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

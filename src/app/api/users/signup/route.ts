import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptJS from "bcryptjs";
connect();

export async function GET() {
  try {
    const users = await User.findOne();
    return NextResponse.json(
      { message: "User created successfully", success: true, data: users },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password, isAdmin, isUser } = reqBody;

    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { message: "User already exists", success: false, data: null },
        { status: 400 }
      );
    }
    const salt = await bcryptJS.genSalt(10);
    const hashedPassword = await bcryptJS.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      isAdmin,
      isUser,
    });

    const savedUser = await newUser.save();
    return NextResponse.json(
      { message: "User created successfully", success: true, data: savedUser },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message, success: false, data: null },
      { status: 500 }
    );
  }
}

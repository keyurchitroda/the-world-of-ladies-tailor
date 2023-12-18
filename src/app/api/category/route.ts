import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Category from "@/models/category.model";
import { writeFile } from "fs/promises";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();
export async function GET(request: NextRequest) {
  try {
    // const isId = await getDataFromToken(request);
    // if (!isId) {
    //   return NextResponse.json(
    //     {
    //       message: "Unauthorize error",
    //       success: true,
    //     },
    //     { status: 401 }
    //   );
    // }

    const categories = await Category.find();
    return NextResponse.json(
      {
        message: "Category fetched successfully",
        success: true,
        data: categories,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const categoryName = formData.get("category_name");
    const categoryImage: File | string | any = formData.get("category_image");
    if (!categoryName) {
      return NextResponse.json(
        { error: "Please enter category name", success: false },
        { status: 400 }
      );
    }
    if (!categoryImage) {
      return NextResponse.json(
        { error: "No image found", success: false },
        { status: 400 }
      );
    }

    const category = await Category.findOne({ category_name: categoryName });
    if (category) {
      return NextResponse.json(
        { error: "Category already exist", success: false },
        { status: 400 }
      );
    }

    const newCat = new Category({
      category_name: categoryName,
      category_image: categoryImage.name,
    });
    await newCat.save();
    const byteData = await categoryImage.arrayBuffer();
    const buffer = Buffer.from(byteData);
    const path = `./public/category/${categoryImage.name}`;
    await writeFile(path, buffer);
    return NextResponse.json(
      {
        message: "Category created successfully",
        success: true,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

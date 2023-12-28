import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import CustomizeCategory from "@/models/customize_category.model";

connect();
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const categoryId = searchParams.get("category_id");
    let categories;
    if (categoryId) {
      categories = await CustomizeCategory.find({
        category_id: categoryId,
      }).populate("category_id", "_id category_name category_image status");
    } else {
      categories = await CustomizeCategory.find().populate(
        "category_id",
        "_id category_name category_image status"
      );
    }
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
    const reqBody = await request.json();
    const { category_id, customize_category_name, customize_category_desc } =
      reqBody;

    const category = await CustomizeCategory.findOne({
      customize_category_name,
      category_id,
    });
    if (category) {
      return NextResponse.json(
        { error: "Category already exist", success: false },
        { status: 400 }
      );
    }

    const newCat = new CustomizeCategory({
      customize_category_name,
      category_id,
      customize_category_desc,
    });
    await newCat.save();

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

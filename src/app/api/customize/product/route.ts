import { NextRequest, NextResponse } from "next/server";
import CustomizeProduct from "@/models/customize_product.model";
import { connect } from "@/dbConfig/dbConfig";
import _ from "lodash";
import { writeFile } from "fs/promises";

connect();

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const customizeCategoryId = searchParams.get("customize_category_id");
    let products;
    if (customizeCategoryId) {
      products = await CustomizeProduct.find({
        customize_category_id: customizeCategoryId,
      })
        .populate(
          "customize_category_id",
          "_id category_id customize_category_name customize_category_desc status"
        )
        .populate("category_id", "_id category_name category_image status");
    } else {
      products = await CustomizeProduct.find()
        .populate(
          "customize_category_id",
          "_id category_id customize_category_name customize_category_desc status"
        )
        .populate("category_id", "_id category_name category_image status");
    }
    return NextResponse.json(
      {
        message: "Product fetched successfully",
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
    const reqFormData = await request.formData();
    const categoryId = reqFormData.get("category_id");
    const customizeCategoryId = reqFormData.get("customize_category_id");
    const customizeProductName = reqFormData.get("customize_product_name");
    const customizeProductDesc = reqFormData.get("customize_product_desc");
    const customizeProductImage: File | string | any = reqFormData.get(
      "customize_product_image"
    );
    const customizeProductPrice = reqFormData.get("customize_product_price");
    const isStockAvailable = reqFormData.get("isStockAvailable");

    if (!customizeProductImage) {
      return NextResponse.json(
        { error: "No image found", success: false },
        { status: 400 }
      );
    }

    const products = await CustomizeProduct.findOne({
      customize_product_name: customizeProductName,
      customize_category_id: customizeCategoryId,
      category_id: categoryId,
    });

    if (products) {
      return NextResponse.json(
        { error: "Product already created" },
        { status: 400 }
      );
    }
    const newProduct = new CustomizeProduct({
      category_id: categoryId,
      customize_category_id: customizeCategoryId,
      customize_product_name: customizeProductName,
      customize_product_desc: customizeProductDesc,
      customize_product_image: customizeProductImage.name,
      customize_product_price: customizeProductPrice,
      isStockAvailable,
    });

    await newProduct.save();

    const byteData = await customizeProductImage.arrayBuffer();
    const buffer = Buffer.from(byteData);
    const path = `./public/customizeproduct/${customizeProductImage.name}`;
    await writeFile(path, buffer);

    return NextResponse.json(
      {
        message: "Product created successfully",
        success: true,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

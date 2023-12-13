import { NextRequest, NextResponse } from "next/server";
import ReadymadeProduct from "@/models/readymadeproduct.model";
import { connect } from "@/dbConfig/dbConfig";
import _ from "lodash";
import { writeFile } from "fs/promises";

connect();

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const categoryId = searchParams.get("category_id");
    let products;
    if (categoryId) {
      products = await ReadymadeProduct.find({
        category_id: categoryId,
      }).populate("category_id", "_id category_name category_image status");
    } else {
      products = await ReadymadeProduct.find().populate(
        "category_id",
        "_id category_name category_image status"
      );
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
    const productName = reqFormData.get("product_name");
    const productDesc = reqFormData.get("product_desc");
    const productPrice = reqFormData.get("product_price");
    const isStockAvailable = reqFormData.get("isStockAvailable");
    const productAvailableQty = reqFormData.get("product_available_qty");
    const productSize = reqFormData.get("product_size");

    // Get file array from reqesut body
    let productImages = [];
    for await (const field of reqFormData as any) {
      const [name, value] = field;
      if (
        name === "product_image" &&
        _.get(value, "type", "") !== "text/plain"
      ) {
        if (Array.isArray(value)) {
          productImages.push(...value);
        } else {
          productImages.push(value);
        }
        const byteData = await value.arrayBuffer();
        const buffer = Buffer.from(byteData);
        const path = `./public/product/${value.name}`;
        await writeFile(path, buffer);
      }
    }

    if (_.size(productImages) === 0) {
      return NextResponse.json(
        { error: "Product image not found" },
        { status: 400 }
      );
    }

    const products = await ReadymadeProduct.findOne({
      product_name: productName,
      category_id: categoryId,
    });

    if (products) {
      return NextResponse.json(
        { error: "Product already created" },
        { status: 400 }
      );
    }
    const newProduct = new ReadymadeProduct({
      category_id: categoryId,
      product_name: productName,
      product_desc: productDesc,
      product_image: _.map(productImages, ({ name }) => name),
      product_price: productPrice,
      isStockAvailable,
      product_available_qty: productAvailableQty,
      product_size: productSize,
    });

    await newProduct.save();

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

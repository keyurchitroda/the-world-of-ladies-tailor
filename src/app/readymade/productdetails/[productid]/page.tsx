"use client";

import { config } from "@/apiConfig/config";
import { getCookie } from "@/apiConfig/cookies";
import { defaultAuthTokenString } from "@/helpers/helper";
import {
  AddToCartProduct,
  AddToCartProductWithoutToken,
  getSignleProductDetail,
} from "@/redux/slices/readymadeProductSlice";
import { AppDispatch } from "@/redux/store";
import _ from "lodash";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { ClockLoader } from "react-spinners";

interface PropsParams {
  params: {
    productid: string;
  };
}

const ProductDetail = (props: PropsParams) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [loader, setLoader] = useState(false);

  const product = useSelector(
    (state: any) => state.readymadeProductReducer.product
  );
  const addtocartproducts = useSelector(
    (state: any) => state.readymadeProductReducer.addtocartproducts
  );

  const isLoading = useSelector(
    (state: any) => state.commonReducer.UIGlobalLoader
  );

  useEffect(() => {
    if (_.get(props, "params.productid", "")) {
      getSingleProduct();
    }
  }, [dispatch]);

  const getSingleProduct = async () => {
    await dispatch(
      getSignleProductDetail(_.get(props, "params.productid", ""))
    );
  };

  const addToCartProduct = async (product: any) => {
    setLoader(true);
    const token = getCookie(defaultAuthTokenString);
    if (token) {
      await dispatch(AddToCartProduct(product));
      setLoader(false);
    } else {
      const isProductExist = _.filter(
        addtocartproducts,
        (item) => item._id === product._id
      );
      if (_.size(isProductExist) === 0) {
        await dispatch(AddToCartProductWithoutToken(product));
      } else {
        toast.error("Product already exists in cart");
      }
      setLoader(false);
    }
  };

  const navigateCheckout = () => {
    router.push(`/checkout`);
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="text-center flex justify-center">
            <ClockLoader
              speedMultiplier={10}
              color="black"
              loading={isLoading}
              size={100}
            />
          </div>
        ) : (
          <div className="flex flex-col md:flex-row -mx-4">
            <div className="md:flex-1 px-4">
              <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                <img
                  className="w-full h-full object-cover"
                  src={`${config.ImageUrl}/product/${_.get(
                    product,
                    "product_image[0]",
                    ""
                  )}`}
                  alt="Product Image"
                />
              </div>
              <div className="flex -mx-2 mb-4">
                <div className="w-1/2 px-2">
                  <button
                    onClick={() => addToCartProduct(product)}
                    className="flex justify-center align-middle  items-center w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700"
                  >
                    <ClockLoader
                      speedMultiplier={10}
                      color="#FFFFFF"
                      loading={loader}
                      size={18}
                    />
                    <span className="ms-50" style={{ paddingLeft: "10px" }}>
                      Add to Cart
                    </span>
                  </button>
                </div>
                <div className="w-1/2 px-2">
                  <button
                    onClick={() => navigateCheckout()}
                    className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    Chekcout
                  </button>
                </div>
              </div>
            </div>
            <div className="md:flex-1 px-4">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                {_.get(product, "product_name", "")}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                {_.get(product, "product_desc", "")}
              </p>
              <div className="flex mb-4">
                <div className="mr-4">
                  <span className="font-bold text-gray-700 dark:text-gray-300">
                    Price:
                  </span>
                  <span className="text-gray-600 dark:text-gray-300">
                    Rs.{_.get(product, "product_price", "")}
                  </span>
                </div>
                <div>
                  <span className="font-bold text-gray-700 dark:text-gray-300">
                    Availability:
                  </span>
                  <span className="text-gray-600 dark:text-gray-300">
                    In Stock
                  </span>
                </div>
              </div>
              <div className="mb-4">
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Select Color:
                </span>
                <div className="flex items-center mt-2">
                  <button className="w-6 h-6 rounded-full bg-gray-800 dark:bg-gray-200 mr-2"></button>
                  <button className="w-6 h-6 rounded-full bg-red-500 dark:bg-red-700 mr-2"></button>
                  <button className="w-6 h-6 rounded-full bg-blue-500 dark:bg-blue-700 mr-2"></button>
                  <button className="w-6 h-6 rounded-full bg-yellow-500 dark:bg-yellow-700 mr-2"></button>
                </div>
              </div>
              <div className="mb-4">
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Select Size:
                </span>
                <div className="flex items-center mt-2">
                  <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">
                    S
                  </button>
                  <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">
                    M
                  </button>
                  <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">
                    L
                  </button>
                  <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">
                    XL
                  </button>
                  <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">
                    XXL
                  </button>
                </div>
              </div>
              <div>
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Product Description:
                </span>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                  {_.get(product, "product_desc", "")}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;

"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import {
  AddToCartProduct,
  AddToCartProductWithoutToken,
  getAllCartProducts,
  getAllReadymadeProduct,
} from "@/redux/slices/readymadeProductSlice";
import { config } from "@/apiConfig/config";
import _ from "lodash";
import { ClockLoader } from "react-spinners";
import toast from "react-hot-toast";
import { getCookie } from "@/apiConfig/cookies";
import { defaultAuthTokenString } from "@/helpers/helper";

interface PropsParams {
  params: {
    categoryid: string;
  };
}

interface ReadyMadeProductInterface {
  _id: string;
  category_id: {
    _id: string;
    category_name: string;
    category_image: string;
    status: boolean;
  };
  product_name: string;
  product_desc: string;
  product_image: string[];
  product_price: string;
  isStockAvailable: boolean;
  product_available_qty: number;
  product_size: string;
  status: boolean;
}
const Readymade = (props: PropsParams) => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector(
    (state: any) => state.readymadeProductReducer.products
  );

  const isLoading = useSelector(
    (state: any) => state.commonReducer.UIGlobalLoader
  );

  const addtocartproducts = useSelector(
    (state: any) => state.readymadeProductReducer.addtocartproducts
  );

  useEffect(() => {
    if (_.get(props, "params.categoryid", "")) {
      getReadymadeProductList();
    }
  }, [dispatch]);

  const getReadymadeProductList = async () => {
    await dispatch(
      getAllReadymadeProduct(_.get(props, "params.categoryid", ""))
    );
  };

  const router = useRouter();

  const viewProductDetailsNavigate = () => {
    router.push("/readymade/productdetail");
  };

  const addToCartProduct = async (product: any) => {
    const token = getCookie(defaultAuthTokenString);
    if (token) {
      await dispatch(AddToCartProduct(product));
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
    }
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Customers also purchased
        </h2>
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
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {_.map(products, (product: ReadyMadeProductInterface) => (
              <section key={product._id} className="mx-auto w-fit border">
                <div className="w-72 h-fit group">
                  <div className="relative overflow-hidden">
                    <img
                      className="h-96 w-full object-cover"
                      src={`${config.ImageUrl}/product/${_.get(
                        product,
                        "product_image[0]",
                        ""
                      )}`}
                      alt=""
                    />
                    <div className="absolute h-full w-full bg-black/20 flex flex-col items-center justify-center -bottom-10 group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <button
                        onClick={() => addToCartProduct(product)}
                        className="bg-red-600 text-white py-2 px-5"
                      >
                        Add to cart
                      </button>
                      <button
                        onClick={() => viewProductDetailsNavigate()}
                        className="bg-green-600 text-white py-2 px-5 mt-4"
                      >
                        View details
                      </button>
                    </div>
                  </div>
                  <h2 className="mt-3 text-xl capitalize">
                    {_.get(product, "product_name", "")}
                  </h2>
                  <del className="text-red-700 text-lg">
                    {_.get(product, "product_price", "")}
                  </del>
                  <p className="text-xl mt-2 ml-1 inline-block">
                    {_.get(product, "product_price", "")}
                  </p>
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Readymade;

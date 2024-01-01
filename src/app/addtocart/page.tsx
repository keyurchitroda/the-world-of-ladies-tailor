"use client";

import { config } from "@/apiConfig/config";
import { getCookie } from "@/apiConfig/cookies";
import { defaultAuthTokenString } from "@/helpers/helper";
import { checkoutProductValue } from "@/redux/slices/checkoutSlice";
import { setAddToCartValue } from "@/redux/slices/commonSlice";
import {
  deleteCartProducts,
  deleteCartProductsWithoutToken,
  getAllCartProducts,
} from "@/redux/slices/readymadeProductSlice";
import _ from "lodash";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const AddToCart = () => {
  const route = useRouter();
  const isAddToCartOpen = useSelector(
    (state: any) => state.commonReducer.isAddToCartOpen
  );
  const products = useSelector(
    (state: any) => state.readymadeProductReducer.alladdtocartproducts
  );

  const addtocartproducts = useSelector(
    (state: any) => state.readymadeProductReducer.addtocartproducts
  );

  console.log("addtocartproducts", addtocartproducts);
  const addtocartproductswithouttoken = useSelector(
    (state: any) => state.readymadeProductReducer.addtocartproducts2
  );

  const dispatch = useDispatch<any>();

  console.log("addtocartproducts", addtocartproducts);

  useEffect(() => {
    if (isAddToCartOpen) {
      dispatch(getAllCartProducts());
    }
  }, [isAddToCartOpen]);

  const handleCloseCart = async () => {
    await dispatch(setAddToCartValue(false));
  };

  const handleCheckout = async () => {
    const token = getCookie(defaultAuthTokenString);
    await dispatch(
      checkoutProductValue(
        token ? products.map((prod: any) => prod.product_id) : addtocartproducts
      )
    );
    await dispatch(setAddToCartValue(false));
    route.push("/checkout");
  };

  const totalCartPrice = () => {
    const token = getCookie(defaultAuthTokenString);
    if (token) {
      const totalPrice = products.reduce(
        (acc: any, item: any) =>
          acc + _.toNumber(item.product_id.product_price),
        0
      );
      return totalPrice;
    } else {
      const totalPrice1 = addtocartproducts.reduce(
        (acc: any, item: any) => acc + _.toNumber(item.product_price),
        0
      );
      return totalPrice1;
    }
  };

  const removeProduct = async (productId: string) => {
    const token = getCookie(defaultAuthTokenString);
    if (token) {
      await dispatch(deleteCartProducts(productId));
    } else {
      const removeCartProduct = _.filter(
        addtocartproducts,
        (item) => item._id !== productId
      );
      await dispatch(deleteCartProductsWithoutToken(removeCartProduct));
    }
  };

  const isTokenAvailable = () => {
    const token = getCookie(defaultAuthTokenString);
    if (token) {
      return true;
    } else {
      return false;
    }
  };

  const getCartProducts = () => {
    let cartProduct;
    const token = getCookie(defaultAuthTokenString);
    if (token) {
      cartProduct = (
        <>
          {" "}
          {_.map(products, (item, index) => (
            <li className="flex py-6">
              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <img
                  // src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg"
                  src={`${config.ImageUrl}/product/${_.get(
                    item,
                    "product_id.product_image[0]",
                    ""
                  )}`}
                  alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
                  className="h-full w-full object-cover object-center"
                />
              </div>

              <div className="ml-4 flex flex-1 flex-col">
                <div>
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <h3>
                      <a href="#">{_.get(item, "product_id.product_name")}</a>
                    </h3>
                    <p className="ml-4">
                      Rs. {_.get(item, "product_id.product_price")}
                    </p>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    {_.get(item, "product_id.product_desc")}
                  </p>
                </div>
                <div className="flex flex-1 items-end justify-between text-sm">
                  <p className="text-gray-500">Qty 1</p>

                  <div className="flex">
                    <button
                      type="button"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                      onClick={() =>
                        removeProduct(_.get(item, "product_id._id"))
                      }
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </>
      );
    } else {
      cartProduct = (
        <>
          {" "}
          {_.map(addtocartproducts, (item, index) => (
            <li className="flex py-6">
              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <img
                  // src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg"
                  src={`${config.ImageUrl}/product/${_.get(
                    item,
                    "product_image[0]",
                    ""
                  )}`}
                  alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
                  className="h-full w-full object-cover object-center"
                />
              </div>

              <div className="ml-4 flex flex-1 flex-col">
                <div>
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <h3>
                      <a href="#">{_.get(item, "product_name")}</a>
                    </h3>
                    <p className="ml-4">Rs. {_.get(item, "product_price")}</p>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    {_.get(item, "product_desc")}
                  </p>
                </div>
                <div className="flex flex-1 items-end justify-between text-sm">
                  <p className="text-gray-500">Qty 1</p>

                  <div className="flex">
                    <button
                      type="button"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                      onClick={() => removeProduct(_.get(item, "_id"))}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </>
      );
    }
    return cartProduct;
  };

  const getProductList = () => {
    return (
      <>
        <div className="mt-8">
          <div className="flow-root">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {getCartProducts()}
            </ul>
          </div>
        </div>
      </>
    );
  };

  const btnDisable = () => {
    const token = getCookie(defaultAuthTokenString);
    let isDisable = false;
    if (token) {
      isDisable = _.size(products) === 0;
    } else {
      isDisable = _.size(addtocartproducts) === 0;
    }
    return isDisable;
  };

  return (
    <>
      {isAddToCartOpen && (
        <div
          className="relative z-20"
          aria-labelledby="slide-over-title"
          role="dialog"
          aria-modal="true"
        >
          x
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <div className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <h2
                          className="text-lg font-medium text-gray-900"
                          id="slide-over-title"
                        >
                          Shopping cart
                        </h2>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={handleCloseCart}
                          >
                            <span className="absolute -inset-0.5"></span>
                            <span className="sr-only">Close panel</span>
                            <svg
                              className="h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>

                      {getProductList()}
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>₹{totalCartPrice()}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div className="mt-6">
                        <button
                          onClick={handleCheckout}
                          className={`${
                            btnDisable() && "opacity-40 cursor-not-allowed"
                          } w-full flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700`}
                          disabled={btnDisable()}
                        >
                          Checkout
                        </button>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddToCart;

"use client";

import { config } from "@/apiConfig/config";
import _ from "lodash";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ClockLoader } from "react-spinners";

const CustomizeProductDetails = () => {
  const [isDetailsOpen, setIsDetailOpen] = useState(false);
  const selectedProducts = useSelector(
    (state: any) => state.customizeReducer.selectedProducts
  );
  const viewdetails = useSelector(
    (state: any) => state.customizeReducer.viewdetails
  );
  const [addDetails, setAddDetails] = useState(
    selectedProducts.filter((item: any) => !item.customize_product_image)
  );

  console.log("viewdetails", viewdetails);
  const viewAllDetails = () => {
    setIsDetailOpen(!isDetailsOpen);
  };

  const getproductFilter = (items: any) => {
    const itemsWithImages = items.filter(
      (item: any) => item.customize_product_image
    );
    return itemsWithImages;
  };

  const TotalPrice = (items: any) => {
    const itemsWithImages = items.filter(
      (item: any) => item.customize_product_image
    );
    let sumOfPrices = itemsWithImages.reduce((total: any, product: any) => {
      // Parse the price to a number (assuming price is a string)
      let price = parseFloat(product.customize_product_price);

      // Add the parsed price to the total
      return total + price;
    }, 0); // Start with an initial total of 0
    console.log("sumOfPrices", sumOfPrices);

    // Add the base price to the sum
    let totalPrice = sumOfPrices + 200;
    // Render the total price
    return totalPrice.toFixed(2);
  };

  const removeDetail = (indexToRemove: any) => {};
  return (
    <>
      <div className="mt-24 relative overflow-x-auto shadow-md sm:rounded-lg p-4 max-w-full ">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-white uppercase bg-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product
              </th>
              <th scope="col" className="px-6 py-3">
                Qty
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {_.map(viewdetails, (items, index) => (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  <div>
                    <b>Stiching name </b> :{" "}
                    {_.get(addDetails, "[0].stitchingname", "")}
                  </div>
                  <div>
                    <b>Addition Instruction </b> :{" "}
                    {_.get(addDetails, "[0].additioninstruction", "")}
                  </div>
                  <div>
                    <b>Size </b> : {_.get(addDetails, "[0].size", "")}
                  </div>
                  <div>
                    <button
                      onClick={viewAllDetails}
                      className="relative flex items-center w-full p-4 font-semibold text-left transition-all ease-in border-b border-solid cursor-pointer border-slate-100 text-blue-600  rounded-t-1 group text-dark-500"
                    >
                      Click here to view details
                    </button>
                    {isDetailsOpen && (
                      <div className="p-4 text-sm leading-normal text-blue-gray-500/80">
                        <div className="container p-5 pt-0 ">
                          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 ">
                            {_.map(getproductFilter(items), (item, index) => (
                              <div
                                key={_.get(item, "_id", "")}
                                className="border-2 rounded-md	p-2 -bottom-10 cursor-no-drop"
                              >
                                <div className="mb-6 lg:mb-0">
                                  <img
                                    src={`${
                                      config.ImageUrl
                                    }/customizeproduct/${_.get(
                                      item,
                                      "customize_product_image",
                                      ""
                                    )}`}
                                    className="w-full rounded-md shadow-lg"
                                  />
                                </div>
                                <h2 className="mt-3 text-md capitalize">
                                  {_.get(item, "customize_product_name", "")}
                                </h2>
                                <p className="text-base mt-1 ml-1 inline-block">
                                  Rs.{" "}
                                  {_.get(item, "customize_product_price", "")}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </td>

                <td className="px-6 py-4 align-top">
                  <div className="flex items-center">
                    <button
                      className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                      type="button"
                    >
                      <span className="sr-only">Quantity button</span>
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 2"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M1 1h16"
                        />
                      </svg>
                    </button>
                    <div>
                      <input
                        type="number"
                        id="first_product"
                        className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="1"
                        required
                      />
                    </div>
                    <button
                      className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                      type="button"
                    >
                      <span className="sr-only">Quantity button</span>
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 18"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 1v16M1 9h16"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white align-top">
                  <div>Rs.{TotalPrice(items)}</div>
                </td>
                <td className="px-6 py-4 align-top">
                  <button
                    onClick={() => removeDetail(index)}
                    className="font-medium text-red-600 dark:text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end">
          <button className="bg-red-600 text-white py-2 px-5 mt-4">
            Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default CustomizeProductDetails;

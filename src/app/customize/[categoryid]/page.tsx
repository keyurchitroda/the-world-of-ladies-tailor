"use client";

import { config } from "@/apiConfig/config";
import {
  getAllCustomizeCategory,
  getAllCustomizeProduct,
  netxCategoryStep,
} from "@/redux/slices/customizeSlice";
import { AppDispatch } from "@/redux/store";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClockLoader, PacmanLoader, SyncLoader } from "react-spinners";

interface PropsParams {
  params: {
    categoryid: string;
  };
}

const Customize = (props: PropsParams) => {
  const dispatch = useDispatch<AppDispatch>();
  const [loader, setLoader] = useState(false);

  const categories = useSelector(
    (state: any) => state.customizeReducer.categories
  );

  const currentCategory = useSelector(
    (state: any) => state.customizeReducer.current_category
  );

  const products = useSelector((state: any) => state.customizeReducer.products);
  const isLoading = useSelector(
    (state: any) => state.commonReducer.UIGlobalLoader
  );

  useEffect(() => {
    if (_.get(props, "params.categoryid", "")) {
      getCustomizeCategoryList();
    }
  }, [dispatch]);

  const getCustomizeCategoryList = async () => {
    setLoader(true);
    await dispatch(
      getAllCustomizeCategory(_.get(props, "params.categoryid", ""))
    );
    setLoader(false);
  };

  const handleNextClick = async () => {
    if (currentCategory < categories.length - 1) {
      const nextStepId = categories[currentCategory + 1]._id;
      console.log("Next Step ID:", nextStepId);
      await dispatch(netxCategoryStep(currentCategory + 1));
      await dispatch(getAllCustomizeProduct(nextStepId));
    } else {
      console.log("End of steps reached");
    }
  };

  const handlePreviousClick = async () => {
    if (currentCategory > 0) {
      const previousStepId = categories[currentCategory - 1]._id;
      console.log("Previous Step ID:", previousStepId);
      await dispatch(netxCategoryStep(currentCategory - 1));
      await dispatch(getAllCustomizeProduct(previousStepId));
    } else {
      console.log("Start of steps reached");
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-6 lg:max-w-7xl lg:px-8">
      <ol className="flex items-center justify-center flex-wrap w-full p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 sm:text-base dark:bg-gray-800 dark:border-gray-700 sm:p-4 sm:space-x-4 rtl:space-x-reverse">
        {_.size(categories) === 0 && (
          <SyncLoader color="#424242" loading={isLoading} size={15} />
        )}
        {_.map(categories, (item, index) => (
          <li
            className={`flex items-center ${
              index === currentCategory && `text-blue-600 dark:text-blue-500`
            } `}
          >
            <span className="flex items-center justify-center w-5 h-5 me-2 text-xs border border-blue-600 rounded-full shrink-0 dark:border-blue-500">
              {index + 1}
            </span>
            {_.get(item, "customize_category_name", "")}
            <svg
              className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 12 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m7 9 4-4-4-4M1 9l4-4-4-4"
              />
            </svg>
          </li>
        ))}
      </ol>

      <div className="container p-5 ">
        {isLoading ? (
          <div className="text-center flex justify-center">
            <ClockLoader
              speedMultiplier={10}
              color="#424242"
              loading={isLoading}
              size={100}
            />
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
            {_.map(products, (item) => (
              <div
                key={_.get(item, "_id", "")}
                className="border-2	rounded-md	p-2 -bottom-10 hover:bg-gray-800 hover:text-white cursor-pointer"
              >
                <div className="mb-6 lg:mb-0">
                  <img
                    src={`${config.ImageUrl}/customizeproduct/${_.get(
                      item,
                      "customize_product_image",
                      ""
                    )}`}
                    className="w-full rounded-md shadow-lg"
                  />
                </div>
                <h2 className="mt-3 text-lg capitalize">
                  {_.get(item, "customize_product_name", "")}
                </h2>
                <p className="text-base mt-1 ml-1 inline-block">
                  Rs. {_.get(item, "customize_product_price", "")}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <ol className=" w-full p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 sm:text-base dark:bg-gray-800 dark:border-gray-700 sm:p-4 sm:space-x-4 rtl:space-x-reverse">
        <div className="flex justify-between align-middle">
          {currentCategory > 0 && (
            <button
              onClick={handlePreviousClick}
              className="bg-red-600 text-white py-2 px-5 mt-4"
            >
              Prev
            </button>
          )}
          {currentCategory < categories.length - 1 ? (
            <button
              onClick={handleNextClick}
              className=" bg-green-600 text-white py-2 px-5 mt-4"
            >
              Next
            </button>
          ) : (
            <button className="bg-red-600 text-white py-2 px-5 mt-4">
              Add To Cart
            </button>
          )}
        </div>
      </ol>
    </div>
  );
};

export default Customize;

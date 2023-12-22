"use client";

import { config } from "@/apiConfig/config";
import SpecialInstructionForm from "@/components/SpecialInstructionForm";
import {
  customizeViewDetails,
  getAllCustomizeCategory,
  getAllCustomizeProduct,
  netxCategoryStep,
  selectCustomizeProduct,
} from "@/redux/slices/customizeSlice";
import { AppDispatch } from "@/redux/store";
import _ from "lodash";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const [loader, setLoader] = useState(false);

  const categories = useSelector(
    (state: any) => state.customizeReducer.categories
  );

  const currentCategory = useSelector(
    (state: any) => state.customizeReducer.current_category
  );

  const products = useSelector((state: any) => state.customizeReducer.products);
  const selectedProducts = useSelector(
    (state: any) => state.customizeReducer.selectedProducts
  );

  const isLoading = useSelector(
    (state: any) => state.commonReducer.UIGlobalLoader
  );

  console.log("selected", selectedProducts);

  const onViewDetails = async () => {
    await dispatch(customizeViewDetails(selectedProducts));
    router.push(`/customize/productdetails`);
  };

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
      await dispatch(netxCategoryStep(currentCategory + 1));
      await dispatch(getAllCustomizeProduct(nextStepId));
    } else {
      console.log("End of steps reached");
    }
  };

  const handlePreviousClick = async () => {
    if (currentCategory > 0) {
      const previousStepId = categories[currentCategory - 1]._id;
      await dispatch(netxCategoryStep(currentCategory - 1));
      await dispatch(getAllCustomizeProduct(previousStepId));
    } else {
      console.log("Start of steps reached");
    }
  };

  const isSpecailInstruction = () => {
    const categoryVal = categories.at(currentCategory);
    if (
      _.get(categoryVal, "customize_category_name", "") ===
      "Special Instructions"
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleProductSelection = async (item: any) => {
    await dispatch(selectCustomizeProduct(item));
  };

  const isProductSelcted = (item: any) => {
    const isSelected = _.some(
      selectedProducts,
      (product) =>
        product._id === item._id &&
        product.category_id._id === item.category_id._id
    );
    return isSelected;
  };

  const getStepperClasses = (index: any, item: any) => {
    let classes;
    const isSelected = _.some(
      selectedProducts,
      (product) => product.customize_category_id._id === item._id
    );
    if (index === currentCategory) {
      classes =
        " text-blue-700 bg-blue-100 border border-blue-300 rounded-lg dark:bg-gray-800 dark:border-blue-800 dark:text-blue-400";
    } else if (isSelected) {
      classes =
        "text-green-700 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:border-green-800 dark:text-green-400";
    } else {
      classes =
        " text-gray-900 bg-gray-100 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400";
    }
    return classes;
  };

  const TotalPrice = () => {
    const itemsWithImages = selectedProducts.filter(
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
    return (
      <div>
        <p>{`Total Price: Rs.${totalPrice.toFixed(2)}`}</p>
      </div>
    );
  };
  return (
    <>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-6 lg:max-w-7xl lg:px-8 flex pr-0 pl-0">
        <ol className="space-y-4 w-72">
          {_.map(categories, (item, index) => (
            <li>
              <div
                role="alert"
                className={`w-full p-4 ${getStepperClasses(index, item)}`}
              >
                <div className="flex items-center justify-between">
                  <span className="sr-only">Account info</span>
                  <h3
                    className="font-medium max-sm:w-24"
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {index + 1} {_.get(item, "customize_category_name", "")}
                  </h3>
                  <svg
                    className="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 16 12"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 5.917 5.724 10.5 15 1.5"
                    />
                  </svg>
                </div>
              </div>
            </li>
          ))}
        </ol>

        {isSpecailInstruction() ? (
          <div className="container p-20 pt-0 max-sm:p-4">
            <div className="">
              <SpecialInstructionForm
                categoryVal={categories.at(currentCategory)}
              />
            </div>
          </div>
        ) : (
          <div className="container p-5 pt-0 ">
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
                {_.map(products, (item, index) => (
                  <div
                    key={_.get(item, "_id", "")}
                    // className="border-2	rounded-md	p-2 -bottom-10 hover:bg-gray-800 hover:text-white cursor-pointer"
                    className={`border-2 rounded-md p-2 ${
                      isProductSelcted(item)
                        ? "bg-gray-800 text-white"
                        : "hover:bg-gray-800 hover:text-white"
                    } cursor-pointer`}
                    onClick={() => handleProductSelection(item)}
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
        )}
      </div>
      <ol
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          // zIndex: 999,
        }}
        className="flex justify-around items-center w-full p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 sm:text-base dark:bg-gray-800 dark:border-gray-700 sm:p-4 sm:space-x-4 rtl:space-x-reverse"
      >
        <span className="text-lg text-pink-700 mt-4">{TotalPrice()}</span>
        <div className="flex justify-end align-middle">
          <button
            onClick={handlePreviousClick}
            className={`bg-red-600 text-white py-2 px-5 mt-4 ${
              currentCategory === 0 && "opacity-60"
            }`}
            disabled={currentCategory === 0}
          >
            Prev
          </button>
          {currentCategory < categories.length - 1 ? (
            <button
              onClick={handleNextClick}
              className=" bg-green-600 text-white py-2 px-5 mt-4"
            >
              Next
            </button>
          ) : (
            <button
              onClick={onViewDetails}
              className="bg-blue-500 text-white py-2 px-5 mt-4"
            >
              View details
            </button>
          )}
        </div>
      </ol>
    </>
  );
};

export default Customize;

"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "@/redux/slices/categorySlice";
import { AppDispatch } from "@/redux/store";
import _ from "lodash";
import { config } from "@/apiConfig/config";

const Category = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector(
    (state: any) => state.categoryReducer.categories
  );
  useEffect(() => {
    getCategoryList();
  }, [dispatch]);

  const getCategoryList = async () => {
    await dispatch(getAllCategory());
  };

  const getSubCategoryButtonRender = (category_id: string) => {
    const onPush = (routes: string, catid: string) => {
      router.push(`/${routes}/${catid}`, { scroll: true });
    };
    return (
      <div className="w-full h-32 absolute  -bottom-[130px] group-hover:bottom-20 z-auto duration-700 flex flex-col justify-between p-5">
        <button
          onClick={() => onPush("readymade", category_id)}
          className="bg-green-700 hover:bg-green-500 text-white font-semibold py-2 px-4 border border-green-400 rounded shadow"
        >
          Readymade
        </button>
        <button
          onClick={() => onPush("customize", category_id)}
          className="bg-sky-700 hover:bg-sky-500  text-white font-semibold py-2 px-4 border border-sky-400 rounded shadow"
        >
          Customize
        </button>
      </div>
    );
  };

  return (
    <div className="container p-6">
      <div className="grid gap-12 md:grid-cols-3 sm:grid-cols-6">
        {_.map(categories, (item) => (
          <div className="mb-6 lg:mb-0 w-full relative group">
            <p className="text-start font-bold text-lg">
              {_.get(item, "category_name", "")}
            </p>
            <div className="max-w-80 max-h-80 relative overflow-y-hidden  ">
              <div className="hover:opacity-60">
                <img
                  className="w-full h-full "
                  src={`${config.ImageUrl}/category/${_.get(
                    item,
                    "category_image",
                    ""
                  )}`}
                />
              </div>
              {getSubCategoryButtonRender(_.get(item, "_id", ""))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;

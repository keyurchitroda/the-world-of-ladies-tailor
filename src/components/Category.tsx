"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "@/redux/slices/categorySlice";
import { AppDispatch } from "@/redux/store";
import _ from "lodash";
import { config } from "@/apiConfig/config";
import { ClockLoader } from "react-spinners";

const Category = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [loader, setLoader] = useState(false);

  const categories = useSelector(
    (state: any) => state.categoryReducer.categories
  );
  const isLoading = useSelector(
    (state: any) => state.commonReducer.UIGlobalLoader
  );

  useEffect(() => {
    getCategoryList();
  }, [dispatch]);

  const getCategoryList = async () => {
    await dispatch(getAllCategory());
  };

  const getSubCategoryButtonRender = (category_id: string) => {
    const onPush = (routes: string, catid: string) => {
      setLoader(true);
      router.push(`/${routes}/${catid}`);
      setLoader(false);
    };
    return (
      <div className="w-full h-32 absolute  -bottom-[130px] group-hover:bottom-20 z-auto duration-700 flex flex-col justify-between p-5">
        <button
          onClick={() => onPush("readymade", category_id)}
          className="flex justify-center align-middle bg-green-700 hover:bg-green-500 text-white font-semibold py-2 px-4 border border-green-400 rounded shadow"
        >
          <ClockLoader
            speedMultiplier={10}
            color="#FFFFFF"
            loading={loader}
            size={22}
          />
          <span className="ms-50" style={{ paddingLeft: "10px" }}>
            Readymade
          </span>
        </button>
        <button
          onClick={() => onPush("customize", category_id)}
          className="flex justify-center align-middle bg-sky-700 hover:bg-sky-500  text-white font-semibold py-2 px-4 border border-sky-400 rounded shadow"
        >
          <ClockLoader
            speedMultiplier={10}
            color="#FFFFFF"
            loading={loader}
            size={22}
          />
          <span className="ms-50" style={{ paddingLeft: "10px" }}>
            Customize
          </span>
        </button>
      </div>
    );
  };

  return (
    <div className="container p-6">
      <div className="text-center flex justify-center">
        <ClockLoader
          speedMultiplier={10}
          color="black"
          loading={isLoading}
          size={100}
        />
      </div>
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

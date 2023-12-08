"use client";

import React from "react";
import { useRouter } from "next/navigation";

const Category = () => {
  const router = useRouter();
  const getSubCategoryButtonRender = (category?: string) => {
    const onPush = (routes: string) => {
      router.push(`/${routes}`, { scroll: true });
    };
    return (
      <div className="w-full h-32 absolute  -bottom-[130px] group-hover:bottom-20 z-auto duration-700 flex flex-col justify-between p-5">
        <button
          onClick={() => onPush("readymade")}
          className="bg-green-700 hover:bg-green-500 text-white font-semibold py-2 px-4 border border-green-400 rounded shadow"
        >
          Readymade
        </button>
        <button
          onClick={() => onPush("customize")}
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
        <div className="mb-6 lg:mb-0 w-full relative group">
          <p className="text-start font-bold text-lg">Category 1</p>
          <div className="max-w-80 max-h-80 relative overflow-y-hidden  ">
            <div className="hover:opacity-60">
              <img
                className="w-full h-full "
                src="https://tecdn.b-cdn.net/img/new/fluid/city/113.webp"
              />
            </div>
            {getSubCategoryButtonRender()}
          </div>
        </div>
        <div className="mb-6 lg:mb-0 w-full relative group">
          <p className="text-start font-bold text-lg">Category 2</p>
          <div className="max-w-80 max-h-80 relative overflow-y-hidden ">
            <div>
              <img
                src="https://tecdn.b-cdn.net/img/new/fluid/city/111.webp"
                className="w-full rounded-md shadow-lg"
              />
            </div>
            {getSubCategoryButtonRender()}
          </div>
        </div>
        <div className="mb-6 lg:mb-0">
          <p className="text-start font-bold text-lg">Category 3</p>
          <img
            src="https://tecdn.b-cdn.net/img/new/fluid/city/112.webp"
            className="w-full rounded-md shadow-lg"
          />
        </div>
        <div className="mb-6 lg:mb-0">
          <p className="text-start font-bold text-lg">Category 4</p>
          <img
            src="https://tecdn.b-cdn.net/img/new/fluid/city/114.webp"
            className="w-full rounded-md shadow-lg"
          />
        </div>
        <div className="mb-6 lg:mb-0">
          <p className="text-start font-bold text-lg">Category 5</p>
          <img
            src="https://tecdn.b-cdn.net/img/new/fluid/city/115.webp"
            className="w-full rounded-md shadow-lg"
          />
        </div>
        <div className="mb-6 lg:mb-0">
          <p className="text-start font-bold text-lg">Category 6</p>
          <img
            src="https://tecdn.b-cdn.net/img/new/fluid/city/116.webp"
            className="w-full rounded-md shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Category;

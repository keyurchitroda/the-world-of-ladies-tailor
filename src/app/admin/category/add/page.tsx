import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import React from "react";

const Add = () => {
  return (
    <>
      <Breadcrumb pageName="Add new category" />
      <div className="flex flex-col gap-9">
        {/* <!-- Contact Form --> */}
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black ">Category</h3>
          </div>
          <form action="#">
            <div className="p-6.5">
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black ">
                  Category name<span className="text-meta-1">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter category"
                  className="text-black w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>

              <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Add;

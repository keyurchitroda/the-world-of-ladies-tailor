"use client";

import { ErrorMessage, Field, Form, Formik, getIn } from "formik";
import React, { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { AppDispatch } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setInputValue } from "@/redux/slices/customizeSlice";
import _ from "lodash";

const SpecialInstructionForm = ({ categoryVal }: any) => {
  let [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const selectedProducts = useSelector(
    (state: any) => state.customizeReducer.selectedProducts
  );
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  const getStyles = (errors: any, fieldName: string) => {
    if (getIn(errors, fieldName)) {
      return {
        border: "1px solid red",
      };
    }
  };

  const [inputValues, setInputValues] = useState({
    customize_category_id: "",
  } as any);

  const handleInputChange = async (event: any) => {
    const { name, value } = event.target;
    const filterVal = _.filter(
      selectedProducts,
      (item) =>
        _.get(item, "customize_category_id._id", "") ===
        _.get(categoryVal, "_id", "")
    );
    const updatedInputValues = {
      ...filterVal[0],
      [name]: value,
      customize_category_id: categoryVal,
    };
    setInputValues(updatedInputValues);
    await dispatch(setInputValue(updatedInputValues));
  };

  const handleSetSize = async (value: any) => {
    const filterVal = _.filter(
      selectedProducts,
      (item) =>
        _.get(item, "customize_category_id._id", "") ===
        _.get(categoryVal, "_id", "")
    );
    const updatedInputValues = {
      ...filterVal[0],
      size: value,
      customize_category_id: categoryVal,
    };
    setInputValues(updatedInputValues);
    await dispatch(setInputValue(updatedInputValues));
  };

  const getValue = (name: any) => {
    const filterVal = _.filter(
      selectedProducts,
      (item) =>
        _.get(item, "customize_category_id._id", "") ===
        _.get(categoryVal, "_id", "")
    );
    return filterVal[0]?.[name];
  };

  return (
    <div className="">
      <div>
        <div>
          <h2 className="text-lg font-medium text-gray-900">
            Special Instruction and Size
          </h2>

          <div className="mt-4 border-t border-gray-200 pt-10">
            <label
              htmlFor="email-address"
              className="block text-sm font-medium text-gray-700"
            >
              Stitching Name:
            </label>
            <div className="mt-1">
              <input
                type="text"
                id="stitchingname"
                value={getValue("stitchingname")}
                name="stitchingname"
                autoComplete="stitchingname"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="mt-4 pb-12 mb-8 border-b border-gray-300 dark:border-gray-700">
            <label
              htmlFor="additioninstruction"
              className="block text-sm font-medium text-gray-700"
            >
              Additional Instuction:
            </label>
            <div className="mt-1">
              <textarea
                rows={4}
                cols={50}
                // multiple
                id="additioninstruction"
                value={getValue("additioninstruction")}
                name="additioninstruction"
                autoComplete="additioninstruction"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className=" mt-4 ">
            <div className="flex justify-between items-center">
              <h2 className="mb-2 text-xl font-bold dark:text-gray-400">
                Size
              </h2>
              <button
                type="button"
                className="py-3 mb-2 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                onClick={openModal}
              >
                Size chart
              </button>
            </div>
            <div className="flex flex-wrap -mb-2">
              <button
                onClick={() => handleSetSize("XS")}
                className={`py-5 mb-2 mr-3 border w-16 ${
                  getValue("size") === "XS"
                    ? "text-blue-600 border-blue-400 hover:border-blue-400 hover:text-blue-600"
                    : "dark:border-gray-400 dark:hover:border-gray-300 dark:text-gray-400"
                }`}
              >
                XS
              </button>
              <button
                onClick={() => handleSetSize("S")}
                className={`py-5 mb-2 mr-3 border w-16 ${
                  getValue("size") === "S"
                    ? "text-blue-600 border-blue-400 hover:border-blue-400 hover:text-blue-600"
                    : "dark:border-gray-400 dark:hover:border-gray-300 dark:text-gray-400"
                }`}
              >
                S
              </button>
              <button
                onClick={() => handleSetSize("M")}
                className={`py-5 mb-2 mr-3 border w-16 ${
                  getValue("size") === "M"
                    ? "text-blue-600 border-blue-400 hover:border-blue-400 hover:text-blue-600"
                    : "dark:border-gray-400 dark:hover:border-gray-300 dark:text-gray-400"
                }`}
              >
                M
              </button>
              <button
                onClick={() => handleSetSize("L")}
                className={`py-5 mb-2 mr-3 border w-16 ${
                  getValue("size") === "L"
                    ? "text-blue-600 border-blue-400 hover:border-blue-400 hover:text-blue-600"
                    : "dark:border-gray-400 dark:hover:border-gray-300 dark:text-gray-400"
                }`}
              >
                L
              </button>
              <button
                onClick={() => handleSetSize("XL")}
                className={`py-5 mb-2 mr-3 border w-16 ${
                  getValue("size") === "XL"
                    ? "text-blue-600 border-blue-400 hover:border-blue-400 hover:text-blue-600"
                    : "dark:border-gray-400 dark:hover:border-gray-300 dark:text-gray-400"
                }`}
              >
                XL
              </button>
              <button
                onClick={() => handleSetSize("XXL")}
                className={`py-5 mb-2 mr-3 border w-16 ${
                  getValue("size") === "XXL"
                    ? "text-blue-600 border-blue-400 hover:border-blue-400 hover:text-blue-600"
                    : "dark:border-gray-400 dark:hover:border-gray-300 dark:text-gray-400"
                }`}
              >
                XXL
              </button>
            </div>

            <Transition appear show={isOpen} as={Fragment}>
              <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-black/25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                  <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium leading-6 text-gray-900"
                        >
                          Size Chart
                        </Dialog.Title>
                        <div className="mt-2">
                          <img src="/sizechart2.webp" />
                        </div>

                        <div className="mt-4">
                          <button
                            type="button"
                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            onClick={closeModal}
                          >
                            Got it, thanks!
                          </button>
                        </div>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialInstructionForm;

"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { getAllCategory } from "@/redux/slices/categorySlice";
import { getAllCustomizeCategory } from "@/redux/slices/customizeSlice";
import { AppDispatch } from "@/redux/store";
import { addNewCustomizeProductService } from "@/services/customizeService";
import { addNewReadymadeProductService } from "@/services/readymadeProductService";
import { ErrorMessage, Field, Form, Formik } from "formik";
import _ from "lodash";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

const Add = () => {
  const categories = useSelector(
    (state: any) => state.categoryReducer.categories
  );

  const categories1 = useSelector(
    (state: any) => state.customizeReducer.categories
  );
  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    getCategoryList();
  }, [dispatch]);

  const getCategoryList = async () => {
    await dispatch(getAllCategory());
  };

  const ProductSchema: any = Yup.object().shape({
    product_name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Please enter product name"),
    product_desc: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Please enter  product description"),
    category: Yup.string().required("Please select the category"),
    customize_category: Yup.string().required("Please select the category"),
    is_stock: Yup.string().required("Please select the stock"),
    product_price: Yup.string().required("Please enter product price"),
  });

  const onSaveProduct = async (values: any, resetForm: any) => {
    try {
      const formData = new FormData();
      formData.append("category_id", values.category);
      formData.append("customize_category_id", values.customize_category);
      formData.append("customize_product_name", values.product_name);
      formData.append("customize_product_desc", values.product_desc);
      formData.append("customize_product_image", values.file1);
      formData.append("customize_product_price", values.product_price);
      formData.append(
        "isStockAvailable",
        values.is_stock === "Yes" ? "true" : "false"
      );

      const response: any = await addNewCustomizeProductService(formData);
      console.log("response>>>>>>>>", response);
      if (response.success === true) {
        toast.success(response.message);
        resetForm();
        router.push("/admin/customize/product/list");
      }
    } catch (error: any) {
      toast.error(error.message.error);
    }
  };

  const handleCategoryValue = async (event: any, setFieldValue: any) => {
    setFieldValue("category", event.target.value);
    setFieldValue("customize_category", "");
    await dispatch(getAllCustomizeCategory(event?.target.value));
  };

  return (
    <>
      <Breadcrumb pageName="Add new customize product" />
      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black pl-5">Customize Product</h3>
          </div>
          <Formik
            initialValues={{
              category: "",
              customize_category: "",
              product_name: "",
              product_desc: "",
              is_stock: "",
              product_price: "",
            }}
            validationSchema={ProductSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              onSaveProduct(values, resetForm);
            }}
          >
            {({ isSubmitting, errors, resetForm, values, setFieldValue }) => (
              <Form className="w-full p-5">
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="category"
                    >
                      Category
                    </label>
                    <Field
                      as="select"
                      id="category"
                      name="category"
                      autoComplete="country"
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4  leading-tight focus:outline-none focus:bg-white"
                      style={errors.category ? { borderColor: "red" } : {}}
                      onChange={(e: any) =>
                        handleCategoryValue(e, setFieldValue)
                      }
                    >
                      <option disabled value="">
                        Select Category
                      </option>
                      {categories.map((item: any, index: any) => (
                        <option key={index} value={item._id}>
                          {item.category_name}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      className="text-red-600"
                      name="category"
                      component="span"
                    />
                  </div>

                  <div className="w-full px-3 mb-6 md:mb-0 mt-4">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="customize_category"
                    >
                      Customize Category
                    </label>
                    <Field
                      as="select"
                      id="customize_category"
                      name="customize_category"
                      autoComplete="country"
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4  leading-tight focus:outline-none focus:bg-white"
                      style={
                        errors.customize_category ? { borderColor: "red" } : {}
                      }
                    >
                      <option disabled value="">
                        Select Category
                      </option>
                      {categories1.map((item: any, index: any) => (
                        <option key={index} value={item._id}>
                          {item.customize_category_name}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      className="text-red-600"
                      name="customize_category"
                      component="span"
                    />
                  </div>
                  <div className="w-full px-3 mb-6 md:mb-0 mt-4">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-category-name"
                    >
                      Customize Product Name
                    </label>
                    <Field
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4  leading-tight focus:outline-none focus:bg-white"
                      id="grid-product-name"
                      name="product_name"
                      type="text"
                      placeholder="Product name"
                      style={errors.product_name ? { borderColor: "red" } : {}}
                    />
                    <ErrorMessage
                      className="text-red-600"
                      name="product_name"
                      component="span"
                    />
                  </div>
                  <div className="w-full px-3 mb-6 md:mb-0 mt-4">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-category-desc"
                    >
                      Customize Product Description
                    </label>
                    <Field
                      as="textarea"
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4  leading-tight focus:outline-none focus:bg-white"
                      id="grid-product-desc"
                      name="product_desc"
                      type="text"
                      placeholder="Product desc"
                      style={errors.product_desc ? { borderColor: "red" } : {}}
                    />
                    <ErrorMessage
                      className="text-red-600"
                      name="product_desc"
                      component="span"
                    />
                  </div>
                  <div className="w-full px-3 mt-4">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-category-img"
                    >
                      Customize Product Image
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-category-img"
                      type="file"
                      placeholder="Doe"
                      name="category_img"
                      onChange={(event: any) => {
                        setFieldValue("file1", event.currentTarget.files[0]);
                      }}
                    />
                  </div>
                  <div className="w-full px-3 mb-6 md:mb-0 mt-4">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-product-price"
                    >
                      Customize Product Price
                    </label>
                    <Field
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4  leading-tight focus:outline-none focus:bg-white"
                      id="grid-product-price"
                      name="product_price"
                      type="number"
                      placeholder="3000"
                      style={errors.product_price ? { borderColor: "red" } : {}}
                    />
                    <ErrorMessage
                      className="text-red-600"
                      name="product_price"
                      component="span"
                    />
                  </div>
                  <div className="w-full px-3 mb-6 md:mb-0 mt-4">
                    <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                      <div className="w-full">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="is_stock"
                        >
                          Is Stock Available
                        </label>
                        <Field
                          as="select"
                          id="is_stock"
                          name="is_stock"
                          autoComplete="is_stock"
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4  leading-tight focus:outline-none focus:bg-white"
                          style={errors.is_stock ? { borderColor: "red" } : {}}
                        >
                          <option disabled value="">
                            Select
                          </option>
                          <option>Yes</option>
                          <option>No</option>
                        </Field>
                        <ErrorMessage
                          className="text-red-600"
                          name="is_stock"
                          component="span"
                        />
                      </div>
                      <div className="w-full">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-available-stock"
                        >
                          Available stock
                        </label>
                        <Field
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4  leading-tight focus:outline-none focus:bg-white"
                          id="grid-available-stock"
                          name="available_stock"
                          type="number"
                          placeholder="Available stock"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-12 rounded ">
                  Save
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Add;

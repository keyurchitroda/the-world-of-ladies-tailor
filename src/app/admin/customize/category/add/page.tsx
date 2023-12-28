"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { getAllCategory } from "@/redux/slices/categorySlice";
import { AppDispatch } from "@/redux/store";
import { addNewCategoryService } from "@/services/categoryService";
import { addNewCustomizeCategoryService } from "@/services/customizeService";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

const Add = () => {
  const categories = useSelector(
    (state: any) => state.categoryReducer.categories
  );
  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    getCategoryList();
  }, [dispatch]);

  const getCategoryList = async () => {
    await dispatch(getAllCategory());
  };

  const CategorySchema: any = Yup.object().shape({
    category: Yup.string().required("Please select the category"),
    customize_category_name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Please enter customize category name"),
    customize_category_desc: Yup.string().required(
      "Please enter your customize categoryn description"
    ),
  });

  const onSaveCategory = async (values: any, resetForm: any) => {
    try {
      const reqData = {
        category_id: values.category,
        customize_category_name: values.customize_category_name,
        customize_category_desc: values.customize_category_desc,
      };
      const response: any = await addNewCustomizeCategoryService(reqData);
      if (response.success === true) {
        toast.success(response.message);
        resetForm();
        router.push("/admin/customize/category/list");
      }
    } catch (error: any) {
      toast.error(error.message.error);
    }
  };

  return (
    <>
      <Breadcrumb pageName="Add new customize category" />
      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black pl-5">Customize Category</h3>
          </div>
          <Formik
            initialValues={{
              customize_category_name: "",
              category: "",
              customize_category_desc: "",
            }}
            validationSchema={CategorySchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              onSaveCategory(values, resetForm);
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
                      htmlFor="grid-category-name"
                    >
                      Customize Category Name
                    </label>
                    <Field
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4  leading-tight focus:outline-none focus:bg-white"
                      id="grid-category-name"
                      name="customize_category_name"
                      type="text"
                      placeholder="Category name"
                      style={
                        errors.customize_category_name
                          ? { borderColor: "red" }
                          : {}
                      }
                    />
                    <ErrorMessage
                      className="text-red-600"
                      name="customize_category_name"
                      component="span"
                    />
                  </div>
                  <div className="w-full px-3 mb-6 md:mb-0 mt-4">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-category-desc"
                    >
                      Customize Category Description
                    </label>
                    <Field
                      as="textarea"
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4  leading-tight focus:outline-none focus:bg-white"
                      id="grid-category-desc"
                      name="customize_category_desc"
                      type="text"
                      placeholder="Category name"
                      style={
                        errors.customize_category_desc
                          ? { borderColor: "red" }
                          : {}
                      }
                    />
                    <ErrorMessage
                      className="text-red-600"
                      name="customize_category_desc"
                      component="span"
                    />
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

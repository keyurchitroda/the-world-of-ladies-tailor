"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { addNewCategoryService } from "@/services/categoryService";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";

const Add = () => {
  const router = useRouter();

  const CategorySchema: any = Yup.object().shape({
    category_name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Please enter your categoryname"),
  });

  const onSaveCategory = async (values: any, resetForm: any) => {
    try {
      const formData = new FormData();
      formData.append("category_name", values.category_name);
      formData.append("category_image", values.file);
      const response: any = await addNewCategoryService(formData);
      if (response.success === true) {
        toast.success(response.message);
        resetForm();
        router.push("/admin/category/list");
      }
    } catch (error: any) {
      toast.error(error.message.error);
    }
  };

  return (
    <>
      <Breadcrumb pageName="Add new category" />
      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black pl-5">Category</h3>
          </div>
          <Formik
            initialValues={{ category_name: "" }}
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
                      htmlFor="grid-category-name"
                    >
                      Category Name
                    </label>
                    <Field
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4  leading-tight focus:outline-none focus:bg-white"
                      id="grid-category-name"
                      name="category_name"
                      type="text"
                      placeholder="Category name"
                      style={errors.category_name ? { borderColor: "red" } : {}}
                    />
                    <ErrorMessage
                      className="text-red-600"
                      name="category_name"
                      component="span"
                    />
                  </div>
                  <div className="w-full px-3 mt-4">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-category-img"
                    >
                      Category Image
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-category-img"
                      type="file"
                      placeholder="Doe"
                      name="category_img"
                      onChange={(event: any) => {
                        setFieldValue("file", event.currentTarget.files[0]);
                      }}
                    />
                    <ErrorMessage
                      className="text-red-600"
                      name="category_img"
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

"use client";

import { signinService } from "@/services/authService";
import Link from "next/link";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface initialValues {
  email: string;
  password: string;
}

const Signin = () => {
  const router = useRouter();

  const initialValue: initialValues = {
    email: "",
    password: "",
  };

  const SigninSchema: any = Yup.object().shape({
    email: Yup.string()
      .required("Please enter your email id")
      .email("Email id is invalid"),
    password: Yup.string()
      .required("Please enter yout password")
      .min(8, "Your password is too short."),
  });

  const onSignIn = async (values: any) => {
    try {
      const { email, password, username } = values;
      const reqBody = {
        email,
        password,
      };
      const response: any = await signinService(reqBody);
      if (response.success === true) {
        toast.success(response.message);
        router.push("/");
      } else {
        toast.success(response.error);
      }
    } catch (error: any) {
      toast.error(error.message.error);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
        <div className="w-full max-w-md">
          <div className="flex justify-center mx-auto">
            <img
              className="w-auto h-7 sm:h-8"
              src="https://merakiui.com/images/logo.svg"
              alt=""
            />
          </div>

          <div className="flex items-center justify-center mt-6">
            <p className="w-1/3 pb-4 font-bold text-center text-gray-800 capitalize border-b-2 border-blue-500 dark:border-blue-400 dark:text-white">
              Sign in
            </p>
          </div>

          <Formik
            initialValues={initialValue}
            validationSchema={SigninSchema}
            onSubmit={onSignIn}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="relative flex items-center mt-6">
                  <span className="absolute">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </span>

                  <Field
                    type="text"
                    className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Email address"
                    name="email"
                    id="email"
                  />
                </div>
                <ErrorMessage
                  className="text-red-600"
                  name="email"
                  component="span"
                />

                <div className="relative flex items-center mt-4">
                  <span className="absolute">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </span>

                  <Field
                    type="password"
                    className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Password"
                    name="password"
                    id="password"
                  />
                </div>
                <ErrorMessage
                  className="text-red-600"
                  name="password"
                  component="span"
                />

                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                    disabled={isSubmitting}
                  >
                    Sign In
                  </button>

                  <div className="mt-6 text-center ">
                    <Link
                      href="/signup"
                      className="text-sm text-blue-500 hover:underline dark:text-blue-400"
                    >
                      Create new account?
                    </Link>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Signin;

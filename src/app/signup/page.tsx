"use client";

import { signupService } from "@/services/authService";
import Link from "next/link";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ClockLoader } from "react-spinners";
// import { Watch } from "react-loader-spinner";

interface initialValues {
  username: string;
  email: string;
  password: string;
  confirmpassword: string;
}

interface signupResponse {
  message: string;
  success: boolean;
}

const Signup = () => {
  const router = useRouter();
  const [loader, setLoader] = useState(false);

  const initialValue: initialValues = {
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  };

  const SignupSchema: any = Yup.object().shape({
    username: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Please enter your username"),
    email: Yup.string()
      .required("Please enter your email id")
      .email("Email id is invalid"),
    password: Yup.string()
      .required("Please enter yout password")
      .min(8, "Your password is too short."),
    confirmpassword: Yup.string()
      .required("Please retype your password.")
      .oneOf([Yup.ref("password")], "Your passwords do not match."),
  });

  const onSignUp = async (values: any) => {
    try {
      setLoader(true);
      const { email, password, username } = values;
      const reqBody = {
        email,
        password,
        username,
      };
      const response: any = await signupService(reqBody);
      if (response.success === true) {
        toast.success(response.message);
        setLoader(false);
        router.push("/signin");
      } else {
        setLoader(false);
        toast.success(response.error);
      }
    } catch (error: any) {
      setLoader(false);
      toast.error(error.message.message);
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
              Sign up
            </p>
          </div>

          <Formik
            initialValues={initialValue}
            validationSchema={SignupSchema}
            onSubmit={onSignUp}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="relative flex items-center mt-8">
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
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </span>

                  <Field
                    type="text"
                    className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Username"
                    name="username"
                    id="username"
                  />
                </div>
                <ErrorMessage
                  className="text-red-600"
                  name="username"
                  component="span"
                />

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
                    placeholder="Confirm Password"
                    name="confirmpassword"
                    id="confirmpassword"
                  />
                </div>
                <ErrorMessage
                  className="text-red-600"
                  name="confirmpassword"
                  component="span"
                />

                <div className="mt-6">
                  <button
                    type="submit"
                    className="flex justify-center align-middle  w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                    disabled={loader}
                  >
                    <ClockLoader
                      speedMultiplier={10}
                      color="#FFFFFF"
                      loading={loader}
                      size={18}
                    />
                    <span className="ms-50" style={{ paddingLeft: "10px" }}>
                      Sign up
                    </span>
                  </button>

                  <div className="mt-6 text-center ">
                    <Link
                      href="/signin"
                      className="text-sm text-blue-500 hover:underline dark:text-blue-400"
                    >
                      Already have an account?
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

export default Signup;

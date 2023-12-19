"use client";
import { getCookie } from "@/apiConfig/cookies";
import { defaultAuthTokenString } from "@/helpers/helper";
import {
  AddNewAddress,
  getAllAddressByEmail,
  selectAddress,
} from "@/redux/slices/checkoutSlice";
import { AppDispatch } from "@/redux/store";
import {
  ErrorMessage,
  Field,
  Form,
  Formik,
  getIn,
  setIn,
  useFormik,
} from "formik";
import _, { values } from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClockLoader } from "react-spinners";
import * as Yup from "yup";

interface initialValues {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  country: string;
  postalcode: string;
}

const Checkout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const addresses = useSelector(
    (state: any) => state.checkoutReducer.addresses
  );

  const selectedAddress = useSelector(
    (state: any) => state.checkoutReducer.selectedAddress
  );

  const isLoading = useSelector(
    (state: any) => state.commonReducer.UIGlobalLoader
  );

  const isTokenAvailable = () => {
    const token = getCookie(defaultAuthTokenString);
    if (token) {
      return true;
    } else {
      return false;
    }
  };

  const getUserValue = () => {
    const user: any = getCookie("user");
    const userDetails = JSON.parse(user);
    return userDetails?.email;
  };

  const initialValue: initialValues = {
    firstname: "",
    lastname: "",
    email: isTokenAvailable() ? getUserValue() : "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    country: "",
    postalcode: "",
  };

  const AddressSchema: any = Yup.object().shape({
    firstname: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Please enter your firstname"),
    lastname: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Please enter your lastname"),
    email: Yup.string()
      .required("Please enter your email id")
      .email("Email id is invalid"),
    phone: Yup.string().required("Please enter your phone number"),
    address1: Yup.string().required("Please enter your valid address"),
    city: Yup.string().required("Please enter your city"),
    country: Yup.string().required("Please enter your country"),
    state: Yup.string().required("Please enter your state"),
    postalcode: Yup.string().required("Please enter your postal code"),
  });

  useEffect(() => {
    if (isTokenAvailable()) {
      const userEmail = getUserValue();
      if (userEmail) {
        dispatch(getAllAddressByEmail(userEmail));
      }
    }
  }, []);

  const handleEmailChange = (event: any) => {
    dispatch(getAllAddressByEmail(event.target.value));
  };

  const onSaveAddress = async (value: any, resetForm: any) => {
    try {
      const reqBody = {
        email_id: _.get(value, "email", ""),
        first_name: _.get(value, "firstname", ""),
        last_name: _.get(value, "lastname", ""),
        phone: _.get(value, "phone", ""),
        address1: _.get(value, "address1", ""),
        address2: _.get(value, "address2", ""),
        country: _.get(value, "country", ""),
        city: _.get(value, "city", ""),
        state: _.get(value, "state", ""),
        postal_code: _.get(value, "postalcode", ""),
      };
      await dispatch(AddNewAddress(reqBody));
      await window.scrollTo(0, 0);
      await resetForm({
        values: {
          firstname: "",
          lastname: "",
          phone: "",
          address1: "",
          address2: "",
          city: "",
          state: "",
          country: "",
          postalcode: "",
        },
      });
    } catch (error: any) {
      console.log("error", error);
    }
  };

  const getStyles = (errors: any, fieldName: string) => {
    if (getIn(errors, fieldName)) {
      return {
        border: "1px solid red",
      };
    }
  };

  const handleSelectAddress = async (item: any) => {
    await dispatch(selectAddress(item));
  };

  const getAllAddress = () => {
    return (
      <div className="mt-10 border-t border-gray-200 pt-10">
        <fieldset>
          <legend className="text-lg font-medium text-gray-900">
            Addresses
          </legend>

          {isLoading ? (
            <div className="text-center flex justify-center">
              <ClockLoader
                speedMultiplier={10}
                color="black"
                loading={isLoading}
                size={100}
              />
            </div>
          ) : (
            <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
              {_.map(addresses, (item) => (
                <label
                  onClick={() => handleSelectAddress(item)}
                  className={`relative bg-white border border-gray-300 rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none ${
                    _.get(selectedAddress, "_id", "") ===
                      _.get(item, "_id", "") &&
                    `border-transparent ring-2 ring-indigo-500`
                  }`}
                >
                  <input
                    type="radio"
                    name="delivery-method"
                    value="Standard"
                    className="sr-only"
                    aria-labelledby="delivery-method-0-label"
                    aria-describedby="delivery-method-0-description-0 delivery-method-0-description-1"
                  />
                  <div className="flex-1 flex">
                    <div className="flex flex-col">
                      <span
                        id="delivery-method-0-label"
                        className="block text-sm font-medium text-gray-900"
                      >
                        {_.get(item, "first_name", "")}{" "}
                        {_.get(item, "last_name", "")}
                      </span>
                      <span
                        id="delivery-method-0-description-0"
                        className="mt-1 flex items-center text-sm text-gray-500"
                      >
                        {_.get(item, "address1", "")}
                      </span>
                      <span
                        id="delivery-method-0-description-1"
                        className="mt-6 text-sm font-medium text-gray-900"
                      >
                        {_.get(item, "postal_code", "")}
                      </span>
                    </div>
                  </div>
                  {_.get(selectedAddress, "_id", "") ===
                    _.get(item, "_id", "") && (
                    <svg
                      className="h-5 w-5 text-indigo-600"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  )}

                  <div
                    className="absolute -inset-px rounded-lg border-2 pointer-events-none"
                    aria-hidden="true"
                  ></div>
                </label>
              ))}
            </div>
          )}
        </fieldset>
      </div>
    );
  };

  return (
    <>
      <div className="bg-gray-50">
        <main className="max-w-7xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto lg:max-w-none">
            <h1 className="sr-only">Checkout</h1>
            <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
              <Formik
                initialValues={initialValue}
                validationSchema={AddressSchema}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                  onSaveAddress(values, resetForm);
                }}
              >
                {({ isSubmitting, errors, resetForm, values }) => (
                  <Form>
                    <div>
                      <div>
                        <h2 className="text-lg font-medium text-gray-900">
                          Contact Information
                        </h2>

                        <div className="mt-4">
                          <label
                            htmlFor="email-address"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Email address
                          </label>
                          <div className="mt-1">
                            <Field
                              type="email"
                              id="email"
                              name="email"
                              value={values.email}
                              autoComplete="email"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              onBlur={handleEmailChange}
                              style={getStyles(errors, "email")}
                              disabled={isTokenAvailable()}
                            />
                          </div>
                          <ErrorMessage
                            className="text-red-600"
                            name="email"
                            component="span"
                          />
                        </div>
                        {getAllAddress()}
                      </div>

                      <div className="mt-10 border-t border-gray-200 pt-10">
                        <h2 className="text-lg font-medium text-gray-900">
                          Shipping inhtmlFormation
                        </h2>

                        <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                          <div>
                            <label
                              htmlFor="firstname"
                              className="block text-sm font-medium text-gray-700"
                            >
                              First name
                            </label>
                            <div className="mt-1">
                              <Field
                                type="text"
                                id="firstname"
                                name="firstname"
                                autoComplete="given-name"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                style={getStyles(errors, "firstname")}
                              />
                            </div>
                            <ErrorMessage
                              className="text-red-600"
                              name="firstname"
                              component="span"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="lastname"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Last name
                            </label>
                            <div className="mt-1">
                              <Field
                                type="text"
                                id="lastname"
                                name="lastname"
                                autoComplete="family-name"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                style={getStyles(errors, "lastname")}
                              />
                            </div>
                            <ErrorMessage
                              className="text-red-600"
                              name="lastname"
                              component="span"
                            />
                          </div>

                          <div className="sm:col-span-2">
                            <label
                              htmlFor="phone"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Phone
                            </label>
                            <div className="mt-1">
                              <Field
                                type="text"
                                name="phone"
                                id="phone"
                                autoComplete="tel"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                style={getStyles(errors, "phone")}
                              />
                            </div>
                            <ErrorMessage
                              className="text-red-600"
                              name="phone"
                              component="span"
                            />
                          </div>

                          <div className="sm:col-span-2">
                            <label
                              htmlFor="address"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Address
                            </label>
                            <div className="mt-1">
                              <Field
                                type="text"
                                name="address1"
                                id="address1"
                                autoComplete="street-address"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                style={getStyles(errors, "address1")}
                              />
                            </div>
                            <ErrorMessage
                              className="text-red-600"
                              name="address1"
                              component="span"
                            />
                          </div>

                          <div className="sm:col-span-2">
                            <label
                              htmlFor="apartment"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Apartment, suite, etc.
                            </label>
                            <div className="mt-1">
                              <Field
                                type="text"
                                name="address2"
                                id="address2"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              />
                            </div>
                          </div>

                          <div>
                            <label
                              htmlFor="city"
                              className="block text-sm font-medium text-gray-700"
                            >
                              City
                            </label>
                            <div className="mt-1">
                              <Field
                                type="text"
                                name="city"
                                id="city"
                                autoComplete="address-level2"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                style={getStyles(errors, "city")}
                              />
                            </div>
                            <ErrorMessage
                              className="text-red-600"
                              name="city"
                              component="span"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="country"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Country
                            </label>
                            <div className="mt-1">
                              <Field
                                as="select"
                                id="country"
                                name="country"
                                autoComplete="country-name"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                style={getStyles(errors, "country")}
                              >
                                <option>United States</option>
                                <option>Canada</option>
                                <option>Mexico</option>
                              </Field>
                            </div>
                            <ErrorMessage
                              className="text-red-600"
                              name="country"
                              component="span"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="region"
                              className="block text-sm font-medium text-gray-700"
                            >
                              State / Province
                            </label>
                            <div className="mt-1">
                              <Field
                                type="text"
                                name="state"
                                id="state"
                                autoComplete="address-level1"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                style={getStyles(errors, "state")}
                              />
                            </div>
                            <ErrorMessage
                              className="text-red-600"
                              name="state"
                              component="span"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="postal-code"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Postal code
                            </label>
                            <div className="mt-1">
                              <Field
                                type="text"
                                name="postalcode"
                                id="postalcode"
                                autoComplete="postal-code"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                style={getStyles(errors, "postalcode")}
                              />
                            </div>
                            <ErrorMessage
                              className="text-red-600"
                              name="postalcode"
                              component="span"
                            />
                          </div>

                          <div className="block text-sm font-medium text-gray-700 sm:col-span-2">
                            <button
                              type="submit"
                              className=" flex justify-center items-center w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-10 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                            >
                              <ClockLoader
                                speedMultiplier={10}
                                color="#FFFFFF"
                                loading={isLoading}
                                size={18}
                              />
                              <span
                                className="ms-50"
                                style={{ paddingLeft: "10px" }}
                              >
                                Save address
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* <div className="mt-10 border-t border-gray-200 pt-10">
                        <fieldset>
                          <legend className="text-lg font-medium text-gray-900">
                            Delivery method
                          </legend>

                          <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                            <label className="relative bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none">
                              <input
                                type="radio"
                                name="delivery-method"
                                value="Standard"
                                className="sr-only"
                                aria-labelledby="delivery-method-0-label"
                                aria-describedby="delivery-method-0-description-0 delivery-method-0-description-1"
                              />
                              <div className="flex-1 flex">
                                <div className="flex flex-col">
                                  <span
                                    id="delivery-method-0-label"
                                    className="block text-sm font-medium text-gray-900"
                                  >
                                    {" "}
                                    Standard{" "}
                                  </span>
                                  <span
                                    id="delivery-method-0-description-0"
                                    className="mt-1 flex items-center text-sm text-gray-500"
                                  >
                                    {" "}
                                    4–10 business days{" "}
                                  </span>
                                  <span
                                    id="delivery-method-0-description-1"
                                    className="mt-6 text-sm font-medium text-gray-900"
                                  >
                                    {" "}
                                    $5.00{" "}
                                  </span>
                                </div>
                              </div>
                              <svg
                                className="h-5 w-5 text-indigo-600"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clip-rule="evenodd"
                                />
                              </svg>

                              <div
                                className="absolute -inset-px rounded-lg border-2 pointer-events-none"
                                aria-hidden="true"
                              ></div>
                            </label>

                            <label className="relative bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none">
                              <input
                                type="radio"
                                name="delivery-method"
                                value="Express"
                                className="sr-only"
                                aria-labelledby="delivery-method-1-label"
                                aria-describedby="delivery-method-1-description-0 delivery-method-1-description-1"
                              />
                              <div className="flex-1 flex">
                                <div className="flex flex-col">
                                  <span
                                    id="delivery-method-1-label"
                                    className="block text-sm font-medium text-gray-900"
                                  >
                                    {" "}
                                    Express{" "}
                                  </span>
                                  <span
                                    id="delivery-method-1-description-0"
                                    className="mt-1 flex items-center text-sm text-gray-500"
                                  >
                                    {" "}
                                    2–5 business days{" "}
                                  </span>
                                  <span
                                    id="delivery-method-1-description-1"
                                    className="mt-6 text-sm font-medium text-gray-900"
                                  >
                                    {" "}
                                    $16.00{" "}
                                  </span>
                                </div>
                              </div>

                              <svg
                                className="h-5 w-5 text-indigo-600"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clip-rule="evenodd"
                                />
                              </svg>

                              <div
                                className="absolute -inset-px rounded-lg border-2 pointer-events-none"
                                aria-hidden="true"
                              ></div>
                            </label>
                          </div>
                        </fieldset>
                      </div> */}

                      {/* <div className="mt-10 border-t border-gray-200 pt-10">
                  <h2 className="text-lg font-medium text-gray-900">Payment</h2>

                  <fieldset className="mt-4">
                    <legend className="sr-only">Payment type</legend>
                    <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                      <div className="flex items-center">
                        <input
                          id="credit-card"
                          name="payment-type"
                          type="radio"
                          checked
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                        />
                        <label
                          htmlFor="credit-card"
                          className="ml-3 block text-sm font-medium text-gray-700"
                        >
                          {" "}
                          Credit card{" "}
                        </label>
                      </div>

                      <div className="flex items-center">
                        <input
                          id="paypal"
                          name="payment-type"
                          type="radio"
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                        />
                        <label
                          htmlFor="paypal"
                          className="ml-3 block text-sm font-medium text-gray-700"
                        >
                          {" "}
                          PayPal{" "}
                        </label>
                      </div>

                      <div className="flex items-center">
                        <input
                          id="etransfer"
                          name="payment-type"
                          type="radio"
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                        />
                        <label
                          htmlFor="etransfer"
                          className="ml-3 block text-sm font-medium text-gray-700"
                        >
                          {" "}
                          eTransfer{" "}
                        </label>
                      </div>
                    </div>
                  </fieldset>

                  <div className="mt-6 grid grid-cols-4 gap-y-6 gap-x-4">
                    <div className="col-span-4">
                      <label
                        htmlFor="card-number"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Card number
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          id="card-number"
                          name="card-number"
                          autoComplete="cc-number"
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div className="col-span-4">
                      <label
                        htmlFor="name-on-card"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Name on card
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          id="name-on-card"
                          name="name-on-card"
                          autoComplete="cc-name"
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div className="col-span-3">
                      <label
                        htmlFor="expiration-date"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Expiration date (MM/YY)
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="expiration-date"
                          id="expiration-date"
                          autoComplete="cc-exp"
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="cvc"
                        className="block text-sm font-medium text-gray-700"
                      >
                        CVC
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="cvc"
                          id="cvc"
                          autoComplete="csc"
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div> */}
                    </div>
                  </Form>
                )}
              </Formik>
              <div className="mt-10 lg:mt-0">
                <h2 className="text-lg font-medium text-gray-900">
                  Order summary
                </h2>

                <div className="mt-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <h3 className="sr-only">Items in your cart</h3>
                  <ul role="list" className="divide-y divide-gray-200">
                    <li className="flex py-6 px-4 sm:px-6">
                      <div className="flex-shrink-0">
                        <img
                          src="https://tailwindui.com/img/ecommerce-images/checkout-page-02-product-01.jpg"
                          alt="Front of men&#039;s Basic Tee in black."
                          className="w-20 rounded-md"
                        />
                      </div>

                      <div className="ml-6 flex-1 flex flex-col">
                        <div className="flex">
                          <div className="min-w-0 flex-1">
                            <h4 className="text-sm">
                              <a
                                href="#"
                                className="font-medium text-gray-700 hover:text-gray-800"
                              >
                                {" "}
                                Basic Tee{" "}
                              </a>
                            </h4>
                            <p className="mt-1 text-sm text-gray-500">Black</p>
                            <p className="mt-1 text-sm text-gray-500">Large</p>
                          </div>

                          <div className="ml-4 flex-shrink-0 flow-root">
                            <button
                              type="button"
                              className="-m-2.5 bg-white p-2.5 flex items-center justify-center text-gray-400 hover:text-gray-500"
                            >
                              <span className="sr-only">Remove</span>
                              <svg
                                className="h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                  clip-rule="evenodd"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>

                        <div className="flex-1 pt-2 flex items-end justify-between">
                          <p className="mt-1 text-sm font-medium text-gray-900">
                            $32.00
                          </p>

                          <div className="ml-4">
                            <label htmlFor="quantity" className="sr-only">
                              Quantity
                            </label>
                            <select
                              id="quantity"
                              name="quantity"
                              className="rounded-md border border-gray-300 text-base font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                              <option value="6">6</option>
                              <option value="7">7</option>
                              <option value="8">8</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                  <dl className="border-t border-gray-200 py-6 px-4 space-y-6 sm:px-6">
                    <div className="flex items-center justify-between">
                      <dt className="text-sm">Subtotal</dt>
                      <dd className="text-sm font-medium text-gray-900">
                        $64.00
                      </dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-sm">Shipping</dt>
                      <dd className="text-sm font-medium text-gray-900">
                        $5.00
                      </dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-sm">Taxes</dt>
                      <dd className="text-sm font-medium text-gray-900">
                        $5.52
                      </dd>
                    </div>
                    <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                      <dt className="text-base font-medium">Total</dt>
                      <dd className="text-base font-medium text-gray-900">
                        $75.52
                      </dd>
                    </div>
                  </dl>

                  <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                    <button
                      type="submit"
                      className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                    >
                      Confirm order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* <footer
          aria-labelledby="footer-heading"
          className="bg-white border-t border-gray-200"
        >
          <h2 id="footer-heading" className="sr-only">
            Footer
          </h2>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-20">
              <div className="grid grid-cols-1 md:grid-cols-12 md:grid-flow-col md:gap-x-8 md:gap-y-16 md:auto-rows-min">
                <div className="col-span-1 md:col-span-2 lg:row-start-1 lg:col-start-1">
                  <img
                    src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600"
                    alt=""
                    className="h-8 w-auto"
                  />
                </div>

                <div className="mt-10 col-span-6 grid grid-cols-2 gap-8 sm:grid-cols-3 md:mt-0 md:row-start-1 md:col-start-3 md:col-span-8 lg:col-start-2 lg:col-span-6">
                  <div className="grid grid-cols-1 gap-y-12 sm:col-span-2 sm:grid-cols-2 sm:gap-x-8">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        Products
                      </h3>
                      <ul role="list" className="mt-6 space-y-6">
                        <li className="text-sm">
                          <a
                            href="#"
                            className="text-gray-500 hover:text-gray-600"
                          >
                            {" "}
                            Bags{" "}
                          </a>
                        </li>

                        <li className="text-sm">
                          <a
                            href="#"
                            className="text-gray-500 hover:text-gray-600"
                          >
                            {" "}
                            Tees{" "}
                          </a>
                        </li>

                        <li className="text-sm">
                          <a
                            href="#"
                            className="text-gray-500 hover:text-gray-600"
                          >
                            {" "}
                            Objects{" "}
                          </a>
                        </li>

                        <li className="text-sm">
                          <a
                            href="#"
                            className="text-gray-500 hover:text-gray-600"
                          >
                            {" "}
                            Home Goods{" "}
                          </a>
                        </li>

                        <li className="text-sm">
                          <a
                            href="#"
                            className="text-gray-500 hover:text-gray-600"
                          >
                            {" "}
                            Accessories{" "}
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        Company
                      </h3>
                      <ul role="list" className="mt-6 space-y-6">
                        <li className="text-sm">
                          <a
                            href="#"
                            className="text-gray-500 hover:text-gray-600"
                          >
                            {" "}
                            Who we are{" "}
                          </a>
                        </li>

                        <li className="text-sm">
                          <a
                            href="#"
                            className="text-gray-500 hover:text-gray-600"
                          >
                            {" "}
                            Sustainability{" "}
                          </a>
                        </li>

                        <li className="text-sm">
                          <a
                            href="#"
                            className="text-gray-500 hover:text-gray-600"
                          >
                            {" "}
                            Press{" "}
                          </a>
                        </li>

                        <li className="text-sm">
                          <a
                            href="#"
                            className="text-gray-500 hover:text-gray-600"
                          >
                            {" "}
                            Careers{" "}
                          </a>
                        </li>

                        <li className="text-sm">
                          <a
                            href="#"
                            className="text-gray-500 hover:text-gray-600"
                          >
                            {" "}
                            Terms &amp; Conditions{" "}
                          </a>
                        </li>

                        <li className="text-sm">
                          <a
                            href="#"
                            className="text-gray-500 hover:text-gray-600"
                          >
                            {" "}
                            Privacy{" "}
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      Customer Service
                    </h3>
                    <ul role="list" className="mt-6 space-y-6">
                      <li className="text-sm">
                        <a
                          href="#"
                          className="text-gray-500 hover:text-gray-600"
                        >
                          {" "}
                          Contact{" "}
                        </a>
                      </li>

                      <li className="text-sm">
                        <a
                          href="#"
                          className="text-gray-500 hover:text-gray-600"
                        >
                          {" "}
                          Shipping{" "}
                        </a>
                      </li>

                      <li className="text-sm">
                        <a
                          href="#"
                          className="text-gray-500 hover:text-gray-600"
                        >
                          {" "}
                          Returns{" "}
                        </a>
                      </li>

                      <li className="text-sm">
                        <a
                          href="#"
                          className="text-gray-500 hover:text-gray-600"
                        >
                          {" "}
                          Warranty{" "}
                        </a>
                      </li>

                      <li className="text-sm">
                        <a
                          href="#"
                          className="text-gray-500 hover:text-gray-600"
                        >
                          {" "}
                          Secure Payments{" "}
                        </a>
                      </li>

                      <li className="text-sm">
                        <a
                          href="#"
                          className="text-gray-500 hover:text-gray-600"
                        >
                          {" "}
                          FAQ{" "}
                        </a>
                      </li>

                      <li className="text-sm">
                        <a
                          href="#"
                          className="text-gray-500 hover:text-gray-600"
                        >
                          {" "}
                          Find a store{" "}
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-12 md:mt-0 md:row-start-2 md:col-start-3 md:col-span-8 lg:row-start-1 lg:col-start-9 lg:col-span-4">
                  <h3 className="text-sm font-medium text-gray-900">
                    Sign up htmlFor our newsletter
                  </h3>
                  <p className="mt-6 text-sm text-gray-500">
                    The latest deals and savings, sent to your inbox weekly.
                  </p>
                  <form className="mt-2 flex sm:max-w-md">
                    <label
                      htmlFor="newsletter-email-address"
                      className="sr-only"
                    >
                      Email address
                    </label>
                    <input
                      id="newsletter-email-address"
                      type="text"
                      autoComplete="email"
                      required
                      className="appearance-none min-w-0 w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    />
                    <div className="ml-4 flex-shrink-0">
                      <button
                        type="submit"
                        className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Sign up
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 py-10 text-center">
              <p className="text-sm text-gray-500">
                &copy; 2021 Workflow, Inc. All rights reserved.
              </p>
            </div>
          </div>
        </footer> */}
      </div>
    </>
  );
};

export default Checkout;

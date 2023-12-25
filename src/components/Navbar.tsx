"use client";

import React, { Fragment, useEffect } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { getCookie, removeCookie } from "@/apiConfig/cookies";
import { defaultAuthTokenString, defaultTokenString } from "@/helpers/helper";
import { usePathname, useRouter } from "next/navigation";
import { signoutService } from "@/services/authService";
import { useDispatch, useSelector } from "react-redux";
import { setAddToCartValue } from "@/redux/slices/commonSlice";
import { getAllCartProducts } from "@/redux/slices/readymadeProductSlice";
import { logout } from "@/redux/store";
import _ from "lodash";

const navigation = [
  { name: "Home", href: "/", current: true },
  { name: "Categories", href: "#", current: false },
  { name: "About", href: "/about", current: false },
  { name: "contact", href: "/contact", current: false },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  const router = useRouter();
  const dispatch = useDispatch<any>();
  const url = usePathname();

  const segments = url.split("/"); // Split the URL by '/'
  const customizePath = segments[1];
  const count = useSelector(
    (state: any) => state.readymadeProductReducer.cartcount
  );

  const viewdetails = useSelector(
    (state: any) => state.customizeReducer.viewdetails
  );

  const onSignOut = async () => {
    await signoutService();
    await removeCookie(defaultAuthTokenString);
    await removeCookie("user");
    await dispatch(logout());
    router.push("/signin");
  };

  useEffect(() => {
    const tokenVal: any = getCookie("authToken");
    if (tokenVal) {
      dispatch(getAllCartProducts());
    }
  }, []);

  const isTokenAvailable = () => {
    const tokenVal: any = getCookie("authToken");
    return tokenVal ? true : false;
  };

  const handleOpenCart = async () => {
    await dispatch(setAddToCartValue(true));
  };

  return (
    <Disclosure
      as="nav"
      className="bg-gray-800 fixed z-20 w-full start-0 top-0"
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {customizePath !== "customize" && (
                  <button
                    type="button"
                    className="mr-5 relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    onClick={handleOpenCart}
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Shopping Cart</span>
                    <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
                    <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full px-1 text-xs text-white">
                      {count}
                    </span>
                  </button>
                )}

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <>
                            {isTokenAvailable() ? (
                              <p
                                onClick={onSignOut}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                                )}
                              >
                                Sign out
                              </p>
                            ) : (
                              <Link
                                href="/signin"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                                )}
                              >
                                Sign in
                              </Link>
                            )}
                          </>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>

                {customizePath === "customize" && (
                  <Link
                    href="/customize/productdetails"
                    className="ml-5 relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    // onClick={handleOpenCart}
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="">View Products</span>
                    <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full px-1 text-xs text-white">
                      {_.size(viewdetails)}
                    </span>
                  </Link>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;

"use client";
import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { getCookie } from "@/apiConfig/cookies";
import AddToCart from "@/app/addtocart/page";

function Layout() {
  let userDetails;

  useEffect(() => {}, []);
  const user: any = getCookie("user");
  console.log("user", user);
  userDetails = user && JSON.parse(user);

  console.log("userDetails", userDetails);

  return <></>;
}

export default Layout;

import axiosInstance from "@/apiConfig/axios";

export const getAllUsers = () => {
  return axiosInstance.get("users/signup");
};

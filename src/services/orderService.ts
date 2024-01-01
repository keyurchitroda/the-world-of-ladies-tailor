import axiosInstance from "@/apiConfig/axios";

export const getAllOrderService = () => {
  return axiosInstance.get("orders");
};

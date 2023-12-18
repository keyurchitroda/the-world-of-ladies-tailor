import gauestAxiosInstance from "@/apiConfig/guestAxios";
import axiosInstance from "@/apiConfig/axios";

export const getAllCategoryService = () => {
  return axiosInstance.get("category");
};

import gauestAxiosInstance from "@/apiConfig/guestAxios";
import axiosInstance from "@/apiConfig/axios";

export const getAllCategoryService = () => {
  return axiosInstance.get("category");
};

export const addNewCategoryService = (body: any) => {
  return axiosInstance.post("category", body);
};

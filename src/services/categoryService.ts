import gauestAxiosInstance from "@/apiConfig/guestAxios";

export const getAllCategoryService = () => {
  return gauestAxiosInstance.get("category");
};

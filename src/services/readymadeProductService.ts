import gauestAxiosInstance from "@/apiConfig/guestAxios";

export const getAllReadymadeProductService = (categoryId: string) => {
  return gauestAxiosInstance.get(`readymade?category_id=${categoryId}`);
};

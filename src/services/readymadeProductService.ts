import gauestAxiosInstance from "@/apiConfig/guestAxios";
import axiosInstance from "@/apiConfig/axios";

export const getAllReadymadeProductService = (categoryId: string) => {
  return gauestAxiosInstance.get(`readymade?category_id=${categoryId}`);
};

export const addToCartProductService = (body: any) => {
  return axiosInstance.post(`addtocart`, body);
};

export const getAllCartProductService = () => {
  return axiosInstance.get(`addtocart`);
};

export const removeCartProductService = (id: string) => {
  return axiosInstance.delete(`addtocart?productId=${id}`);
};

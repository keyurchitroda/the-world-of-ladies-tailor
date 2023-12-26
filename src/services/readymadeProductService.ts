import gauestAxiosInstance from "@/apiConfig/guestAxios";
import axiosInstance from "@/apiConfig/axios";

export const getAllReadymadeProductService = (categoryId: string) => {
  if (categoryId) {
    return gauestAxiosInstance.get(`readymade?category_id=${categoryId}`);
  } else {
    return gauestAxiosInstance.get(`readymade`);
  }
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

export const getSingleProductService = (productId: string) => {
  return gauestAxiosInstance.get(`productdetail?productId=${productId}`);
};

export const addNewReadymadeProductService = (body: any) => {
  return axiosInstance.post(`readymade`, body);
};

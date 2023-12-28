import gauestAxiosInstance from "@/apiConfig/guestAxios";

export const getAllCustomizeCategoryService = (categoryId: string) => {
  if (categoryId) {
    return gauestAxiosInstance.get(
      `customize/category?category_id=${categoryId}`
    );
  } else {
    return gauestAxiosInstance.get(`customize/category`);
  }
};

export const getAllCustomizeProductService = (categoryId: any) => {
  if (categoryId) {
    return gauestAxiosInstance.get(
      `customize/product?customize_category_id=${categoryId}`
    );
  } else {
    return gauestAxiosInstance.get(`customize/product`);
  }
};

export const addNewCustomizeCategoryService = (body: any) => {
  return gauestAxiosInstance.post(`customize/category`, body);
};

export const addNewCustomizeProductService = (body: any) => {
  return gauestAxiosInstance.post(`customize/product`, body);
};

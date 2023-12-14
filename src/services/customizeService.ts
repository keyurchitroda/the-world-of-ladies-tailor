import gauestAxiosInstance from "@/apiConfig/guestAxios";

export const getAllCustomizeCategoryService = (categoryId: string) => {
  return gauestAxiosInstance.get(
    `customize/category?category_id=${categoryId}`
  );
};

export const getAllCustomizeProductService = (categoryId: string) => {
  return gauestAxiosInstance.get(
    `customize/product?customize_category_id=${categoryId}`
  );
};

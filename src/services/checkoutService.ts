import axiosInstance from "@/apiConfig/axios";

export const getAllAddressByEmailIdService = (emailid: string) => {
  return axiosInstance.get(`address?email=${emailid}`);
};

export const addNewAddressService = (body: any) => {
  return axiosInstance.post(`address`, body);
};

export const checkoutStripePayment = (body: any) => {
  return axiosInstance.post(`stripe/checkout`, body);
};

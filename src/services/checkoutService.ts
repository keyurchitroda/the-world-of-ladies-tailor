import axiosInstance from "@/apiConfig/axios";

export const getAllAddressByEmailIdService = (emailid: string) => {
  return axiosInstance.get(`address?email=${emailid}`);
};

export const addNewAddressService = (body: any) => {
  return axiosInstance.post(`address`, body);
};

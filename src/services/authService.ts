import gauestAxiosInstance from "@/apiConfig/guestAxios";

export const signinService = (data: any) => {
  return gauestAxiosInstance.post("users/signin", data);
};

export const signupService = (data: any) => {
  return gauestAxiosInstance.post("users/signup", data);
};

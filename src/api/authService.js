import axiosInstance from "./axiosConfig";

export const signup = async (signupDetails) => {
  const endpoint = "/user/register";
  const response = await axiosInstance.post(endpoint, signupDetails);
  return response.data;
};

export const login = async (credentials) => {
  const endpoint = "/user/login";
  const response = await axiosInstance.post(endpoint, credentials);
  return response.data;
};

export const logout = async () => {
  const endpoint = "/user/logout";
  const response = await axiosInstance.post(endpoint);
  return response;
};

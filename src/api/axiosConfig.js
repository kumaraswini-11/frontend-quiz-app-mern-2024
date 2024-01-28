import axios from "axios";

// Create an instance of Axios with custom configuration
const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  // Include credentials (cookies) in cross-origin requests. This is used when making a request using the older XMLHttpRequest object.
  withCredentials: true,
  // timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
  // This is used when making a request using the Fetch API. (include cookies in the request)
  // credentials: "include",
});
export default axiosInstance;

export const tokenExpired = async () => {
  const endpoint = "/user/token";
  const response = await axiosInstance.post(endpoint);
  return response.data;
};

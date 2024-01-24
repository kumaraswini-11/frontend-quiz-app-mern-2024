import axios from "axios";

// Create an instance of Axios with custom configuration
const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  // Include cookies in cross-origin requests
  withCredentials: true,
  // timeout: 5000,
});

export default axiosInstance;

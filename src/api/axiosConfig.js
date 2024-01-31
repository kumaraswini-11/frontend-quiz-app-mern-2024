import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectTokens, setTokens } from "../redux/slices/authenticationSlice";

// const dispatch = useDispatch();
// const navigate = useNavigate();

// Create an instance of Axios with custom configuration
const axiosInstance = axios.create({
  baseURL: String(import.meta.env.VITE_BACKEND_URL),
  // Include credentials (cookies) in cross-origin requests. This is used when making a request using the older XMLHttpRequest object.
  withCredentials: true,
  // timeout: 5000,

  // This is used when making a request using the Fetch API. (include cookies in the request)
  // credentials: "include",
});

// At this point it is not requered for me as i m handaling this directly form cookies in backend.
// Add a request interceptor
// axiosInstance.interceptors.request.use(
//   (config) => {
//     // Send the Access token along with the every request user amde
//     const tokens = useSelector(selectTokens);
//     if (tokens.accessToken) {
//       config.headers.Authorization = `Bearer ${tokens.accessToken}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// Not sure how to impliment it. So as of now just kept it for futuer use.
// Add a response interceptor
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // If the error status is 401 and there is no originalRequest._retry flag,
//     // it means the Access token has expired and we need to refresh it
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         const userToken = useSelector(selectTokens);
//         const refreshToken = userToken.refreshToken;
//         const response = await axios.post("/user/token", { refreshToken });
//         const { tokens } = response.data;

//         dispatch(setTokens(tokens));

//         // Retry the original request with the new token
//         originalRequest.headers.Authorization = `Bearer ${tokens.refreshToken}`;
//         return axios(originalRequest);
//       } catch (error) {
//         toast("Please do login again.");
//         navigate("/login");
//       }
//     }

//     return Promise.reject(error);
//   }
// );

export default axiosInstance;

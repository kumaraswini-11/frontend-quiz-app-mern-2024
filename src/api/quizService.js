import axiosInstance from "./axiosConfig";

// The usage of asynchronous functions and hooks inside non-component modules or outside of a React component might lead to unexpected behavior. Because useSelector is intended for use within functional components or custom hooks where React manages the component state. Thats why i didn't directly extract the data here, insted passed it as the parameter.

export const analyticsByUser = async (userId) => {
  const endpoint = `/quizzes/user-analytics/${userId}`;
  const response = await axiosInstance.post(endpoint);
  return response.data;
};

export const analyticsByQuiz = async (userId) => {
  const endpoint = `/quizzes/quiz-analytics/${userId}`;
  const response = await axiosInstance.post(endpoint);
  return response.data;
};

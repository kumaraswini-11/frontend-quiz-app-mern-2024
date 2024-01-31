import axiosInstance from "./axiosConfig";

// The usage of asynchronous functions and hooks inside non-component modules or outside of a React component might lead to unexpected behavior. Because useSelector is intended for use within functional components or custom hooks where React manages the component state. Thats why i didn't directly extract the data here, insted passed it as the parameter.

export const analyticsByUser = async (userId, signal) => {
  const endpoint = `/quizzes/user-analytics/${userId}`;
  const response = await axiosInstance.get(endpoint, { signal });
  return response.data;
};

export const analyticsByQuiz = async (userId, signal) => {
  const endpoint = `/quizzes/quiz-analytics/${userId}`;
  const response = await axiosInstance.get(endpoint, { signal });
  return response.data;
};

export const createQuiz = async (quizeDetails) => {
  const endpoint = "/quizzes/create-quiz";
  const response = await axiosInstance.post(endpoint, quizeDetails);
  return response.data;
};

export const deleteQuiz = async (quizId) => {
  const endpoint = `/quizzes/delete-quiz/${quizId}`;
  const response = await axiosInstance.delete(endpoint);
  return response;
};

export const fetchQuestionWiseAnalytics = async (quizId, signal) => {
  const endpoint = `/quizzes/question-analytics/${quizId}`;
  const response = await axiosInstance.get(endpoint, { signal });
  return response.data;
};

export const verifyAndGetDetails = async (_link, signal) => {
  const endpoint = `/quizzes/impression/${_link}`;
  const response = await axiosInstance.post(endpoint, { signal });
  return response.data;
};

export const updateQuestionsResponse = async (dataForUpadate) => {
  const endpoint = "/quizzes/update-question-response";
  const response = await axiosInstance.post(endpoint, dataForUpadate);
};

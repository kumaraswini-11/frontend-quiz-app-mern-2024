import { createSlice } from "@reduxjs/toolkit";

const quizSlice = createSlice({
  name: "quiz",
  initialState: { quizDetails: {}, questions: [] },
  reducers: {
    setQuizDetails: (state, action) => {
      state.quizDetails = action.payload;
    },
    addQuestion: (state, action) => {
      state.questions.push(action.payload);
    },
  },
});

export const { setQuizDetails, addQuestion } = quizSlice.actions;
export const selectQuizDetails = (state) => state.quiz.quizDetails;
export const selectQuestions = (state) => state.quiz.questions;

export default quizSlice.reducer;

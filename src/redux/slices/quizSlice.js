import { createSlice } from "@reduxjs/toolkit";

const quizSlice = createSlice({
  name: "quiz",
  initialState: { quizDetails: {}, analyticDetails: [], shareLink: "" },
  reducers: {
    setQuizDetails: (state, action) => {
      state.quizDetails = action.payload;
    },
    setAnalyticDetails: (state, action) => {
      state.analyticDetails = action.payload;
      // state.analyticDetails = [...state.analyticDetails, action.payload];
      // state.analyticDetails.push(action.payload)
    },
    setShareLink: (state, action) => {
      state.shareLink = action.payload;
    },
  },
});

export const { setQuizDetails, setAnalyticDetails, setShareLink } =
  quizSlice.actions;
export const selectQuizDetails = (state) => state.quiz.quizDetails;
export const selectAnalyticDetails = (state) => state.quiz.analyticDetails;
export const selectShareLink = (state) => state.quiz.shareLink;

export default quizSlice.reducer;

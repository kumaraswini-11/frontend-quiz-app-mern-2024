import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { store } from "./redux/store.js";
import { App as IsProtectedRoute } from "./App.jsx";
import { PageLoader } from "./components";

// Lazy-loaded components
const SignupLogin = lazy(() => import("./pages/SignupLoginPage.jsx"));
const Dashboard = lazy(() => import("./pages/DashboardPage.jsx"));
const Analytics = lazy(() => import("./pages/AnalyticsPage.jsx"));
const CreateQuiz = lazy(() => import("./pages/CreateQuizPage.jsx"));
const ErrorPage = lazy(() => import("./pages/ErrorPage.jsx"));

const route = createBrowserRouter([
  {
    path: "/",
    element: <IsProtectedRoute />,
    // errorElement: <ErrorPage />,
    children: [
      // Unprotected route
      { path: "register", element: <SignupLogin /> },
      { path: "login", element: <SignupLogin /> },
      // { path: "shared-link/:slug", element: <SharedQize /> },

      // Protected route
      { path: "dashboard", element: <Dashboard /> },
      { path: "analytics", element: <Analytics /> },
      { path: "create-quiz", element: <CreateQuiz /> },
      // {
      //   path: "question-wise-analyis",
      //   element: <QuestionWiseAnalysis />,
      // },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Suspense fallback={<PageLoader />}>
      <RouterProvider router={route} />
      <ToastContainer />
    </Suspense>
  </Provider>
);

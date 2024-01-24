import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { store } from "./redux/store.js";
import App from "./App.jsx";
import { PageLoader, AuthLayout } from "./components";
import "./index.css";

// Lazy-loaded components
const Signup = lazy(() => import("./pages/SignupPage.jsx"));
const Login = lazy(() => import("./pages/LoginPage.jsx"));
const Dashboard = lazy(() => import("./pages/DashboardPage.jsx"));
const Analytics = lazy(() => import("./pages/AnalyticsPage.jsx"));
const CreateQuiz = lazy(() => import("./pages/CreateQuizPage.jsx"));
const QuestionWiseAnalysis = lazy(() =>
  import("./pages/QuestionWiseAnalysisPage.jsx")
);
const ErrorBoundary = lazy(() => import("./pages/ErrorBoundaryPage.jsx"));

const route = createBrowserRouter([
  // Unprotected route
  {
    path: "/",
    element: <App />,
    // errorElement: <ErrorBoundary />,
    children: [
      { index: true, element: <Signup /> },
      { path: "login", element: <Login /> },
      // { path: "play-quiz/:slug", element: <SharedQuiz /> },
    ],
  },

  // Protected routes
  {
    path: "/app",
    element: <AuthLayout />,
    // errorElement: <ErrorBoundary />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "/analytics", element: <Analytics /> },
      { path: "/create-quiz", element: <CreateQuiz /> },
      {
        path: "/question-wise-analyis",
        element: <QuestionWiseAnalysis />,
      },
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

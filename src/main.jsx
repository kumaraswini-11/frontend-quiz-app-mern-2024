import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store.js";
import { ToastContainer } from "react-toastify";
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
  {
    path: "/",
    element: <AuthLayout />,
    // errorElement: <ErrorBoundary />,
    children: [
      // Unprotected route
      { index: true, element: <Navigate to="signup" replace /> },
      { path: "signup", element: <Signup /> },
      { path: "login", element: <Login /> },

      // Protected routes
      {
        path: "app/",
        children: [
          { index: true, element: <Navigate to="/app/dashboard" replace /> },
          { path: "dashboard", element: <Dashboard /> },
          { path: "create-quiz", element: <CreateQuiz /> },
          {
            path: "analytics",
            element: <Analytics />,
            children: [
              {
                path: "question-wise-analyis/:quizId",
                element: <QuestionWiseAnalysis />,
              },
            ],
          },
        ],
      },

      // Shared link
      // { path: "play-quiz/:link", element: <SharedQuiz /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Suspense fallback={<PageLoader />}>
        <RouterProvider router={route} />
        <ToastContainer />
      </Suspense>
    </PersistGate>
  </Provider>
);

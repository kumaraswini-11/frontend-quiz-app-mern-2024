import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { App as IsProtectedRoute } from "./App.jsx";
import { store } from "./app/store.js";
import { PageLoader, ErrorBoundary } from "./components/index.js";

// Lazy-loaded components
const Signup = lazy(() => import("./pages/Signup.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Dashboard = lazy(() => import("./pages/Dashboard.jsx"));
const Analytics = lazy(() => import("./pages/Analytics.jsx"));
const CreateQuiz = lazy(() => import("./pages/CreateQuiz.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorBoundary>
        <Router>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<IsProtectedRoute />} />
              <Route
                path="sign-up"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <Signup />
                  </Suspense>
                }
              />
              <Route
                path="login"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <Login />
                  </Suspense>
                }
              />
              <Route
                path="dashboard"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <Dashboard />
                  </Suspense>
                }
              />
              <Route
                path="analytics"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <Analytics />
                  </Suspense>
                }
              />
              <Route
                path="create-quiz"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <CreateQuiz />
                  </Suspense>
                }
              />
              <Route
                path="*"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <NotFound />
                  </Suspense>
                }
              />
            </Routes>
          </Suspense>
        </Router>
        <ToastContainer />
      </ErrorBoundary>
    </Provider>
  </React.StrictMode>
);

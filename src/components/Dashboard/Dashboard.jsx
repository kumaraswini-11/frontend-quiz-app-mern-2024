import React, { useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import useAxios from "../../hooks/useAxios";
import styles from "../Dashboard/Dashboard.module.css";
import { Sidebar } from "../";

function Dashboard({ activePage }) {
  const { user } = useSelector((store) => store.auth.userData.data);

  // Api Call for Post request
  const baseUrl = "http://localhost:8080/api/v1/";
  const { response, error, loading, submitRequest } = useAxios({
    method: "GET",
    url: `${baseUrl}/quizzes/quiz-analytics/${userId}`,
    requestConfig: {
      headers: {
        "Content-Language": "en-US",
      },
    },
  });

  useEffect(() => {
    submitRequest();
  }, [user]);

  return (
    <>
      <Sidebar />
      {loading && <p>Loading...</p>}
      {!loading && error && <p>Error: {error}</p>}
      {!loading && !error && response && (
        <div>
          {/* Render your data from the response */}
          <p>Data: {JSON.stringify(response)}</p>
        </div>
      )}
      {!loading && !error && !response && (
        <p>Nothing to display at this moment.</p>
      )}
    </>
  );
}

export default Dashboard;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { verifyAndGetDetails } from "../api/quizService";
import {
  Container,
  PageLoader,
  PlayQuiz as SharedLinkPlayQuiz,
  ResultPage,
} from "../components";

function PlayQuiz() {
  const { link } = useParams();
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState();
  const [showResult, setShowResult] = useState(false);
  const [testResult, setTestResult] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    (async () => {
      try {
        setLoading(true);
        const apiResponse = await verifyAndGetDetails(link, { signal });

        if (!apiResponse.data) {
          toast.error("Not a valid link. Please verify.");
          // navigate("/app/dashboard");
          return;
        }

        setQuestions(apiResponse.data);
      } catch (error) {
        toast.error("Server maintenance is ongoing. Please try again later.");
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      controller.abort();
    };
  }, [link]);

  // Loading state
  if (loading || !questions) {
    return <PageLoader />;
  }

  // There is no prop drilling problem, so no need to implement store
  return (
    <Container>
      {showResult ? (
        <ResultPage
          testResult={testResult}
          total={questions?.quizQuestions?.length || 0} // Check for undefined or null
        />
      ) : (
        <SharedLinkPlayQuiz
          quizAndQuestions={questions}
          setShowResult={setShowResult}
          setTestResult={setTestResult}
        />
      )}
    </Container>
  );
}

export default PlayQuiz;

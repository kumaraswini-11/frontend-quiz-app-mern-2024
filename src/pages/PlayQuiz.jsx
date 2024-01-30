import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { verifyAndGetDetails } from "../api/quizService";
import { PageLoader, PlayQuiz as SharedLinkPlayQuiz } from "../components";

function PlayQuiz() {
  const { link } = useParams();
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    (async () => {
      try {
        setLoading(true);
        const apiResponse = await verifyAndGetDetails(link, { signal });

        if (!apiResponse.data.apiLinkVerify.success) {
          toast.error("Not a valid link. Please verify.");
          // navigate("/app/dashboard");
          return;
        }

        // setQuestions(apiResponse.data);
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
  if (
    loading //|| questions === null
  ) {
    return <PageLoader />;
  }

  // There is no prop drilling problem so don't needed to impilment store
  return <SharedLinkPlayQuiz questions={questions} />;
}

export default PlayQuiz;

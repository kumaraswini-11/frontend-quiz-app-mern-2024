import { useEffect, useState } from "react";
import axios from "axios";

const useAxios = ({
  axiosInstance = axios,
  method = "GET",
  url,
  data = {},
  requestConfig = {},
}) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(0);

  const refetch = () => setReload(reload + 1);

  const submitRequest = async () => {
    const controller = new AbortController();

    try {
      setLoading(true);

      const config = {
        ...requestConfig,
        signal: controller.signal,
      };

      if (method.toLowerCase() === "get") {
        config.params = data;
      } else {
        config.data = data;
      }

      const response = await axiosInstance[method.toLowerCase()](url, config);
      setResponse(response.data);
    } catch (err) {
      if (!controller.signal.aborted) {
        setError(err.message);
      }
    } finally {
      if (!controller.signal.aborted) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (reload > 0) {
      submitRequest();
    }

    // Cleanup on unmount
    return () => {
      // Cleanup function to abort the request when the component unmounts
      const controller = new AbortController();
      controller.abort();
    };
  }, [reload]);

  return { response, error, loading, refetch, submitRequest };
};

export default useAxios;

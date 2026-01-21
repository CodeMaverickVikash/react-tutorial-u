import { useEffect, useState } from "react";

export function useFetch(opt) {
  const [isFetching, setIsfetching] = useState();
  const [error, setError] = useState();
  const [fetchedData, setFetchedData] = useState([]);

  const fetchData = async () => {
    setIsfetching(true);
    try {
      const data = await fetch(
        opt.url
      ).then((response) => response.json());

      setFetchedData(data);
    } catch (error) {
      setError({ message: error.message || "Failed to fetch" });
    }
    setIsfetching(true);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return {
    isFetching,
    error,
    fetchedData,
    setFetchedData
  };
}

import { useEffect, useState } from "react";
import Header from "../../component/Header";
import ProductPage from "./ProductPage";

const HomePage = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = "http://localhost:3000/";
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Login request failed");
        }

        const data = await response.json();
        setData(data);
        setIsLoading(false);
      } catch (error) {
        console.error("An error occurred:", error);
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      {data && <Header user={data.user} />}
      <ProductPage />
    </>
  );
};

export default HomePage;

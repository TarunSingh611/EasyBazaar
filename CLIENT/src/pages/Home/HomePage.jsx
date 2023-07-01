import { useEffect, useState } from 'react';
import Header from '../../component/Header';
import ProductPage from './ProductPage';

const HomePage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const url = "http://127.0.0.1:3000/";
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
    })
      .then(response => {
        if (response.ok) {
         
          return response.json();
        } else {
          throw new Error('Login request failed');
        }
      })
      .then(data => {
        setData(data);
      })
      .catch(error => {
        console.error('An error occurred:', error);
      });
  }, []);

  return (
    <>
      {data && <Header user={data.user} />}
      <ProductPage />
    </>
  );
};

export default HomePage;

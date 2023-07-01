import { useEffect, useState } from 'react';
import Header from '../../component/Header';
import PropTypes from 'prop-types';
import style from './cart.module.css';
import Cartitems from './cartItem';

const CartPage = () => {

  const [data, setData] = useState(null);

  useEffect(() => {
    const url = "http://127.0.0.1:3000/cart";
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
          throw new Error('cart load failed');
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
    <div>
       {data && <Header user={data.user} />}

      <div className={style.cartCon}>

      { <Cartitems/> }
        <div className={`${style.hid} ${style.pop}`}>
          {/* Content within the pop div */}
        </div>
      </div>

      <div className={style.message}></div>

      <script src="/cart.js"></script>
    </div>
  );
};

CartPage.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
    isAdmin: PropTypes.bool
  })
};

export default CartPage;

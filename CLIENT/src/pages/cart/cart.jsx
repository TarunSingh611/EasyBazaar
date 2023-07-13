import { useState, useEffect } from "react";
import Header from "../../component/Header";
import PropTypes from "prop-types";
import style from "./cart.module.css";
import apiGetCart from "../../api/apiGetCart";
import { useNavigate } from "react-router-dom";
import Cartitems from "./cartItem";

const CartPage = () => {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  async function getCartUser() {
    try {
      const apiRes = await apiGetCart();

      if (apiRes.res === 1) {
        navigate("/login");
      } else if (apiRes.res === 0) {
        console.log("NOT verified");
      } else {
        let data = apiRes.res;
        setData(data);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  useEffect(() => {
    getCartUser();
    //  eslint-disable-next-line
  }, []);

  return (
    <div>
      {data && <Header user={data} />}

      <div className={style.cartCon}>
        {<Cartitems />}
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
    isAdmin: PropTypes.bool,
  }),
};

export default CartPage;

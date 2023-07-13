import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import style from "./ProductHome.module.css";
import getProd from "../api/getProdDet";
import apiCartAuth from "../api/apiCartAuth";
import { useNavigate } from "react-router-dom";
// import apiGetCart from "../api/apiGetCart";
import Message from "../component/message";
import apiDoneCart from "../api/apiDoneCart";

function AppendProd({ item, showDetails }) {
  const navigate = useNavigate();
  const [adCart, setAdCart] = useState(false);
  const [inCart, setInCart] = useState(false);
  const [counter, setCount] = useState(1);

  const [formMessage, setMessage] = useState("");
  const [mesType, setMesType] = useState("");
  let mes;
  useEffect(() => {
    if (mes) {
      clearInterval(mes);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    mes = setTimeout(function () {
      setMessage("");
    }, 1500);
  }, [formMessage]);

  const incItem = () => {
    if (counter < item.stock) {
      setCount(counter + 1);
    } else {
      setMessage("Max stock Limit");
      setMesType("error");
    }
  };

  const decItem = () => {
    if (counter > 1) {
      setCount(counter - 1);
    } else {
      setMessage("Min cart Limit");
      setMesType("error");
    }
  };

  const doneCart = () => {
    let itemId = item.id;
    const no = parseInt(counter);
    let data = { itemId, no };
    apiDoneCart(data).then((result) => {
      if (result == 0) {
        navigate("/login");
        return;
      } else {
        setAdCart(false);
      }
    });
  };

  const canc = () => {
    setAdCart(false);
  };

  async function addCart(id) {
    const prod = await getProd(id);

    if (prod.stock < 1) {
      setMessage("out Of stock");
      setMesType("error");
    } else {
      const apiRes = await apiCartAuth(id);
      if (apiRes == 0) {
        navigate("/login");
      } else if (apiRes == 1) {
        setInCart(true);
      } else {
        setAdCart(true);
      }
    }
  }

  async function Go2Cart() {
    navigate("/cart");
  }

  // Prop types validation
  AppendProd.propTypes = {
    item: PropTypes.object.isRequired,
    showDetails: PropTypes.func.isRequired,
  };

  return (
    <div className={style.productCard} key={item.id}>
      <div className={style.productImage}>
        <img src={`http://localhost:3000/${item.image}`} alt="Product" />
      </div>
      <div className={style.productDetails}>
        <div className={style.productName}>
          <h3>{item.name}</h3>
          <h3>${item.price}</h3>
          {parseInt(item.stock) > 5 ? (
            <h6 style={{ color: "grey" }}>In stock left: {item.stock}</h6>
          ) : parseInt(item.stock) > 0 ? (
            <h6 style={{ color: "red" }}>In stock left: {item.stock}</h6>
          ) : (
            <h6 style={{ color: "red" }}>Out of stock</h6>
          )}
          <button
            className={style.showDetailsBtn}
            onClick={() => showDetails(item)}
          >
            Show details
          </button>
          {adCart ? (
            <div className={style.conDiv}>
              <div className={style.quantityDiv}>
                <button className={style.decrementBtn} onClick={decItem}>
                  -
                </button>
                <div className={style.quantity}>{counter}</div>
                <button className={style.incrementBtn} onClick={incItem}>
                  +
                </button>
              </div>
              <div className={style.buttonDiv}>
                <button className={style.doneBtn} onClick={doneCart}>
                  Done
                </button>
                <button className={style.cancelBtn} onClick={canc}>
                  Cancel
                </button>
              </div>
            </div>
          ) : inCart ? (
            <button className={style.goToCartBtn} onClick={Go2Cart}>
              Go to Cart
            </button>
          ) : (
            <button
              className={style.addToCartBtn}
              onClick={() => addCart(item.id)}
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
      {formMessage && mesType && <Message text={formMessage} type={mesType} />}
    </div>
  );
}

export default AppendProd;

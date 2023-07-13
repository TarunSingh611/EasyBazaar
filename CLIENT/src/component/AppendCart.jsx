import style from "../pages/cart/cart.module.css";
import PropTypes from "prop-types";
import { useState } from "react";
import getProd from "../api/getProdDet";

const url = "http://localhost:3000/";

const AppendCart = ({ item, showDetails, del }) => {
  const [counter, setCount] = useState([parseInt(item.Qn)]);

  const incItem = () => {
    let count = parseInt(counter) + 1;
    if (count <= item.stock) {
      updateCart(count);
    } else {
      console.log("stockMax");
    }
  };

  const decItem = () => {
    let count = parseInt(counter) - 1;
    if (count >= 1) {
      updateCart(count);
    } else {
      console.log("stockMin");
    }
  };

  async function updateCart(count) {
    const prod = await getProd(item.id);

    if (parseInt(prod.stock) < parseInt(count)) {
      return;
    } else {
      const data = { id: item.cartId, Qn: parseInt(count) };

      updateCartData(data, () => {
        console.log(count);
        setCount(count);
      });
    }
  }

  function updateCartData(userCart, callback) {
    const url = "http://localhost:3000/";
    fetch(`${url}cartItems`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userCart),
      credentials: "include",
    })
      .then((response) => {
        if (response.status === 200) {
          console.log("5");
          callback();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <div className={style.productCard} id={item.id} cartid={item.cartId}>
      <div className={style.productImage}>
        <img src={`${url}${item.image}`} alt={item.name} />
      </div>
      <div className={style.productDetails}>
        <div className={style.productName}>
          <h3>{item.name}</h3>
          <h3>${item.price}</h3>
          <h6 style={item.stock > 5 ? { color: "grey" } : { color: "red" }}>
            {item.stock > 0 ? `In stock left: ${item.stock}` : "Out of stock"}
          </h6>
          <span className={style.spanBut}>
            <button className={style.sInc} onClick={decItem}>
              -
            </button>
            <label className={style.qn}>{counter}</label>
            <button className={style.sDec} onClick={incItem}>
              +
            </button>
            <label onClick={() => del(item)}>&#128465;</label>
          </span>
          <button
            className={style.showDetailsBtn}
            onClick={() => showDetails(item)}
          >
            Show details
          </button>
        </div>
      </div>
    </div>
  );
};

AppendCart.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    cartId: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    stock: PropTypes.number.isRequired,
    Qn: PropTypes.number.isRequired,
    // Add more prop validations for other properties of the item
  }).isRequired,
  showDetails: PropTypes.func.isRequired,
  del: PropTypes.func.isRequired,
};

export default AppendCart;

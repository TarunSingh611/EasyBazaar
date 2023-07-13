import { useEffect, useState } from "react";
import style from "./cart.module.css";
import load from "../../api/getCartProduct";
import AppendCart from "../../component/AppendCart";
import getProd from "../../api/getProdDet";
import cartDel from "../../api/apiDelCart";
import GenPop from "../../component/GenPop";

const Cartitems = () => {
  const [products, setProducts] = useState([]);

  const [pop, setPop] = useState(false);

  const showDetails = async (item) => {
    try {
      const prod = await getProd(item.id);
      setPop(prod);
    } catch (error) {
      // Handle any errors that occurred during the request
      console.error(error);
    }
  };

  function Del(item) {
    cartDel(item).then((result) => {
      console.log(result);
      if (result === true) {
        const updatedProducts = products.filter(
          (product) => product.id !== item.id
        );
        setProducts(updatedProducts);
        console.log("Item deleted:", item);
      }
    });
  }

  useEffect(() => {
    load()
      .then((result) => {
        setProducts([...result]);
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  }, []);

  function funPop() {
    setPop(false);
  }

  return (
    <div className={style.cartBody}>
      <div className={style.productList}>
        {products.map((item) => (
          <AppendCart
            item={item}
            key={item.id}
            showDetails={showDetails}
            del={Del}
          />
        ))}
      </div>
      {pop ? <GenPop item={pop} funPop={funPop} /> : null}
      <div id="message"></div>
    </div>
  );
};

export default Cartitems;

import { useEffect, useState } from "react";
import style from "./admin.module.css";
import { useNavigate } from "react-router-dom";
import Header from "../../component/Header";
import { applyChanges, deleteProduct } from "../../api/apiadmin";
import load from "../../api/getHomeProduct";
const url = "http://localhost:3000/";

const AdminPage = () => {
  const [data, setData] = useState(null);
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/admin", {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();

          const result = data.res;

          if (result === 1) {
            navigate("/");
          } else {
            setData(data);
          }
        } else {
          console.log("response error");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadMoreProducts = async () => {
    try {
      const result = await load(products.length);
      setProducts([...products, ...result]);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    loadMoreProducts();
    // eslint-disable-next-line
  }, []);

  const handleApplyChanges = async (productId, productData) => {
    try {
      const { name, description, category, price, stock } = productData;

      // Validate the values
      if (
        typeof name !== "string" ||
        typeof description !== "string" ||
        typeof category !== "string" ||
        isNaN(parseFloat(price)) ||
        isNaN(parseInt(stock))
      ) {
        // Handle validation error
        console.error("Validation error: Invalid data format");
        return;
      }

      const updatedProduct = {
        id: productId,
        name,
        description,
        category,
        price: parseFloat(price),
        stock: parseInt(stock),
      };

      await applyChanges(updatedProduct, (message) => {
        setMessage(message);
      });
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await deleteProduct(productId, (message) => {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== productId)
        );
        setMessage(message);
      });
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div>
      {data && <Header user={data} />}

      <div id="product-list" className={style.productList}>
        {products.map((item) => (
          <div className={style.productCard} key={item.id} id={item.id}>
            <div className={style.productImage}>
              <img src={`${url}${item.image}`} alt="Product" />
            </div>
            <div className={style.productDetails}>
              <div className={style.productName}>
                <label>Name: </label>
                <input
                  type="text"
                  defaultValue={item.name}
                  onChange={(event) => (item.name = event.target.value)}
                />
                <label>Description: </label>
                <input
                  type="text"
                  defaultValue={item.description}
                  onChange={(event) => (item.description = event.target.value)}
                />
                <label>Category: </label>
                <input
                  type="text"
                  defaultValue={item.category}
                  onChange={(event) => (item.category = event.target.value)}
                />
                <label>Price: </label>
                <input
                  type="text"
                  defaultValue={item.price}
                  onChange={(event) => (item.price = event.target.value)}
                />
                <label>Stock: </label>
                <input
                  type="text"
                  defaultValue={item.stock}
                  onChange={(event) => (item.stock = event.target.value)}
                />
                <div className={style.buttonCon}>
                  <button
                    className={style.buttonApply}
                    onClick={() =>
                      handleApplyChanges(item.id, {
                        name: item.name,
                        description: item.description,
                        category: item.category,
                        price: item.price,
                        stock: item.stock,
                      })
                    }
                  >
                    Apply
                  </button>
                  <button
                    className={style.buttonDelete}
                    onClick={() => handleDeleteProduct(item.id)}
                    style={{ backgroundColor: "#ff0000" }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={style.message}>{message}</div>
      <button className={style.addProd} onClick={() => navigate("/adminAdd")}>
        &#9997;
      </button>

      <button className={style.loadMore} onClick={loadMoreProducts}>
        load more
      </button>
    </div>
  );
};

export default AdminPage;

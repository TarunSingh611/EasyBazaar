import { useEffect, useState } from 'react';
import style from './admin.module.css';
import { useNavigate } from 'react-router-dom';
import Header from '../../component/Header';
import { applyChanges, deleteProduct } from '../../api/apiadmin';
import load from '../../api/getHomeProduct';
const url="http://localhost:3000/"


const AdminPage = () => {
  const [data, setData] = useState(null);
  const [products,setProducts]= useState([])
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

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


  function LoadMore() {
    load(products.length)
      .then(result => {
   
        setProducts([...products, ...result]);
       
      })
      .catch(error => {
        console.error('An error occurred:', error);
      });
  }
  
useEffect(()=>{
   
  load(products.length)
  .then(result => {
    
    setProducts([...products, ...result]);
   
  })
  .catch(error => {
    console.error('An error occurred:', error);
  });
   // eslint-disable-next-line
  },[])


  const handleApplyChanges = async (event) => {
    event.preventDefault();
    const { parentNode } = event.target.parentNode.parentNode.parentNode.parentNode;
    const inputElements = parentNode.querySelectorAll('input');

    const product = {
      id: parentNode.id,
      name: inputElements[0].value,
      description: inputElements[1].value,
      category: inputElements[2].value,
      price: inputElements[3].value,
      stock: inputElements[4].value,
    };

    applyChanges(product, (message) => {
      setMessage(message);
    });
  };

  const handleDeleteProduct = async (event) => {
    event.preventDefault();
    const { parentNode } = event.target.parentNode.parentNode.parentNode.parentNode;
    const id = parentNode.id;

    deleteProduct(id, (message) => {
      parentNode.remove();
      setMessage(message);
    });
  };

  return (
    <div>
      {data && <Header user={data.user} />}
      
      <div id="product-list">
        {products.map((item) => (
          <div className={style.productCard} key={item.id} id={item.id}>
            <div className={style.productImage}>
              <img src={`${url}${item.image}`} alt="Product" />
            </div>
            <div className={style.productDetails}>
              <div className={style.productName}>
                <label>Name: </label>
                <input type="text" defaultValue={item.name} />
                <label>Description: </label>
                <input type="text" defaultValue={item.description} />
                <label>Category: </label>
                <input type="text" defaultValue={item.category} />
                <label>Price: </label>
                <input type="text" defaultValue={item.price} />
                <label>Stock: </label>
                <input type="text" defaultValue={item.stock} />
                <div className={style.button}>
                  <button onClick={handleApplyChanges}>Apply</button>
                  <button
                    onClick={handleDeleteProduct}
                    style={{ backgroundColor: '#ff0000' }}
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
      <button className={style.addProd} onClick={()=>navigate('/adminAdd')}>
        &#9997;
      </button>

      <button id="loadMore" onClick={LoadMore}>load more</button>
    </div>
  );
};

export default AdminPage;

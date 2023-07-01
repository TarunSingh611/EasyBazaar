import style from './cart.module.css';
import load from '../../api/getCartProduct';
import { useEffect, useState } from 'react';
import appendProd from '../../component/ProdHome';


const Cartitems = () => {
  const [products,setProducts]= useState([])

useEffect(()=>{
   
  load()
  .then(result => {
   
    setProducts([...products, ...result]);
   
  })
  .catch(error => {
    console.error('An error occurred:', error);
  });
   // eslint-disable-next-line
  },[])

  return (
    <div className={style.cartBody}>
      <div className={style.productList}>
      {products.map((item)=>{
        return appendProd(item);
      })}

      </div>
      <div className={style.hid} id="pop"></div>
      <div id="message"></div>
      
    </div>
  );
};


export default Cartitems;
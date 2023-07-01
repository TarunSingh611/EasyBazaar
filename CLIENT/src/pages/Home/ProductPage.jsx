import style from './ProductPage.module.css';
import load from '../../api/getHomeProduct';
import { useEffect, useState } from 'react';
import appendProd from '../../component/ProdHome';


const ProductPage = () => {
  const [products,setProducts]= useState([])
  function loadMore() {
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

  return (
    <div className={style.homeBody}>
      <div className={style.productList}>
      {products.map((item)=>{
        return appendProd(item);
      })}

      </div>
      <div className={style.hid} id="pop"></div>
      <div id="message"></div>
      <button onClick={()=>{loadMore()}}>load more</button>
    </div>
  );
};


export default ProductPage;
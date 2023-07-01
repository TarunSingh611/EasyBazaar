import style from './ProductHome.module.css';

function appendProd(item) {
  const showDetails = () => {
    console.log('showDetails');
  };

  const incItem = () => {
    console.log('incItem');
  };

  const decItem = () => {
    console.log('decItem');
  };

  const doneCart = () => {
    console.log('doneCart');
  };

  const canc = () => {
    console.log('canc');
  };

  const addCart = () => {
    console.log('addCart');
  };

  const Go2Cart = () => {
    console.log('Go2Cart');
  };

  return (
    <div className={style.productCard} key={item.id}>
      <div className={style.productImage}>
        <img src={`http://localhost:3000/`+item.image} alt="Product" />
      </div>
      <div className={style.productDetails}>
        <div className={style.productName}>
          <h3>{item.name}</h3>
          <h3>${item.price}</h3>
          {parseInt(item.stock) > 5 ? (
            <h6 style={{ color: 'grey' }}>In stock left: {item.stock}</h6>
          ) : parseInt(item.stock) > 0 ? (
            <h6 style={{ color: 'red' }}>In stock left: {item.stock}</h6>
          ) : (
            <h6 style={{ color: 'red' }}>Out of stock</h6>
          )}
          <button className={style.showDetailsBtn} onClick={showDetails}>
            Show details
          </button>
          <div className={style.conDiv}>
          <div className={style.quantityDiv}>
            <button className={style.decrementBtn} onClick={decItem}>-</button>
            <div className={style.quantity}>1</div>
            <button className={style.incrementBtn} onClick={incItem}>+</button>
            </div>
            <div className={style.buttonDiv}>
              <button className={style.doneBtn} onClick={doneCart}>Done</button>
              <button className={style.cancelBtn} onClick={canc}>Cancel</button>
            </div>
          </div>
          <button className={style.addToCartBtn} onClick={addCart}>Add to Cart</button>
          <button className={style.goToCartBtn} onClick={Go2Cart}>Go to Cart</button>
        </div>
      </div>
    </div>
  );
}

export default appendProd;

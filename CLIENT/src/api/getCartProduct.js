function Load() {
  const url="http://localhost:3000/cartItems"

  return new Promise((resolve) => {
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Load request failed');
      }
      return response.json();
    })
    .then(data => {
      const prodDetail = data.cartItems;
      resolve(prodDetail)
      
    })

    .catch(error => {
      console.error('An error occurred:', error);
    }
  );
  })}

export default Load;

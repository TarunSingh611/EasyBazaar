function load(loaded) {
  const url = 'http://localhost:3000/loadMore';

  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ loaded })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Load request failed');
        }
        return response.json();
      })
      .then(data => {
        
        const result = data.products;
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export default load;

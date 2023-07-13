const cartDel = async (item) => {
  const url = "http://localhost:3000/cart";

  try {
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: item.cartId }),
      credentials: "include",
    })
      .then((response) => {
        if (response.status === 200) {
          return true;
        }
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

export default cartDel;

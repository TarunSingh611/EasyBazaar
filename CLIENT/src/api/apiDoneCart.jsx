async function apiDoneCart(data) {
  const url = `http://localhost:3000/`;

  try {
    const response = await fetch(`${url}addCart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      throw new Error("Request failed with status " + response.status);
    }
  } catch (error) {
    console.error(error);
  }
}

export default apiDoneCart;

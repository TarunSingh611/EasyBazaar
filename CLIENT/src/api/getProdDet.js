// getProd function
async function getProd(id) {
  if (id) {
    const url = "http://localhost:3000/showDetail";
    const data = { id };

    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    })
      .then((response) => response.json())
      .then((parsedResponse) => parsedResponse.prod[0]);
  }
  id = null;
}
export default getProd;

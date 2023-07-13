async function apiCartAuth(data) {
  const url = "http://localhost:3000/cartAuth";
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data }),
    credentials: "include",
  })
    .then((response) => response.text())
    .then((responseText) => {
      return responseText;
    })
    .catch((error) => {
      console.error("An error occurred:", error);
    });
}

export default apiCartAuth;

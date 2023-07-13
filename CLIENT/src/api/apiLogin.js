const postLogin = (data) => {
  const url = "http://localhost:3000/login";

  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(data),
    credentials: "include",
  })
    .then((response) => response.text())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

const getLogin = async () => {
  const url = "http://localhost:3000/login";
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      credentials: "include",
    });

    if (response) {
      return await response.text();
    } else {
      throw new Error("Login request failed");
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

export { getLogin, postLogin };

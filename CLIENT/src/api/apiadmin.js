const url = "http://localhost:3000/";

const admHome = async (product) => {
  try {
    const response = await fetch(`${url}admin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(product),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to apply changes");
    }
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
};

const admDel = async (id) => {
  try {
    const response = await fetch(`${url}deleteProduct`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({ id }),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to delete product");
    }
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
};

const applyChanges = async (product, callback) => {
  if (!Number.isInteger(Number(product.stock))) {
    callback("Invalid stock format. Stock should be an integer.");
    return;
  }

  if (!/^\d+(\.\d{1,2})?$/.test(product.price)) {
    callback(
      "Invalid price format. Price should be a decimal number with up to two decimal places."
    );
    return;
  }

  try {
    await admHome(product);
    callback("Changes have been applied");
  } catch (error) {
    console.error("An error occurred:", error);
    callback("Failed to apply changes");
  }
};

const deleteProduct = async (id, callback) => {
  try {
    await admDel(id);
    callback("Product deleted from the database");
  } catch (error) {
    console.error("An error occurred:", error);
    callback("Failed to delete product");
  }
};

export { admHome, admDel, applyChanges, deleteProduct };

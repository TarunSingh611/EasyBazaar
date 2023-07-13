import { useState, useEffect } from "react";
import styles from "./adminAdd.module.css";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/adminAdd", {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();

          const result = data.res;

          if (result === 1) {
            navigate("/");
          }
        } else {
          console.log("response error");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      setMessage("REQUIRED FIELD EMPTY");
      showMessage("error");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("desc", description);
    formData.append("price", price);
    formData.append("cat", category);
    formData.append("stock", stock);
    formData.append("pfp", image);

    fetch("http://localhost:3000/adminAdd", {
      method: "POST",
      body: formData,
      credentials: "include",
    })
      .then((response) => response.text())
      .then((data) => {
        if (data === "0") {
          setMessage("REQUIRED FIELD EMPTY");
          showMessage("error");
        } else if (data === "1") {
          setMessage("No file uploaded");
          showMessage("error");
        } else if (data === "2") {
          setMessage("Upload Successful");
          showMessage("success");
          resetForm();
        } else {
          setMessage("Error");
          showMessage("error");
        }
      })
      .catch((error) => {
        console.log(error);
        setMessage("Error");
        showMessage("error");
      });
  };

  const validateForm = () => {
    if (!image) {
      setMessage("No image uploaded");
      return false;
    }

    const fileSize = image.size; // Size in bytes
    const fileType = image.type; // File type

    const allowedExtensions = ["image/jpeg", "image/jpg", "image/png"];
    const maxSize = 250 * 1024; // 250 KB

    if (fileSize > maxSize) {
      setMessage("Image size exceeds the allowed limit of 250KB.");
      return false;
    }

    if (!allowedExtensions.includes(fileType)) {
      setMessage(
        "Invalid image type. Only JPEG, JPG, and PNG files are allowed."
      );
      return false;
    }

    if (!/^\d+(\.\d{2})?$/.test(price)) {
      setMessage(
        "Invalid price format. Price should be a decimal number with two decimal places."
      );
      return false;
    }

    if (!/^\d+(\.\d{1,2})?$/.test(stock)) {
      setMessage(
        "Invalid stock format. Stock should be an integer or decimal number."
      );
      return false;
    }

    return true;
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setPrice("");
    setCategory("");
    setStock("");
    setImage(null);
  };

  const showMessage = () => {
    setMessage(message);
    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>WELCOME ADMIN</h1>
        <div className={styles.formContainer}>
          <form
            id="uploadForm"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
          >
            <label className={styles.label} htmlFor="name">
              Name:
            </label>
            <input
              className={styles.inputField}
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <br />

            <label className={styles.label} htmlFor="desc">
              Description:
            </label>
            <textarea
              className={styles.inputField}
              id="desc"
              name="desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
            <br />

            <label className={styles.label} htmlFor="price">
              Price:
            </label>
            <input
              className={styles.inputField}
              type="number"
              id="price"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              pattern="\d+(\.\d{1,2})?"
              title="Please enter a valid decimal number (up to 2 decimal places)"
            />
            <div className={styles.error} id="priceError"></div>
            <br />

            <label className={styles.label} htmlFor="cat">
              Category:
            </label>
            <input
              className={styles.inputField}
              type="text"
              id="cat"
              name="cat"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
            <br />

            <label className={styles.label} htmlFor="stock">
              Stock:
            </label>
            <input
              className={styles.inputField}
              type="number"
              id="stock"
              name="stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              required
            />
            <div className={styles.error} id="stockError"></div>
            <br />

            <label className={styles.label} htmlFor="pfp">
              Product Image:
            </label>
            <input
              className={styles.fileField}
              type="file"
              id="pfp"
              name="pfp"
              onChange={(e) => setImage(e.target.files[0])}
            />
            <div className={styles.error} id="imageError"></div>
            <br />

            <button className={styles.submitButton} type="submit">
              ADD PRODUCT
            </button>
          </form>
        </div>
      </div>
      <a href="/admin">
        <div className={styles.addProd}>&#8634;</div>
      </a>
      <div className={styles.message} id="message">
        {message}
      </div>
    </>
  );
}

export default AddProduct;

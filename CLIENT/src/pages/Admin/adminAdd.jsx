import  { useState } from 'react';
import styles from './adminAdd.module.css';

function AddProduct() {
  const [message, setMessage] = useState('');
  
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      setMessage('REQUIRED FIELD EMPTY');
      showMessage('error');
      return;
    }

    const form = event.target;
    const formData = new FormData(form);

    fetch('/adminAdd', {
      method: 'POST',
      body: formData
    })
      .then(response => response.text())
      .then(data => {
        if (data === '0') {
          setMessage('REQUIRED FIELD EMPTY');
          showMessage('error');
        } else if (data === '1') {
          setMessage('No file uploaded');
          showMessage('error');
        } else if (data === '2') {
          setMessage('Upload Successful');
          showMessage('success');
          form.reset();
        } else {
          setMessage('Error');
          showMessage('error');
        }
      })
      .catch(error => {
        console.log(error)
        setMessage('Error');
        showMessage('error');
      });
  };

  const validateForm = () => {
    const fileInput = document.getElementById('pfp');
    const fileSize = fileInput.files[0]?.size; // Size in bytes
    const fileType = fileInput.files[0]?.type; // File type

    const allowedExtensions = ['image/jpeg', 'image/jpg', 'image/png'];
    const maxSize = 250 * 1024; // 250 KB

    if (fileSize && fileSize > maxSize) {
      setMessage('Image size exceeds the allowed limit of 250KB.');
      return false;
    }

    if (fileType && !allowedExtensions.includes(fileType)) {
      setMessage('Invalid image type. Only JPEG, JPG, and PNG files are allowed.');
      return false;
    }

    const priceInput = document.getElementById('price');
    const priceValue = priceInput.value;

    if (!/^\d+(\.\d{2})?$/.test(priceValue)) {
      setMessage('Invalid price format. Price should be a decimal number with two decimal places.');
      return false;
    }

    const stockInput = document.getElementById('stock');
    const stockValue = stockInput.value;

    if (!/^\d+(\.\d{1,2})?$/.test(stockValue)) {
      setMessage('Invalid stock format. Stock should be an integer or decimal number.');
      return false;
    }

    return true;
  };

  const showMessage = (type) => {
    const messageElement = document.getElementById('message');
    messageElement.className = `${styles.message} ${styles[type]}`;
    messageElement.innerText = message;
    messageElement.style.display = 'block';

    setTimeout(() => {
      messageElement.style.display = 'none';
    }, 2000);
  };

  return (
    <>
      <h1 className={styles.title}>WELCOME ADMIN</h1>

      <form id="uploadForm" encType="multipart/form-data" onSubmit={handleSubmit}>
        <label className={styles.label} htmlFor="name">
          Name:
        </label>
        <input className={styles.inputField} type="text" id="name" name="name" required /><br />

        <label className={styles.label} htmlFor="desc">
          Description:
        </label>
        <textarea className={styles.inputField} id="desc" name="desc" required></textarea><br />

        <label className={styles.label} htmlFor="price">
          Price:
        </label>
        <input
          className={styles.inputField}
          type="text"
          id="price"
          name="price"
          required
          pattern="\d+(\.\d{1,2})?"
          title="Please enter a valid decimal number (up to 2 decimal places)"
        />
        <div className={styles.error} id="priceError"></div><br />

        <label className={styles.label} htmlFor="cat">
          Category:
        </label>
        <input className={styles.inputField} type="text" id="cat" name="cat" required /><br />

        <label className={styles.label} htmlFor="stock">
          Stock:
        </label>
        <input className={styles.inputField} type="number" id="stock" name="stock" required />
        <div className={styles.error} id="stockError"></div><br />

        <label className={styles.label} htmlFor="pfp">
          Product Image:
        </label>
        <input className={styles.fileField} type="file" id="pfp" name="pfp" />
        <div className={styles.error} id="imageError"></div><br />

        <button className={styles.submitButton} type="submit">ADD PRODUCT</button>
      
     
      </form>
      <a href="/admin">
        <div id="addProd">&#8634;</div>
      </a>
      <div className={styles.message} id="message"></div>
    </>
  );
}

export default AddProduct;

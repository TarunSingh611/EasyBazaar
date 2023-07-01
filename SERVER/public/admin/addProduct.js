document.addEventListener('DOMContentLoaded', function() {
  var form = document.getElementById('uploadForm');
 
 var message = document.getElementById('message');
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    if (!validateForm()) {
      message.innerText = "REQUIRED FIELD EMPTY";
      message.style.backgroundColor = "#ff0000";
      message.style.display = "block";

      // Hide the message element after 2 seconds
      setTimeout(() => {
        message.style.display = "none";
        return;
      }, 2000);

      // Don't submit the form if validation fails
      return;
    }

    var formData = new FormData(form);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/adminAdd', true);
    xhr.onload = function() {
      if (xhr.responseText == '0') {
        message.innerText = "REQUIRED FIELD EMPTY";
        message.style.backgroundColor = "#ff0000";
      } else if (xhr.responseText == '1') {
        message.innerText = "No file uploaded";
        message.style.backgroundColor = "#ff0000";
      } else if (xhr.responseText == '2') {
        message.innerText = "Upload Successful";
        message.style.backgroundColor = "#008000";
        form.reset();
      } else {
        message.innerText = "Error";
      }

      message.style.display = "block";

      // Hide the message element after 2 seconds
      setTimeout(() => {
        message.style.display = "none";
      }, 2000);
    };

    xhr.send(formData);
  });

  function validateForm() {
    var fileInput = document.getElementById("pfp");
    var fileSize = fileInput.files[0].size; // Size in bytes
    var fileType = fileInput.files[0].type; // File type

    var allowedExtensions = ["image/jpeg", "image/jpg", "image/png"];
    var maxSize = 250 * 1024; // 250 KB

    if (fileSize > maxSize) {
      message.innerText = "Image size exceeds the allowed limit of 250KB.";
      return false;
    }

    if (!allowedExtensions.includes(fileType)) {
      message.innerText = "Invalid image type. Only JPEG, JPG, and PNG files are allowed.";
      return false;
    }

    var priceInput = document.getElementById("price");
    var priceValue = priceInput.value;

    if (!/^\d+(\.\d{2})?$/.test(priceValue)) {
      message.innerText = "Invalid price format. Price should be a decimal number with two decimal places.";
      return false;
    }

    var stockInput = document.getElementById("stock");
    var stockValue = stockInput.value;

    if (!/^\d+(\.\d{1,2})?$/.test(stockValue)) {
      message.innerText = "Invalid stock format. Stock should be an integer or decimal number.";
      return false;
    }

    return true;
  }
});
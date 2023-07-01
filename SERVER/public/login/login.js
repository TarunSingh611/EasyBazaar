const signIN = document.getElementById("Sub");

signIN.addEventListener("click", function(event) {
  event.preventDefault();

  let email = document.getElementById("UserEM").value;
  let password = document.getElementById("PassChk").value;

  let data = {
    email: email,
    pass: password
  };

  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/login");
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  xhr.onload = function() {
    if (xhr.status === 200) {
      if (xhr.response === '0') {
        let message = document.getElementById("message");

        message.innerText = 'Account does not exist';
        message.style.display = "block";
        message.style.background = '#ff0000';

        setTimeout(() => {
          message.style.display = "none";
        }, 1600);
      } else if (xhr.response === '1') {
        let message = document.getElementById("message");

        message.innerText = 'Email and password does not match';
        message.style.display = "block";
        message.style.background = '#ff0000';

        setTimeout(() => {
          message.style.display = "none";
        }, 1600);
      } else if (xhr.response === '2') {
        window.location.href = '/';
      }
      else if (xhr.response === '3') {
        let message = document.getElementById("message");

        message.innerText = 'Account Needs to be verified ';
        message.style.display = "block";
        message.style.background = '#ff0000';

        setTimeout(() => {
          message.style.display = "none";
        }, 1600);
        
        setTimeout(() => {
          window.location.href = '/';
        }, 1600);
       
      }
    }
  };

  xhr.send(JSON.stringify(data));
});

const showPasswordCheckbox = document.getElementById('showPassword');
function togglePasswordVisibility(inputId, iconId) {
  var passwordInput = document.getElementById(inputId);
  var toggleIcon = document.getElementById(iconId).querySelector("i");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    toggleIcon.classList.remove("fa-eye-slash");
    toggleIcon.classList.add("fa-eye");
  } else {
    passwordInput.type = "password";
    toggleIcon.classList.remove("fa-eye");
    toggleIcon.classList.add("fa-eye-slash");
  }
}
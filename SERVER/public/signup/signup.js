var username = document.getElementById("Username");
var email = document.getElementById("email");
var pass = document.getElementById("pass");
var pVer = document.getElementById("pVer");

var usernameErr = document.getElementById("username-err");
var emailErr = document.getElementById("email-err");
var passErr = document.getElementById("pass-err");
var pVErr = document.getElementById("pVer-err");

username.addEventListener('blur', function(e) {
    var pattern = /^[\w]{1,9}$/;
    var currentValue = e.target.value;
    var valid = pattern.test(currentValue);
    if (currentValue === "") { usernameErr.style.display = 'none'; } else if (valid) { usernameErr.style.display = 'none'; } else { usernameErr.style.display = 'block'; }
})

email.addEventListener('blur', function(e) {
    var pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var currentValue = e.target.value;
    var valid = pattern.test(currentValue);
    if (currentValue === "") { emailErr.style.display = 'none'; } else if (valid) { emailErr.style.display = 'none'; } else { emailErr.style.display = 'block'; }
})

pass.addEventListener('input', function(e) {
    var pattern = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;
    var currentValue = e.target.value;
    var valid = pattern.test(currentValue);
    if (currentValue === "") { passErr.style.display = 'none'; } else if (valid) { passErr.style.display = 'none'; } else { passErr.style.display = 'block'; }
})

pVer.addEventListener('input', function(e) {
    var Pass = pass.value;
    var RePass = e.target.value;
    if (RePass === "") { pVErr.style.display = 'none'; } else if (Pass === RePass) { pVErr.style.display = 'none'; } else { pVErr.style.display = 'block'; }
})

const form=document.getElementById("form1")

const signUP = document.getElementById("signUpSub")
form.addEventListener('submit', function(event) {
   event.preventDefault()
    var ver = 1;
    if(! (/^[\w]{1,9}$/.test(username.value)) ||username.value ==="Guest User"){
        ver = 0;
        passErr.style.display = 'block';
        username.value = "";
    }

    if (!(/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/.test(pass.value))) {
        ver = 0;
        passErr.style.display = 'block';
        pass.value = "";
    }

    if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email.value)))  {
        emailErr.style.display = 'block';
        email.value = "";
        ver = 0;
    }

    if (pass.value !== pVer.value) {
        ver = 0;
        pVErr.style.display = 'block';
        pVer.value = "";
    }
    if (ver===1) {formSub(); }
});
/////////
//////////
///////////



function formSub() {
    let form = document.getElementById("form1");
    let data = {
      username: form.elements["username"].value,
      email: form.elements["email"].value,
      pass: form.elements["pass"].value,
    };
  
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/signup");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.send(JSON.stringify(data));
  
    xhr.addEventListener("load", function () {
      if (xhr.status == 200) {
        if (xhr.response == "0") {
          let message = document.getElementById("message");
          message.innerText = "e-mail Already in Use";
          message.style.display = "block";
          message.style.background = "#ff0000";
          // Hide the message element after 2 seconds
          setTimeout(() => {
            message.style.display = "none";
          }, 1600);
        } else if (xhr.response == "1") {
            


            let message = document.getElementById("message");
            message.innerText = "Account Creation successful";
            message.style.display = "block";
            message.style.background = "#4CAF50";
            // Hide the message element after 2 seconds
            setTimeout(() => {
                message.style.background = "#FFFF00";
                message.style.color = "#000000";
                message.innerText = "Waiting For email Verification";},1200)

                setTimeout(() => {
                    message.style.color = "#000000";
                    message.style.display = "none"},2900)

            setTimeout(function(){
                window.location.href = "/"},3000)
         
        }
      }
    });
  }
  
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
  
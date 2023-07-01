
import style from './pass.module.css';
import { useNavigate } from 'react-router-dom';

function ChangePass() {
  const navigate =useNavigate();

  const handleVerifyPassword = () => {
    const inp = document.getElementById("subIn");
    const url = "http://localhost:3000/changePass";
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type", "application/json");
    const data = { currpass: inp.value };
    xhr.send(JSON.stringify(data));
    xhr.addEventListener("load", function () {
      if (xhr.status === 200) {
        if (xhr.responseText === '1') {
          navigate("/newPass");
        } else {
          let message = document.getElementById("message");

          message.innerText = 'Wrong password entered, Try Again';
          message.style.display = "block";
          message.style.background = '#ff0000';
          // Hide the message element after 2 seconds
          setTimeout(() => {
            message.style.display = "none";
          }, 1600);
        }
      }
    });
  };

  const togglePasswordVisibility = () => {
    const passToggle = document.getElementById("pass-toggle");
    const pass = document.getElementById("subIn");

    if (pass.type === "password") {
      pass.type = "text";
      passToggle.classList.add(style.shut);
    } else {
      pass.type = "password";
      passToggle.classList.remove(style.shut);
    }
  };

  return (<div className={style.passContainer}>
    <div className='passBody'>
      <label className="label">Change Password: Enter current Password</label>

      <div className={`${style.inputContainer}`}>
        <input type="password" id="subIn" name="currpass" />
        <span className={`${style.eyeIcon}`} id="pass-toggle" onClick={togglePasswordVisibility}>
          <i className="fa fa-eye-slash"></i>
        </span>
      </div>

      <button type="submit" className={`${style.subBut}`} onClick={handleVerifyPassword}>
        Verify Password
      </button>

      <div id="message"></div>
    </div></div>
  );
}

export default ChangePass;

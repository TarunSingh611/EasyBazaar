
import style from './pass.module.css';
// import { useNavigate } from 'react-router-dom';



function ForgotPass() {
  // const navigate =useNavigate();

function handleVerifyEmail() {
  const inp = document.getElementById("subIn");
  const url = "http://localhost:3000/forgotPass";
  const xhr = new XMLHttpRequest();
  xhr.open("POST", url);
  xhr.setRequestHeader("Content-Type", "application/json");
  const data = { email: inp.value };
  xhr.send(JSON.stringify(data));
  xhr.addEventListener("load", function () {
    if (xhr.status === 200) {
      if (xhr.response === '0') {
        let message = document.getElementById("message");

        message.innerText = 'Account does not exist';
        message.style.display = "block";
        message.style.background = '#ff0000';
        // Hide the message element after 2 seconds
        setTimeout(() => {
          message.style.display = "none";
        }, 1600);
      } else if (xhr.response === '1') {
        let message = document.getElementById("message");

        message.innerText = 'Check Email for the Link to change Password';
        message.style.display = "block";
        message.style.background = '#4CAF50';
        // Hide the message element after 2 seconds
        setTimeout(() => {
          message.style.display = "none";
        }, 1600);
      }
    }
  });
}


  return (<div className={style.passContainer}>
    <div className='passBody'>
    <label className="label">Change Password: Enter Email</label>
<br/>
      <input type="email" className={style.subIn} name="email" />

      <button type="submit" className={style.subBut} onClick={handleVerifyEmail}>
        Verify Email
      </button>

      <div id="message" className={style.message}></div>
    </div></div>
  );
}

export default ForgotPass;

import { useState } from "react";
import style from "./pass.module.css";

function ForgotPass() {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function handleVerifyEmail() {
    const url = "http://localhost:3000/forgotPass";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
      credentials: "include",
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        if (data === "0") {
          setErrorMessage("Account does not exist");
        } else if (data === "1") {
          setErrorMessage("Check Email for the Link to change Password");
        }
        setTimeout(() => {
          setErrorMessage("");
        }, 2000);
      })
      .catch((error) => {
        console.error("Error verifying email:", error);
      });
  }

  return (
    <div className={style.passContainer}>
      <div className="passBody">
        <label className="label">Change Password: Enter Email</label>
        <br />
        <div className={`${style.inputContainer}`}>
          <input
            type="email"
            className={style.subIn}
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <button
          type="submit"
          className={style.subBut}
          onClick={handleVerifyEmail}
        >
          Verify Email
        </button>

        {errorMessage && (
          <div
            id="message"
            className={style.message}
            style={{
              background: errorMessage.includes("Check")
                ? "#4CAF50"
                : "#ff0000",
            }}
          >
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
}

export default ForgotPass;

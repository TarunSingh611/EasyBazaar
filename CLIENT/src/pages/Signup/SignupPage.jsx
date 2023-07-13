import { useEffect, useState } from "react";
import style from "./SignUpPage.module.css";
import { getSignup, postSignUp } from "../../api/apiSignup";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Message from "../../component/message";

function SignUpPage() {
  const navigate = useNavigate();

  //////Hooks

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");

  const [usernameErr, setUsernameErr] = useState(true);
  const [emailErr, setEmailErr] = useState(true);
  const [passErr, setPassErr] = useState(true);
  const [pVErr, setPVErr] = useState(true);

  const [formMessage, setFormMessage] = useState("");
  const [mesType, setMesType] = useState("");

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordVerifyVisible, setIsPasswordVerifyVisible] = useState(false);

  //////////////
  ////API CALLS
  //////////////

  getSignup()
    .then((result) => {
      if (result === "0") {
        navigate("/");
      }
    })
    .catch((error) => {
      console.error("Get signup error:", error);
    });

  ////message

  const togglePasswordVisibility = (field) => {
    if (field === "pass") {
      setIsPasswordVisible((prevValue) => !prevValue);
    } else if (field === "pVer") {
      setIsPasswordVerifyVisible((prevValue) => !prevValue);
    }
  };

  let mes;
  useEffect(() => {
    if (mes) {
      clearInterval(mes);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    mes = setTimeout(function () {
      setFormMessage("");
    }, 1500);
  }, [formMessage]);

  //////handleing input
  const handleBlurUsername = (e) => {
    const pattern = /^[a-zA-Z0-9]{1,9}$/;

    const currentValue = e.target.value;
    const valid = pattern.test(currentValue);
    setUsernameErr(valid);
  };

  const handleBlurEmail = (e) => {
    const pattern =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    const currentValue = e.target.value;
    const valid = pattern.test(currentValue);
    setEmailErr(valid);
  };

  const handleInputPass = (e) => {
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

    const currentValue = e.target.value;
    const valid = pattern.test(currentValue);
    setPassErr(valid);
    setPassword(currentValue);
  };

  const handleInputPVer = (e) => {
    const currentValue = e.target.value;
    setPVErr(password === currentValue);
    setPasswordVerify(currentValue);
  };

  ///////submit function
  const handleSubmit = () => {
    const isFormValid =
      username &&
      email &&
      password &&
      passwordVerify &&
      usernameErr &&
      emailErr &&
      passErr &&
      pVErr
        ? true
        : false;

    if (isFormValid) {
      const data = {
        username,
        email,
        pass: password,
        newPort: 5173,
      };

      //////api for post
      postSignUp(data)
        .then((response) => {
          if (response === 0) {
            setMesType("error");
            setFormMessage("Email Already in Use");
          } else if (response === 1) {
            setMesType("success");
            setFormMessage("Account Creation Successful");

            setTimeout(() => {
              setMesType("default");
              setFormMessage("Waiting For Email Verification");
            }, 1200);
            setTimeout(() => {
              navigate("/login");
            }, 3000);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          setFormMessage("An error occurred during sign up");
        });
    } else {
      setFormMessage("Please fill in all required fields");
    }
  };

  ///////////return statement

  return (
    <div className={style.signupBody}>
      <h1 className={style.signupText}>SIGN UP</h1>
      <div className={style.form} id="form1" noValidate>
        <input
          name="username"
          type="text"
          placeholder="Username"
          className={`${style.input} ${usernameErr ? style.error : ""}`}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onBlur={handleBlurUsername}
          required
        />
        {!usernameErr && (
          <p className={style.inputErr}>Please enter a valid username</p>
        )}

        <input
          name="email"
          type="email"
          autoComplete="off"
          placeholder="Email"
          className={`${style.input} ${emailErr ? style.error : ""}`}
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={handleBlurEmail}
          required
        />
        {!emailErr && (
          <p className={style.inputErr}>You have entered an invalid email</p>
        )}

        <input
          name="pass"
          type={isPasswordVisible ? "text" : "password"}
          placeholder="Password"
          autoComplete="off"
          className={`${style.input} ${passErr ? style.error : ""}`}
          id="pass"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onInput={handleInputPass}
          required
        />
        <span
          id="togglePassword1"
          className={style.togglePassword}
          onClick={() => togglePasswordVisibility("pass")}
        >
          <FontAwesomeIcon icon={faEyeSlash} />
        </span>
        {!passErr && (
          <p className={style.inputErr}>Please use a strong password</p>
        )}

        <input
          name="pVer"
          type={isPasswordVerifyVisible ? "text" : "password"}
          placeholder="Re-Enter Password"
          autoComplete="off"
          className={`${style.input} ${pVErr ? style.error : ""}`}
          id="pVer"
          value={passwordVerify}
          onChange={(e) => setPasswordVerify(e.target.value)}
          onInput={handleInputPVer}
          required
        />
        <span
          id="togglePassword2"
          className={style.togglePassword}
          onClick={() => togglePasswordVisibility("pVer")}
        >
          <FontAwesomeIcon icon={faEyeSlash} />
        </span>
        {!pVErr && <p className={style.inputErr}>Passwords do not match</p>}
        <div className={style.butDiv}>
          <input
            type="submit"
            value="Sign Up"
            className={style.btn}
            onClick={handleSubmit}
            id="signUpSub"
          />
          <div onClick={() => navigate("/login")}>
            <input
              type="submit"
              value="Log In"
              className={style.btn}
              id="loginSub"
            />
          </div>
        </div>
      </div>
      {formMessage && mesType && <Message text={formMessage} type={mesType} />}
    </div>
  );
}

export default SignUpPage;

import { useState, useEffect } from "react";
import style from "./LoginPage.module.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Message from "../../component/message";
import { getLogin, postLogin } from "../../api/apiLogin";

function LoginPage() {
  ////////////JS
  const navigate = useNavigate();
  // const [logged, setLogged] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formMessage, setMessage] = useState("");
  const [mesType, setMesType] = useState("");

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  let mes;
  useEffect(() => {
    if (mes) {
      clearInterval(mes);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    mes = setTimeout(function () {
      setMessage("");
    }, 1500);
  }, [formMessage]);

  ///////GET login
  getLogin()
    .then((result) => {
      if (result === "0") {
        navigate("/");
      }
    })
    .catch((error) => {
      console.error("Get signup error:", error);
    });

  const handleLogin = async () => {
    const data = {
      email: email,
      pass: password,
    };
    ///////////POST login
    postLogin(data)
      .then((result) => {
        if (result === "0") {
          setMesType("error");
          setMessage("Account does not exist");
        } else if (result === "1") {
          setMesType("error");
          setMessage("Email and password do not match");
        } else if (result === "2") {
          navigate("/");
        } else if (result === "3") {
          setMesType("default");
          setMessage("Account needs to be verified");
          setTimeout(() => {
            navigate("/");
          }, 1600);
        }
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  };

  return (
    <div className={style.loginBody}>
      <div className={style.form}>
        <h1 className={style.loginText}>LOG IN</h1>
        <input
          name="email"
          type="email"
          placeholder="Email"
          className={style.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          name="pass"
          type={passwordVisible ? "text" : "password"}
          placeholder="Password"
          autoComplete="off"
          className={style.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span
          className={`${style.togglePassword} ${style.togglePassword1}`}
          onClick={togglePasswordVisibility}
        >
          <FontAwesomeIcon icon={faEyeSlash} />
        </span>
        <br />

        <button
          type="button"
          className={`${style.btn} ${style.sub}`}
          onClick={handleLogin}
        >
          LogIn
        </button>
        <a onClick={() => navigate("/ForgotPass")} className={style.link}>
          Forgot your password?
        </a>
        <span className={style.newUser}>
          <a onClick={() => navigate("/signup")}>Create an account</a>
          <br />
          <a onClick={() => navigate("/")}>continue as Guest</a>
        </span>
        {formMessage && mesType && (
          <Message text={formMessage} type={mesType} />
        )}
      </div>
    </div>
  );
}

export default LoginPage;

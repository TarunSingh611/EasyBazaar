import { useState } from 'react';
import style from './LoginPage.module.css';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate =useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [message, setMessage] = useState('');

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = async () => {
    const data = {
      email: email,
      pass: password
    };
    const url="http://127.0.0.1:3000/login";
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        withCredentials: true, // Include cookies in the request
        body: JSON.stringify(data),
      });
      

      if (response.ok) {
        const result = await response.text();
        if (result === '0') {
          showMessage('Account does not exist');
        } else if (result === '1') {
          showMessage('Email and password do not match');
        } else if (result === '2') {
         navigate('/');
        } else if (result === '3') {
          showMessage('Account needs to be verified');
          setTimeout(() => {
            navigate('/');
          }, 1600);
        }
      } else {
        throw new Error('Login request failed');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const showMessage = (message) => {
    setMessage(message);

    setTimeout(() => {
      setMessage('');
    }, 1600);
  };

  return (
    <div className={style.loginBody}>
      <h1 className={style.loginText}>LOG IN</h1>
      <div className={style.form}>
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
          type={passwordVisible ? 'text' : 'password'}
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
          {/* <FontAwesomeIcon icon={faEyeSlash} /> */}
        </span>
        <br />

        <button
          type="button"
          className={`${style.btn} ${style.sub}`}
          onClick={handleLogin}
        >
          LogIn
        </button>
        <a onClick={()=>navigate("/ForgotPass")} className={style.link}>
          Forgot your password?
        </a>
        <span className={style.newUser}>
          <a onClick={()=>navigate("/signup")}>Create an account</a>
          <br />
          <a onClick={()=>navigate("/")}>continue as Guest</a>
        </span>
        {message && (
          <div className={style.message} style={{ background: '#ff0000' }}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginPage;

import { useState } from 'react';
import style from './SignUpPage.module.css';
import apiSignUp from '../../api/apiSignup';
import { useNavigate } from 'react-router-dom';

function SignUpPage() {
  const navigate =useNavigate();
  
const [username, setUsername] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [passwordVerify, setPasswordVerify] = useState('');
const [usernameErr, setUsernameErr] = useState(false);
const [emailErr, setEmailErr] = useState(false);
const [passErr, setPassErr] = useState(false);
const [pVErr, setPVErr] = useState(false);
const [formMessage, setFormMessage] = useState('');

const togglePasswordVisibility = (field) => {
setPassErr(false); // Clear password error when toggling visibility
if (field === 'pass') {
setPassword((prevPassword) => (prevPassword ? '' : password));
} else if (field === 'pVer') {
setPasswordVerify((prevPasswordVerify) => (prevPasswordVerify ? '' : passwordVerify));
}
};

const handleBlurUsername = (e) => {
const pattern = /^[\w]{1,9}$/;
const currentValue = e.target.value;
const valid = pattern.test(currentValue);
setUsernameErr(!valid && currentValue !== '');
};

const handleBlurEmail = (e) => {
const pattern = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)$/;
const currentValue = e.target.value;
const valid = pattern.test(currentValue);
setEmailErr(!valid && currentValue !== '');
};

const handleInputPass = (e) => {
const pattern = /^(((?=.[a-z])(?=.[A-Z]))|((?=.[a-z])(?=.[0-9]))|((?=.[A-Z])(?=.[0-9])))(?=.{6,})/;
const currentValue = e.target.value;
const valid = pattern.test(currentValue);
setPassErr(!valid && currentValue !== '');
setPassword(currentValue);
};

const handleInputPVer = (e) => {
const currentValue = e.target.value;
setPVErr(currentValue !== '' && password !== currentValue);
setPasswordVerify(currentValue);
};

const handleSubmit = (e) => {
e.preventDefault();
const form = e.target;
const isFormValid = form.checkValidity();

if (isFormValid) {
  const data = {
    username,
    email,
    password,
  };

  apiSignUp(data)
    .then((response) => {
      if (response === '0') {
        setFormMessage('Email Already in Use');
      } else if (response === '1') {
        setFormMessage('Account Creation Successful');
        setTimeout(() => {
          setFormMessage('Waiting For Email Verification');
        }, 1200);
        setTimeout(() => {
         navigate("/signup");
        }, 3000);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      setFormMessage('An error occurred during sign up');
    });
} else {
  setFormMessage('Please fill in all required fields');
}
};

return (
  <div className={style.signupBody}>
    <h1 className={style.signupText}>SIGN UP</h1>
    <div className={style.form} id="form1" onSubmit={handleSubmit} noValidate>
  
    
        <input
          name="username"
          type="text"
          placeholder="Username"
          autoComplete="off"
          className={style.input}
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onBlur={handleBlurUsername}
          required
        />
        {usernameErr && <p className={`${style.inputErr} ${style.usernameErr}`}>Please enter a valid username</p>}
     
   
       
        <input
          name="email"
          type="email"
          autoComplete="off"
          placeholder="Email"
          className={style.input}
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={handleBlurEmail}
          required
        />
        {emailErr && <p className={`${style.inputErr} ${style.emailErr}`}>You have entered an invalid email</p>}
     
      <input
        name="pass"
        type="password"
        placeholder="Password"
        autoComplete="off"
        className={style.input}
        id="pass"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onInput={handleInputPass}
        required
      />
      <span
        id="togglePassword1"
        className={style.togglePassword}
        onClick={() => togglePasswordVisibility('pass')}
      >
        {/* <FontAwesomeIcon icon={faEyeSlash} /> */}
      </span>
      {passErr && <p className={`${style.inputErr} ${style.passErr}`}>Please use a strong password</p>}
      <input
        name="pVer"
        type="password"
        placeholder="Re-Enter Password"
        autoComplete="off"
        className={style.input}
        id="pVer"
        value={passwordVerify}
        onChange={(e) => setPasswordVerify(e.target.value)}
        onInput={handleInputPVer}
        required
      />
      <span
        id="togglePassword2"
        className={style.togglePassword}
        onClick={() => togglePasswordVisibility('pVer')}
      >
        {/* <FontAwesomeIcon icon={faEyeSlash} /> */}
      </span>
      <div className={style.butDiv}>
      {pVErr && <p className={`${style.inputErr} ${style.pVerErr}`}>Passwords do not match</p>}
      <input type="submit" value="SignUp" className={style.btn} id="signUpSub" />
    
    <a onClick={()=>navigate("/login")}>
      <input type="submit" value="Log In" className={style.btn} id="loginSub" />
    </a>
    </div>
    </div>
    
    <div id="message">{formMessage}</div>
  </div>
);
}

export default SignUpPage;
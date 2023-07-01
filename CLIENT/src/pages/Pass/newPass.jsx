import{ useState } from 'react';
import style from './pass.module.css';
import { useNavigate } from 'react-router-dom';

function NewPass() {
  const navigate =useNavigate();

  const [pass, setPass] = useState('');
  const [ver, setVer] = useState('');
  const [passErrVisible, setPassErrVisible] = useState(false);
  const [pVErrVisible, setPVErrVisible] = useState(false);

  const handlePassChange = (e) => {
    const currentValue = e.target.value;
    const pattern = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;
    const valid = pattern.test(currentValue);
    setPass(currentValue);
    setPassErrVisible(!valid && currentValue !== '');
  };

  const handleVerChange = (e) => {
    const currentValue = e.target.value;
    const passMatch = pass === currentValue;
    setVer(currentValue);
    setPVErrVisible(!passMatch && currentValue !== '');
  };

  const handleSubmit = () => {
    let ver = 1;

    if (!(/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/.test(pass))) {
      ver = 0;
      setPassErrVisible(true);
      setPass('');
    }

    if (pass !== ver) {
      ver = 0;
      setPVErrVisible(true);
      setVer('');
    }

    if (ver === 1) {
      const xhr = new XMLHttpRequest();
      const url="http://localhost:3000/newpass";
      xhr.open('POST', url);
      xhr.setRequestHeader('Content-Type', 'application/json');
      const data = { newpass: pass };
      xhr.send(JSON.stringify(data));
      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          navigate("/");
        }
      });
    }
  };

  const togglePasswordVisibility = (inputType) => {
    if (inputType === 1) {
      const passToggle = document.getElementById('pass-toggle');
      const passInput = document.getElementById('pass');
      if (passInput.type === 'password') {
        passInput.type = 'text';
        passToggle.classList.add(style.shut);
      } else {
        passInput.type = 'password';
        passToggle.classList.remove(style.shut);
      }
    } else {
      const verToggle = document.getElementById('ver-toggle');
      const verInput = document.getElementById('ver');
      if (verInput.type === 'password') {
        verInput.type = 'text';
        verToggle.classList.add(style.shut);
      } else {
        verInput.type = 'password';
        verToggle.classList.remove(style.shut);
      }
    }
  };

  return (
    <div className={style.passContainer}>
    <div className='passBody'>
    <label className="label">Enter new password:</label>

      <div className={`${style.inputContainer}`}>
        <input
          type="password"
          className={`${style.pass}`}
          id="pass"
          name="newpass"
          value={pass}
          onChange={handlePassChange}
        />
        <span
          className={`${style.eyeIcon}`}
          id="pass-toggle"
          onClick={() => togglePasswordVisibility(1)}
        >
          <i className="fa fa-eye-slash"></i>
        </span>
      </div>
      <p className={`${style.inputErr}`} id="pass-err" style={{ display: passErrVisible ? 'block' : 'none' }}>
        Please use a strong password
      </p>

      <label className="label">Re-enter password:</label>
      <div className={`${style.inputContainer}`}>
        <input
          type="password"
          className={`${style.ver}`}
          id="ver"
          name="newver"
          value={ver}
          onChange={handleVerChange}
        />
        <span
          className={`${style.eyeIcon}`}
          id="ver-toggle"
          onClick={() => togglePasswordVisibility(2)}
        >
          <i className="fa fa-eye-slash"></i>
        </span>
      </div>
      <p className={`${style.inputErr}`} id="pVer-err" style={{ display: pVErrVisible ? 'block' : 'none' }}>
        Password does not match
      </p>

      <button
        type="submit"
        className={`${style.subBut}`}
        onClick={handleSubmit}
      >
        Change Password
      </button>
    </div>
    </div>
  );
}

export default NewPass;

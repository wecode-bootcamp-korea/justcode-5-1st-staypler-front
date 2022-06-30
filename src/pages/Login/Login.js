import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import css from './Login.module.scss';

function Login() {
  const [inputValue, setInputValue] = useState({
    email: '',
    password: '',
  });
  const handleInput = event => {
    const { name, value } = event.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };
  const navigate = useNavigate();
  const goToHome = () => {
    // fetch('http://192.168.1.4:10010/users/login', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     email: inputValue.email,
    //     password: inputValue.password,
    //   }),
    // })
    //   .then(response => response.json())
    //   .then(result =>
    //     result.token !== undefined
    //       ? navigate('/home')
    //       : alert('아이디혹은 비밀번호가 잘못되었습니다')
    //   );
  };
  const regEmail =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  const regSpecialCharacter =
    /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\']/g;
  const regNumber = /[0-9]/g;
  const regString = /[a-zA-Z]/g;
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const emailValidation = () => {
    if (regEmail.test(inputValue.email)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };
  const passwordValidation = () => {
    if (
      8 < inputValue.password.length &&
      inputValue.password.length < 20 &&
      regNumber.test(inputValue.password) &&
      regString.test(inputValue.password) &&
      regSpecialCharacter.test(inputValue.password)
    ) {
      setPasswordValid(true);
    } else {
      setPasswordValid(false);
    }
  };
  const loginBtnActivation = () => {
    if (emailValid && passwordValid === true) {
      goToHome();
    } else {
      alert('아이디 혹은 비밀번호가 잘못되었습니다');
    }
  };
  return (
    <div className={css.container}>
      <header>
        <div className={css.title}>LOGIN</div>
        <div className={css.subtitle}>로그인</div>
      </header>
      <div className={css.wrapper}>
        <div className={css.mainbox}>
          <div className={css.formwrap}>
            <div className={css.inputbox}>
              <div className={css.title}>이메일</div>
              <input
                name="email"
                type="text"
                placeholder="이메일 아이디"
                onChange={handleInput}
                onKeyUp={emailValidation}
              />
            </div>
            <div className={css.inputbox}>
              <div className={css.title}>비밀번호</div>
              <input
                type="password"
                name="name"
                placeholder="비밀번호"
                onChange={handleInput}
                onKeyUp={passwordValidation}
              />
            </div>
          </div>
          <button
            type="button"
            className={css.loginBtn}
            onClick={loginBtnActivation}
          >
            로그인
          </button>
          <button
            type="button"
            className={css.signupBtn}
            onClick={navigate('/users/signup')}
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
}
export default Login;

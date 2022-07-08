import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import css from './Login.module.scss';
import { BASEURL } from '../../ApiOrigin';
import PageHeader from '../../components/PageHeader/PageHeader';

function Login() {
  const navigate = useNavigate();
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
  const loginBtnHandle = event => {
    event.preventDefault();
    fetch(`${BASEURL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: inputValue.email,
        password: inputValue.password,
      }),
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(result => {
        if (result.token) {
          localStorage.setItem('login-token', result.token);
          navigate('/');
        } else {
          alert('아이디혹은 비밀번호가 잘못되었습니다');
        }
      });
  };

  const signUpBtnHandle = event => {
    event.preventDefault();
    navigate('/signup');
  };

  return (
    <div className={css.container}>
      <PageHeader pageTitleEN="LOGIN" pageTitleKO="로그인" url="/login" />
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
              />
            </div>
            <div className={css.inputbox}>
              <div className={css.title}>비밀번호</div>
              <input
                type="password"
                name="password"
                placeholder="비밀번호"
                onChange={handleInput}
              />
            </div>
          </div>
          <button
            type="button"
            className={css.loginBtn}
            onClick={loginBtnHandle}
          >
            로그인
          </button>
          <button
            type="button"
            className={css.signupBtn}
            onClick={signUpBtnHandle}
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
}
export default Login;

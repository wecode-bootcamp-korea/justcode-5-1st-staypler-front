import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import css from './Signup.module.scss';

function Signup() {
  const navigate = useNavigate();
  const [emailValid, setEmailValid] = useState(false);
  const [nameValid, setNameValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [rePasswordValid, setRePasswordValid] = useState(false);
  const [phoneNumValid, setPhoneNumValid] = useState(false);
  // const [signUpValid, setSignUpValid] = useState(false);
  const regSpecialCharacter =
    /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\']/g;
  const regNumber = /[0-9]/g;
  const regString = /[a-zA-Z]/g;
  const regEmail =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  const regPhoneNum = /^\d{3}-\d{3,4}-\d{4}$/;

  const [inputValue, setInputValue] = useState({
    email: '',
    name: '',
    password: '',
    rePassword: '',
    phoneNum: '',
  });

  // const signUpValidation = () => {
  //   if (
  //     emailValid === true &&
  //     nameValid === true &&
  //     passwordValid === true &&
  //     rePasswordValid === true &&
  //     phoneNumValid === true
  //     // check.serviceBtn === true &&
  //     // check.useBtn === true &&
  //     // check.ageBtn === true
  //   ) {
  //     setSignUpValid(true);
  //   } else {
  //     setSignUpValid(false);
  //   }
  // };
  const signupBtnActivation = () => {
    fetch('http://192.168.1.4:10010/users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: inputValue.email,
        username: inputValue.name,
        password: inputValue.password,
        phoneNumber: inputValue.phoneNum,
      }),
    })
      .then(res => res.json())
      .then(res => console.log(res));
    navigate('/users/login');
  };

  const handleInput = event => {
    const { name, value } = event.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };
  const [desc, setDesc] = useState({
    email: '',
    name: '',
    password: '',
    rePassword: '',
    phoneNum: '',
  });

  const [check, setCheck] = useState({
    allBtn: false,
    serviceBtn: false,
    useBtn: false,
    ageBtn: false,
    membershipBtn: false,
    marketingBtn: false,
  });
  const allBtnEvent = () => {
    if (check.allBtn === false) {
      setCheck({
        allBtn: true,
        serviceBtn: true,
        useBtn: true,
        ageBtn: true,
        membershipBtn: true,
        marketingBtn: true,
      });
    } else {
      setCheck({
        allBtn: false,
        serviceBtn: false,
        useBtn: false,
        ageBtn: false,
        membershipBtn: false,
        marketingBtn: false,
      });
    }
  };
  const btnEvent = e => {
    const { name } = e.target;
    setCheck({ ...check, [name]: !check[name] });
  };

  const areeAllBtnActivate = () => {
    if (
      check.allBtn === true &&
      check.useBtn === true &&
      check.membershipBtn === true &&
      check.marketingBtn === true &&
      check.serviceBtn === true
    ) {
      setCheck({ ...check, allBtn: true });
    } else {
      setCheck({ ...check, allBtn: false });
    }
  };

  const emailValidation = () => {
    if (regEmail.test(inputValue.email)) {
      setEmailValid(true);
      setDesc({ ...desc, email: '' });
    } else {
      setEmailValid(false);
      setDesc({ ...desc, email: '잘못된양식입니다.' });
    }
  };
  const nameValidation = () => {
    if (1 < inputValue.name.length && inputValue.name.length < 10) {
      setNameValid(true);
      setDesc({ ...desc, name: '' });
    } else {
      setNameValid(false);
      setDesc({ ...desc, name: '1자이상 10자이하로 입력해주세요.' });
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
      setDesc({ ...desc, password: '' });
    } else {
      setPasswordValid(false);
      setDesc({
        ...desc,
        password: '8자이상 20자이하, 숫자, 문자, 특수문자를 포함해주세요.',
      });
    }
  };
  const rePasswordValidation = () => {
    if (inputValue.rePassword === inputValue.password) {
      setRePasswordValid(true);
      setDesc({ ...desc, rePassword: '' });
    } else {
      setRePasswordValid(false);
      setDesc({ ...desc, rePassword: '입력하신 비밀번호가 같지않습니다.' });
    }
  };
  const phoneNumValidation = () => {
    if (regPhoneNum.test(inputValue.phoneNum)) {
      setPhoneNumValid(true);
      setDesc({ ...desc, phoneNum: '' });
    } else {
      setPhoneNumValid(false);
      setDesc({
        ...desc,
        phoneNum: '잘못된양식입니다! -포함해서 입력해주세요',
      });
    }
  };
  return (
    <div className={css.container}>
      <header>
        <div className={css.title}>JOIN</div>
        <div className={css.subtitle}>회원가입</div>
      </header>
      <div className={css.wrapper}>
        <div className={css.mainbox}>
          <div className={css.formwrap}>
            <div className={css.inputbox}>
              <div className={css.title}>이메일</div>
              <input
                name="email"
                type="text"
                placeholder="이메일을 입력해 주세요"
                onChange={handleInput}
                onKeyUp={emailValidation}
              />
              <div className={css.description}>{desc.email}</div>
            </div>
            <div className={css.inputbox}>
              <div className={css.title}>이름</div>
              <input
                type="text"
                name="name"
                placeholder="이름을 입력하세요"
                onChange={handleInput}
                onKeyUp={nameValidation}
              />
              <div className={css.description}>{desc.name}</div>
            </div>
            <div className={css.inputbox}>
              <div className={css.title}>비밀번호</div>
              <input
                type="password"
                name="password"
                placeholder="비밀번호를 입력하세요"
                onChange={handleInput}
                onKeyUp={passwordValidation}
              />
              <div className={css.description}>{desc.password}</div>
              <input
                type="password"
                name="rePassword"
                placeholder="비밀번호를 확인해주세요"
                onChange={handleInput}
                onKeyUp={rePasswordValidation}
              />
              <div className={css.description}>{desc.rePassword}</div>
            </div>
            <div className={css.inputbox}>
              <div className={css.title}>휴대전화</div>
              <input
                type="text"
                name="phoneNum"
                placeholder="휴대폰전화번호를 입력해주세요."
                onChange={handleInput}
                onKeyUp={phoneNumValidation}
              />
              <div className={css.description}>{desc.phoneNum}</div>
            </div>
            <div className={css.lowerbodywrapper}>
              <div className={css.agreeall}>
                <input
                  type="checkbox"
                  name="allBtn"
                  checked={check.allBtn}
                  className={css.checkbox}
                  onChange={allBtnEvent}
                  onClick={areeAllBtnActivate}
                />
                사용자 약관 전체동의
              </div>
              <div className={css.agreebox}>
                <div className={css.agree}>
                  <input
                    type="checkbox"
                    name="serviceBtn"
                    className={css.checkbox}
                    checked={check.serviceBtn}
                    onChange={btnEvent}
                  />
                  <span>서비스 이용약관 동의(필수)</span>
                </div>
              </div>
              <div className={css.agreebox}>
                <div className={css.agree}>
                  <input
                    type="checkbox"
                    name="useBtn"
                    checked={check.useBtn}
                    className={css.checkbox}
                    onChange={btnEvent}
                  />
                  <span>개인정보 처리방침 동의(필수)</span>
                </div>
              </div>
              <div className={css.agreebox}>
                <div className={css.agree}>
                  <input
                    type="checkbox"
                    name="ageBtn"
                    checked={check.ageBtn}
                    className={css.checkbox}
                    onChange={btnEvent}
                  />
                  <span>만 14세 이상 확인(필수)</span>
                </div>
              </div>
              <div className={css.agreebox}>
                <div className={css.agree}>
                  <input
                    type="checkbox"
                    name="membershipBtn"
                    checked={check.membershipBtn}
                    className={css.checkbox}
                    onChange={btnEvent}
                  />
                  <span>평생회원제 동의(선택)</span>
                </div>
              </div>
              <div className={css.agreebox}>
                <div className={css.agree}>
                  <input
                    type="checkbox"
                    name="marketingBtn"
                    className={css.checkbox}
                    checked={check.marketingBtn}
                    onChange={btnEvent}
                  />
                  <span>마케팅 정보 수신 동의(선택)</span>
                </div>
              </div>
            </div>
            <button
              type="button"
              className={css.signupBtn}
              onClick={signupBtnActivation}
            >
              회원가입
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;

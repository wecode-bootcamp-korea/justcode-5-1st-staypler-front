import React, { useState, useEffect } from 'react';

import css from './Signup.module.scss';

function Signup() {
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
  const { email, name, password, rePassword, phoneNum } = inputValue;

  const handleInput = event => {
    const { name, value } = event.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const [emailValid, setEmailValid] = useState(false);
  const [nameValid, setNameValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [rePasswordValid, setRePasswordValid] = useState(false);
  const [phoneNumValid, setPhoneNumValid] = useState(false);

  const [nameDesc, setNameDesc] = useState('');
  const [emailDesc, setEmailDesc] = useState('');
  const [passwordDesc, setPasswordDesc] = useState('');
  const [rePasswordDesc, setRePasswordDesc] = useState('');
  const [phoneNumDesc, setPhoneNumDesc] = useState('');

  const [allCheck, setAllCheck] = useState(false);
  const [serviceCheck, setServiceCheck] = useState(false);
  const [useCheck, setUseCheck] = useState(false);
  const [ageCheck, setAgeCheck] = useState(false);
  const [membershipCheck, setMembershipCheck] = useState(false);
  const [marketingCheck, setMarketingCheck] = useState(false);

  const allBtnEvent = () => {
    if (allCheck === false) {
      setAllCheck(true);
      setServiceCheck(true);
      setAgeCheck(true);
      setUseCheck(true);
      setMarketingCheck(true);
      setMembershipCheck(true);
    } else {
      setAllCheck(false);
      setServiceCheck(false);
      setAgeCheck(false);
      setUseCheck(false);
      setMarketingCheck(false);
      setMembershipCheck(false);
    }
  };

  const serviceBtnEvent = () => {
    setServiceCheck(!serviceCheck);
  };
  const useBtnEvent = () => {
    setUseCheck(!useCheck);
  };
  const ageBtnEvent = () => {
    setAgeCheck(!ageCheck);
  };
  const membershipBtnEvent = () => {
    setMembershipCheck(!membershipCheck);
  };
  const marketingBtnEvent = () => {
    setMarketingCheck(!marketingCheck);
  };
  useEffect(() => {
    if (
      ageCheck === true &&
      useCheck === true &&
      membershipCheck === true &&
      marketingCheck === true &&
      serviceCheck === true
    ) {
      setAllCheck(true);
    } else {
      setAllCheck(false);
    }
  }, [ageCheck, useCheck, serviceCheck, membershipCheck, marketingCheck]);

  const emailValidation = () => {
    if (regEmail.test(email)) {
      setEmailValid(true);
      setEmailDesc('');
    } else {
      setEmailValid(false);
      setEmailDesc('잘못된 양식입니다.');
    }
  };
  const nameValidation = () => {
    if (1 < name.length && name.length < 10) {
      setNameValid(true);
      setNameDesc('');
    } else {
      setNameValid(false);
      setNameDesc('1자이상 10자이하로 입력해주세요.');
    }
  };

  const passwordValidation = () => {
    if (
      8 < password.length &&
      password.length < 20 &&
      regNumber.test(password) &&
      regString.test(password) &&
      regSpecialCharacter.test(password)
    ) {
      setPasswordValid(true);
      setPasswordDesc('');
    } else {
      setPasswordValid(false);
      setPasswordDesc('8자이상 20자이하, 숫자, 문자, 특수문자를 포함해주세요.');
    }
  };
  const rePasswordValidation = () => {
    if (rePassword === password) {
      setRePasswordValid(true);
      setRePasswordDesc('');
    } else {
      setRePasswordValid(false);
      setRePasswordDesc('입력하신 비밀번호가 같지않습니다.');
    }
  };
  const phoneNumValidation = () => {
    if (regPhoneNum.test(phoneNum)) {
      setPhoneNumValid(true);
      setPhoneNumDesc('');
    } else {
      setPhoneNumValid(false);
      setPhoneNumDesc('잘못된양식입니다! -포함해서 입력해주세요');
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
              <div className={css.description}>{emailDesc}</div>
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
              <div className={css.description}>{nameDesc}</div>
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
              <div className={css.description}>{passwordDesc}</div>
              <input
                type="password"
                name="rePassword"
                placeholder="비밀번호를 확인해주세요"
                onChange={handleInput}
                onKeyUp={rePasswordValidation}
              />
              <div className={css.description}>{rePasswordDesc}</div>
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
              <div className={css.description}>{phoneNumDesc}</div>
            </div>
            <div className={css.lowerbodywrapper}>
              <div className={css.agreeall}>
                <input
                  type="checkbox"
                  checked={allCheck}
                  className={css.checkbox}
                  onChange={allBtnEvent}
                />
                사용자 약관 전체동의
              </div>
              <div className={css.agreebox}>
                <div className={css.agree}>
                  <input
                    type="checkbox"
                    className={css.checkbox}
                    checked={serviceCheck}
                    onChange={serviceBtnEvent}
                  />
                  <span>서비스 이용약관 동의(필수)</span>
                </div>
                <input type="button" className={css.downBtn} />
              </div>
              <div className={css.agreebox}>
                <div className={css.agree}>
                  <input
                    type="checkbox"
                    checked={useCheck}
                    className={css.checkbox}
                    onChange={useBtnEvent}
                  />
                  <span>개인정보 처리방침 동의(필수)</span>
                </div>
                <input type="button" className={css.downBtn} />
              </div>
              <div className={css.agreebox}>
                <div className={css.agree}>
                  <input
                    type="checkbox"
                    checked={ageCheck}
                    className={css.checkbox}
                    onChange={ageBtnEvent}
                  />
                  <span>만 14세 이상 확인(필수)</span>
                </div>
                <input type="button" className={css.downBtn} />
              </div>
              <div className={css.agreebox}>
                <div className={css.agree}>
                  <input
                    type="checkbox"
                    checked={membershipCheck}
                    className={css.checkbox}
                    onChange={membershipBtnEvent}
                  />
                  <span>평생회원제 동의(선택)</span>
                </div>
                <input type="button" className={css.downBtn} />
              </div>
              <div className={css.agreebox}>
                <div className={css.agree}>
                  <input
                    type="checkbox"
                    className={css.checkbox}
                    checked={marketingCheck}
                    onChange={marketingBtnEvent}
                  />
                  <span>마케팅 정보 수신 동의(선택)</span>
                </div>
                <input type="button" className={css.downBtn} />
              </div>
            </div>
            <button type="button" className={css.signupBtn}>
              회원가입
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;

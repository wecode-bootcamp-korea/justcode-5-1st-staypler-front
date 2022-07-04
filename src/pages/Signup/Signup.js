import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import css from './Signup.module.scss';
import { BASEURL } from '../../ApiOrigin';
import Modal from '../../components/Modal/Modal';

function Signup() {
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);
  const [modalText, setModalText] = useState('');

  const [emailValid, setEmailValid] = useState(true);
  const [nameValid, setNameValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [rePasswordValid, setRePasswordValid] = useState(true);
  const [phoneNumValid, setPhoneNumValid] = useState(true);

  const regularExpression = {
    specialChar: /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\']/g,
    number: /[0-9]/g,
    string: /[a-zA-Z]/g,
    email:
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
    phoneNum: /^\d{3}-\d{3,4}-\d{4}$/,
  };

  const desc = {
    email: '잘못된양식입니다.',
    name: '1자이상 10자이하로 입력해주세요.',
    password: '8자이상 20자이하, 숫자, 문자, 특수문자를 포함해주세요.',
    rePassword: '입력하신 비밀번호가 같지않습니다.',
    phoneNum: '잘못된양식입니다! -포함해서 입력해주세요.',
  };

  const [inputValue, setInputValue] = useState({
    email: '',
    name: '',
    password: '',
    rePassword: '',
    phoneNum: '',
  });

  const handleInput = event => {
    const { name, value } = event.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const [check, setCheck] = useState({
    allBtn: false,
    serviceBtn: false,
    useBtn: false,
    ageBtn: false,
    membershipBtn: false,
    marketingBtn: false,
  });

  const btnEvent = e => {
    const { name } = e.target;
    setCheck({ ...check, [name]: !check[name] });
  };

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

  const signupBtnActivation = () => {
    if (
      // 입력창이 공백이 아닐 때
      inputValue.email &&
      inputValue.name &&
      inputValue.password &&
      inputValue.rePassword &&
      inputValue.phoneNum &&
      // 유효성 검사에 적합할 때
      emailValid &&
      nameValid &&
      passwordValid &&
      rePasswordValid &&
      phoneNumValid &&
      check.serviceBtn &&
      check.useBtn &&
      check.ageBtn
    ) {
      fetch(`${BASEURL}/users/signup`, {
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
      }).then(res => {
        if (res.status === 200) {
          setOpenModal(true);
          setModalText('회원가입이 완료되었습니다.');
          navigate('/login');
        } else {
          setOpenModal(true);
          setModalText('정보가 올바른 형식으로 입력되지 않았습니다.');
        }
      });
    } else {
      setOpenModal(true);
      setModalText('정보가 올바른 형식으로 입력되지 않았습니다.');
    }
  };

  const emailValidation = () => {
    if (regularExpression.email.test(inputValue.email)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };
  const nameValidation = () => {
    if (1 < inputValue.name.length && inputValue.name.length < 10) {
      setNameValid(true);
    } else {
      setNameValid(false);
    }
  };

  const passwordValidation = () => {
    if (
      8 < inputValue.password.length &&
      inputValue.password.length < 20 &&
      regularExpression.number.test(inputValue.password) &&
      regularExpression.string.test(inputValue.password) &&
      regularExpression.specialChar.test(inputValue.password)
    ) {
      setPasswordValid(true);
    } else {
      setPasswordValid(false);
    }
  };

  const rePasswordValidation = () => {
    if (inputValue.rePassword === inputValue.password) {
      setRePasswordValid(true);
    } else {
      setRePasswordValid(false);
    }
  };

  const phoneNumValidation = () => {
    if (regularExpression.phoneNum.test(inputValue.phoneNum)) {
      setPhoneNumValid(true);
    } else {
      setPhoneNumValid(false);
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
              <div className={css.description}>{!emailValid && desc.email}</div>
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
              <div className={css.description}>{!nameValid && desc.name}</div>
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
              <div className={css.description}>
                {!passwordValid && desc.password}
              </div>
              <input
                type="password"
                name="rePassword"
                placeholder="비밀번호를 확인해주세요"
                onChange={handleInput}
                onKeyUp={rePasswordValidation}
              />
              <div className={css.description}>
                {!rePasswordValid && desc.rePassword}
              </div>
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
              <div className={css.description}>
                {!phoneNumValid && desc.phoneNum}
              </div>
            </div>
            <div className={css.lowerbodywrapper}>
              <div className={css.agreeall}>
                <input
                  type="checkbox"
                  name="allBtn"
                  checked={check.allBtn}
                  className={css.checkbox}
                  onChange={allBtnEvent}
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
            {openModal && (
              <Modal setOpenModal={setOpenModal} text={modalText} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;

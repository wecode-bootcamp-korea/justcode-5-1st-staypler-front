import React, { useEffect, useState } from 'react';
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from 'react-icons/md';
import { FiCamera } from 'react-icons/fi';
import css from './MypageEditInformation.module.scss';
import ImgUploadModal from './../ImgUploadModal/ImgUploadModal';
import Modal from './../Modal/Modal';
import { BASEURL } from '../../../../ApiOrigin';

function MypageEditInformation() {
  const [data, setData] = useState([]);
  const [savePassword, setSavePassword] = useState(false);
  const [saveEdit, setSaveEdit] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalText, setModalText] = useState('');

  const [imgUploadModal, setImgUploadModal] = useState(false);
  const [scriptOpne, setScriptOpen] = useState(false);

  const [inputValue, setInputValue] = useState({
    email: '',
    name: '',
    exPassword: '',
    password: '',
    rePassword: '',
    phoneNum: '',
    image: '',
  });

  useEffect(() => {
    fetch(`${BASEURL}/mypage`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('login-token')}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(fetchdata => {
        setData(fetchdata.data[0]);
        setInputValue(prev => ({
          ...prev,
          email: fetchdata.data[0].email,
          name: fetchdata.data[0].name,
          phoneNum: fetchdata.data[0].phone,
          image: fetchdata.data[0].profile_image_url,
        }));
      });
  }, []);

  // password 저장 버튼 클릭에 따른 fetch
  async function savePasswordBtn() {
    await fetch(`${BASEURL}/mypage/password`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('login-token')}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        current_password: inputValue.exPassword,
        new_password: inputValue.password,
        confirm_new_password: inputValue.rePassword,
      }),
    }).then(res => {
      if (res.status === 200) {
        setOpenModal(true);
        setModalText('비밀번호가 수정되었습니다.');
      } else {
        setOpenModal(true);
        setModalText('정보가 올바른 형식으로 입력되지 않았습니다.');
      }
    });
  }

  // 전체 저장 버튼 클릭에 따른 fetch
  async function saveAllBtn() {
    await fetch(`${BASEURL}/mypage`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('login-token')}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name: inputValue.name,
        phone_number: inputValue.phoneNum,
        profile_image: inputValue.image,
      }),
    }).then(res => {
      if (res.status === 200) {
        setOpenModal(true);
        setModalText('회원정보가 수정되었습니다.');
      } else {
        setOpenModal(true);
        setModalText('정보가 올바른 형식으로 입력되지 않았습니다.');
      }
    });
  }

  const regularExpressions = {
    regSpecialCharacter: /[!?@#$%^&*():;+-=~{}<>\_\[\]\|\\\"\'\,\.\/\`\₩]/g,
    regNumber: /[0-9]/g,
    regString: /[a-zA-Z]/g,
    regPhoneNum: /^\d{3}-\d{3,4}-\d{4}$/,
  };

  const [nameValid, setNameValid] = useState(true);
  const [phoneNumValid, setPhoneNumValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(false);
  const [rePasswordValid, setRePasswordValid] = useState(false);

  const handleInput = event => {
    const { name, value } = event.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const [desc, setDesc] = useState({
    name: '',
    password: '',
    rePassword: '',
    phoneNum: '',
  });

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
      regularExpressions.regNumber.test(inputValue.password) &&
      regularExpressions.regString.test(inputValue.password) &&
      regularExpressions.regSpecialCharacter.test(inputValue.password)
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
      setDesc({
        ...desc,
        rePassword: '입력하신 비밀번호가 같지않습니다.',
      });
    }
  };
  const phoneNumValidation = () => {
    if (regularExpressions.regPhoneNum.test(inputValue.phoneNum)) {
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
      <div className={css.maintTitle}>회원 정보 수정</div>
      <div className={css.wrapper}>
        <div className={css.mainbox}>
          <div className={css.inputbox}>
            <div className={css.title}>이메일</div>
            <input
              name="email"
              type="text"
              value={inputValue.email}
              onChange={handleInput}
              readOnly
            />
          </div>
          <div className={css.inputbox}>
            <div className={css.title}>이름</div>
            <input
              type="text"
              name="name"
              value={inputValue.name}
              onChange={handleInput}
              onKeyUp={nameValidation}
            />
            <div className={css.description}>{desc.name}</div>
          </div>
          <div className={css.inputbox}>
            <div className={css.title}>휴대전화</div>
            <input
              type="text"
              name="phoneNum"
              value={inputValue.phoneNum}
              onChange={handleInput}
              onKeyUp={phoneNumValidation}
            />
            <div className={css.description}>{desc.phoneNum}</div>
          </div>
          <div className={css.inputbox}>
            <div className={css.title}>비밀번호</div>
            <input
              type="password"
              name="exPassword"
              placeholder="현재 비밀번호"
              onChange={handleInput}
            />
            <input
              type="password"
              name="password"
              placeholder="변경할 비밀번호"
              onChange={handleInput}
              onKeyUp={passwordValidation}
            />
            <div className={css.description}>{desc.password}</div>
            <input
              type="password"
              name="rePassword"
              placeholder="변경할 비밀번호 확인"
              onChange={handleInput}
              onKeyUp={rePasswordValidation}
            />
            <div className={css.description}>{desc.rePassword}</div>
            <button
              type="button"
              className={css.passwordBtn}
              onClick={savePasswordBtn}
            >
              비밀번호 변경
            </button>
            {openModal && (
              <Modal setOpenModal={setOpenModal} text={modalText} />
            )}
          </div>
        </div>
        <div className={css.userImageGroup}>
          <div>프로필 사진</div>
          <div className={css.userImage}></div>
          <div
            className={css.uploadImage}
            onClick={() => {
              setImgUploadModal(true);
            }}
          >
            <FiCamera />
          </div>
          {imgUploadModal ? (
            <ImgUploadModal
              setImgUploadModal={setImgUploadModal}
              inputValue={inputValue}
              setInputValue={setInputValue}
            />
          ) : null}
        </div>
      </div>
      <div className={css.agreebox}>
        <div className={css.agree}>
          <input type="checkbox" name="marketingBtn" className={css.checkbox} />
          <span>마케팅 정보 수신 동의(선택)</span>
        </div>
        <div
          className={css.scriptBtn}
          onClick={() => {
            setScriptOpen(prev => !prev);
          }}
        >
          {scriptOpne ? (
            <MdOutlineKeyboardArrowUp size={30} />
          ) : (
            <MdOutlineKeyboardArrowDown size={30} />
          )}
        </div>
      </div>
      {scriptOpne ? <AcceptanceMarketingUse /> : null}
      <div className={css.btns}>
        <button
          type="button"
          className={css.saveBtn}
          disabled={!nameValid && !phoneNumValid}
          onClick={saveAllBtn}
        >
          저장하기
        </button>
        <button type="button" className={css.logoutBtn}>
          로그아웃
        </button>
      </div>
    </div>
  );
}

function AcceptanceMarketingUse() {
  return (
    <div className={css.script}>
      스테이폴리오에서 제공하는 이벤트 및 혜택 등 다양한 정보를 문자메시지,
      이메일 등으로 볼 수 있습니다.
      <br />
      마케팅 정보 수신 및 활용 동의 여부와 관계없이 회원가입 및 서비스를
      이용하실 수 있습니다.
      <br />
      또한 서비스의 중요 안내사항 및 예약에 대한 정보는 마케팅 정보 수신 동의
      여부와 관계없이 발송됩니다.
      <br />
      <br />
      1. 수집·이용목적
      <br />
      - 마케팅 및 분석
      <br />
      - 프로모션
      <br />
      <br />
      2. 수집·이용항목
      <br />
      - 회원 정보(스테이폴리오 아이디, 이름, 휴대폰 번호, 이메일, 가입일시)
      <br />
      - 예약 서비스 정보(이용 숙소, 인원 정보, 이용 횟수)
      <br />
      - 수집∙이용항목은 마케팅 및 분석, 프로모션의 목적에 따라 달라질 수 있음
      <br />
      <br />
      3. 보유 및 이용기간
      <br />
      - 정보 삭제 또는 이용 정지 요청 및 회원탈퇴 시 즉시 삭제
      <br />
      <br />
      4. 마케팅 활용 정보 수집 방법 - 희망자에 한해 직접 입력
    </div>
  );
}
export default MypageEditInformation;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineSearch, AiOutlineClose } from 'react-icons/ai';
import css from './WhereModal.module.scss';
import BlackButton from './../BlackButton/BlackButton';
import { BASEURL } from '../../ApiOrigin';

function WhereModal({ modalRef, closeModal }) {
  const [selectCountry, setSelectCounry] = useState(null);
  const [countries, setCountries] = useState([
    {
      id: 1,
      isKorea: false,
      city: '',
    },
  ]);
  const [Korea, setKorea] = useState([
    {
      id: 1,
      name: '국내전체',
    },
    {
      id: 2,
      name: '경기',
    },
    {
      id: 3,
      name: '서울',
    },
    {
      id: 4,
      name: '제주',
    },
    {
      id: 5,
      name: '부산',
    },
  ]);
  useEffect(() => {
    setCountries(mokCountry);
    fetch(`${BASEURL}/findstay`, { method: 'GET' })
      .then(res => res.json())
      .then(res => setCountries(res));
  });

  const clicked = e => {
    setSelectCounry(e.currentTarget.innerText);
  };

  const reset = () => setSelectCounry(null);

  return (
    <div className={css.modalWrapper} ref={modalRef}>
      <div>
        <div className={css.modal}>
          <div className={css.titleWrapper}>
            <div className={css.modalTitle}>
              <p className={css.whereText}>어디로 떠날까요?</p>
              <AiOutlineClose
                className={css.closeModal}
                size="50"
                id="modalClose1"
                onClick={() => {
                  closeModal();
                  reset();
                }}
              />
            </div>
          </div>
          <div className={css.inputWrapper}>
            <AiOutlineSearch size="24" clssName={css.searchIcon} />
            <div clssName={css.inputShape}>
              <input
                className={css.inputText}
                placeholder="원하는 스테이지/지역을 검색해 보세요."
              />
            </div>
          </div>
          <div className={css.location}>
            <div className={css.locationWrapper}>
              <p className={css.korAndAbr}>국내</p>
              <ul className={css.cities}>
                {Korea.map(city => {
                  if (city.name === selectCountry) {
                    return (
                      <li
                        className={css.city}
                        key={city.id}
                        onClick={clicked}
                        style={{
                          background: 'black',
                          color: 'whitesmoke',
                          borderRadius: '30px',
                          boxShadow: '6px 7px 15px 0 rgb(0 0 0 / 30%)',
                        }}
                      >
                        {city.name}
                      </li>
                    );
                  } else {
                    return (
                      <li className={css.city} key={city.id} onClick={clicked}>
                        {city.name}
                      </li>
                    );
                  }
                })}
              </ul>
            </div>
          </div>
          <Link to="/findstay" className={css.btnWrapper}>
            <BlackButton
              className={css.searchBtn}
              content="search &nbsp; &nbsp; →"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default WhereModal;

const mokCountry = [
  {
    id: 5,
    isKorea: false,
    city: '베트남',
  },
  {
    id: 6,
    isKorea: false,
    city: '태국',
  },
  {
    id: 7,
    isKorea: false,
    city: '대만',
  },
  {
    id: 8,
    isKorea: false,
    city: '싱가폴',
  },
  {
    id: 9,
    isDoemstic: false,
    city: '인도네시아',
  },
];

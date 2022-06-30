import React, { useEffect, useState } from 'react';
import css from './WhereModal.module.scss';
import { AiOutlineSearch, AiOutlineClose } from 'react-icons/ai';
import BlackButton from '../BlackButton/BlackButton';
import { Link } from 'react-router-dom';

function WhereModal({ modalRef, closeModal }) {
  const [selectCountry, setSelectCounry] = useState(null);
  const [countries, setCountries] = useState([
    {
      id: 1,
      isKorea: true,
      city: '',
    },
  ]);
  useEffect(() => {
    fetch('/data/countries.json', { method: 'GET' })
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
                {countries.map(country => {
                  if (country.isKorea) {
                    if (country.city === selectCountry) {
                      return (
                        <li
                          className={css.city}
                          key={country.id}
                          onClick={clicked}
                          style={{
                            background: 'black',
                            color: 'whitesmoke',
                            borderRadius: '30px',
                            boxShadow: '6px 7px 15px 0 rgb(0 0 0 / 30%)',
                          }}
                        >
                          {country.city}
                        </li>
                      );
                    } else {
                      return (
                        <li
                          className={css.city}
                          key={country.id}
                          onClick={clicked}
                        >
                          {country.city}
                        </li>
                      );
                    }
                  }
                })}
              </ul>
            </div>
            <div className={css.locationWrapper}>
              <p className={css.korAndAbr}>해외</p>
              <ul className={css.cities}>
                {countries.map(country => {
                  if (!country.isKorea) {
                    if (country.city === selectCountry) {
                      return (
                        <li
                          className={css.city}
                          key={country.id}
                          onClick={clicked}
                          style={{
                            background: 'black',
                            color: 'whitesmoke',
                            borderRadius: '30px',
                            boxShadow: '6px 7px 15px 0 rgb(0 0 0 / 30%)',
                          }}
                        >
                          {country.city}
                        </li>
                      );
                    } else {
                      return (
                        <li
                          className={css.city}
                          key={country.id}
                          onClick={clicked}
                        >
                          {country.city}
                        </li>
                      );
                    }
                  }
                })}
              </ul>
            </div>
          </div>
          <Link to="/Detail" className={css.btnWrapper}>
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

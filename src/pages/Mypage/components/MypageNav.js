import React from 'react';
import css from './MypageNav.module.scss';
import { useNavigate } from 'react-router-dom';

function MypageNav() {
  const navigate = useNavigate();

  return (
    <div className={css.container}>
      <button
        className={css.category}
        onClick={() => {
          navigate('/mypage');
        }}
      >
        My Stay
      </button>
      <button
        className={css.menu}
        onClick={() => {
          navigate('./reservation');
        }}
      >
        예약 정보
      </button>
      <button
        className={css.menu}
        onClick={() => {
          navigate('./likestay');
        }}
      >
        관심 스테이
      </button>
      <button className={css.category}>내 계정</button>
      <button
        className={css.menu}
        onClick={() => {
          navigate('./edit');
        }}
      >
        회원 정보 수정
      </button>
    </div>
  );
}

export default MypageNav;

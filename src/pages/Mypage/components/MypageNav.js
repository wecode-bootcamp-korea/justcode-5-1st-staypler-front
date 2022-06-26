import React from 'react';
import css from './MypageNav.module.scss';

function MypageNav() {
  return (
    <div className={css.container}>
      <button className={css.category}>My Stay</button>
      <button className={css.menu}>예약 정보</button>
      <button className={css.menu}>관심 스테이</button>
      <button className={css.category}>내 계정</button>
      <button className={css.menu}>회원 정보 수정</button>
    </div>
  );
}

export default MypageNav;

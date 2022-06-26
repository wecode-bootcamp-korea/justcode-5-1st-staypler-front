import React from 'react';
import css from './MypageHeader.module.scss';

function MypageHeader() {
  return (
    <div className={css.headerContainer}>
      <p className={css.helloToUser}>김지현님 반가워요!</p>
      <div>
        <span className={css.email}>jihyeon.rem@gmail.com</span>
        <button className={css.editBtn}>회원 정보 수정</button>
      </div>
    </div>
  );
}

export default MypageHeader;

import React from 'react';
import css from './MypageContents.module.scss';
import MypageHeader from './components/MypageHeader';
import MypageNav from './components/MypageNav';

function MypageContents() {
  return (
    <div className={css.container}>
      <MypageHeader />
      <div className={css.Mypage}>
        <MypageNav />
      </div>
    </div>
  );
}

export default MypageContents;

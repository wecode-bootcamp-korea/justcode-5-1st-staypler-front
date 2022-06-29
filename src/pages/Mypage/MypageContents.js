import React from 'react';
import css from './MypageContents.module.scss';
import MypageHeader from './components/MypageHeader';
import MypageNav from './components/MypageNav';
import { Outlet } from 'react-router-dom';

function MypageContents() {
  return (
    <div className={css.container}>
      <MypageHeader />
      <div className={css.mypage}>
        <MypageNav />
        <div className={css.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default MypageContents;

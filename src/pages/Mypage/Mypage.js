import React from 'react';
import { Outlet } from 'react-router-dom';
import css from './Mypage.module.scss';
import PageHeader from './../../components/PageHeader/PageHeader';
import MypageHeader from './components/MypageHeader/MypageHeader';
import MypageNav from './components/MypageNav/MypageNav';

function Mypage() {
  return (
    <div className={css.container}>
      <PageHeader
        pageTitleEN="MY PAGE"
        pageTitleKO="마이페이지"
        url="/mypage"
      />
      <div className={css.body}>
        <MypageHeader />
        <div className={css.mypage}>
          <MypageNav />
          <div className={css.content}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mypage;

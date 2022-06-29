import React from 'react';
import css from './Mypage.module.scss';
import MypageContents from './MypageContents';
import PageMainHeader from './PageMainHeader';

function Mypage() {
  return (
    <div className={css.container}>
      <PageMainHeader
        pageTitleEN="MY PAGE"
        pageTitleKO="마이페이지"
        url="/mypage"
      />
      <MypageContents />
    </div>
  );
}

export default Mypage;

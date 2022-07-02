import React, { useEffect, useState } from 'react';
import css from './MypageHeader.module.scss';
import { BASEURL } from '../../../../ApiOrigin';

function MypageHeader() {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch(`${BASEURL}/mypage`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('login-token')}`,
        // 'Content-Type': 'application/json',
        // Accept: 'application/json',
      },
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(fetchdatas => {
        let fetchdata = fetchdatas.data[0];
        setData(fetchdata);
      });
  }, []);

  return (
    <div className={css.headerContainer}>
      <p className={css.helloToUser}>{data.name}</p>
      <div>
        <span className={css.email}>{data.email}</span>
        <button className={css.editBtn}>회원 정보 수정</button>
      </div>
    </div>
  );
}

export default MypageHeader;

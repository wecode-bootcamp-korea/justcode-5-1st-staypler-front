import React, { useEffect, useState } from 'react';
import css from './MypageHeader.module.scss';

function MypageHeader() {
  const [data, setData] = useState({});
  let params = {
    id: 1,
  };

  let query = Object.keys(params)
    .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
    .join('&');

  let url = 'http://192.168.1.4:10010/mypage/header?' + query;

  useEffect(() => {
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
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

import React, { useState, useEffect } from 'react';
import css from './ReservationHeader.module.scss';
function ReservationHeader(props) {
  const [data, setData] = useState({});

  return (
    <div className={css.container}>
      <div className={css.header}>
        <div className={css.bookingRow}>
          <div className={css.name}>{props.roomname}</div>
          <div className={css.bookingDate}>
            <input
              type="text"
              className={css.date}
              placeholder="여행시작 yyyy-mm-dd"
            />
            <input
              type="text"
              className={css.date}
              placeholder="여행마감 yyyy-mm-dd"
            />
          </div>
          <button className={css.bookingBtn}>결제하기</button>
        </div>
      </div>
    </div>
  );
}
export default ReservationHeader;

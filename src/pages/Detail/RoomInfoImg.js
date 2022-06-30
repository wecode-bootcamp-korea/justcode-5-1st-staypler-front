import React from 'react';
import css from './RoomInfoImg.module.scss';
import { useNavigate } from 'react-router-dom';
const RoomInfoImg = ({
  imageUrl,
  id,
  price,
  title,
  type,
  min_limit,
  max_limit,
}) => {
  return (
    <ul>
      <li className={css.imgCard}>
        <img src={imageUrl} alt={id} className={css.roomImg} />
        <div className={css.infoBox}>
          <div className={css.roomName}>
            {title}
            <p className={css.roomType}>{type}</p>
          </div>
          <p
            className={css.etc}
          >{`기준 ${min_limit}명 (최대 ${max_limit}명)`}</p>
          <p className={css.price}>
            {`₩${Math.floor(price).toLocaleString('ko-KR')}~`}
          </p>
          <p className={css.bookingButton}>예약하기</p>
        </div>
      </li>
    </ul>
  );
};
export default RoomInfoImg;

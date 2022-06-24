import React from 'react';
import style from './RoomInfoImg.module.scss';

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
    <div className={style.imgCard}>
      <img src={imageUrl} alt={id} className={style.roomImg} />
      <div className={style.infoBox}>
        <div className={style.roomCondition}>
          <p className={style.roomName}>{title}</p>
          <p className={style.roomType}>{type}</p>
        </div>
        <p className={style.etc}>
          {`기준 ${min_limit}명 (최대 ${max_limit}명)`}
        </p>
        <p className={style.price}>
          {`₩${Math.floor(price).toLocaleString('ko-KR')}~`}
        </p>
        <p className={style.bookingButton}>예약하기</p>
      </div>
    </div>
  );
};

export default RoomInfoImg;

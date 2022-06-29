import React from 'react';
import css from './RoomInfoImg.module.scss';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../Desktop/justcode/justcode-5-1st-staypler/justcode-5-1st-staypler-front/src/config';

const RoomInfoImg = ({
  imageUrl,
  id,
  price,
  title,
  type,
  min_limit,
  max_limit,
}) => {
  //예약페이지연결
  const navigate = useNavigate();

  const goToBooking = () => {
    fetch(`${BASE_URL}/rooms/room`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(result => {
        localStorage.setItem('token', result.access_token);
        navigate('/rooms/room');
      });
  };
  return (
    <ul onClick={goToBooking}>
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

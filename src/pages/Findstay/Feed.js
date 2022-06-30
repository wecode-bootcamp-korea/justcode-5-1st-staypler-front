import React from 'react';
import { useNavigate } from 'react-router-dom';
import css from './Findstay.module.scss';
function Feed(props) {
  const {
    roomName,
    roomType,
    province,
    city,
    maxLimit,
    minLimit,
    minPrice,
    maxPrice,
    images,
  } = props;
  return (
    <div className={css.listBox}>
      <div className={css.roomNameBox}>
        <div className={css.roomNameTit}>{roomName}</div>
        <div className={css.roomType}>{roomType}</div>
      </div>
      <div className={css.feedContents}>
        <div className={css.leftColumn}>
          <div className={css.description}>
            <span>
              {province}/{city}
            </span>
            <span>
              {minLimit}명(최대 {maxLimit}명)
            </span>
            <span>
              {minPrice}~{maxPrice}
            </span>
          </div>
          <div className={css.reservationBtn}>예약하기</div>
        </div>
        <img className={css.feedPhoto} src={images} alt="FeedPhoto" />
      </div>
    </div>
  );
}

export default Feed;

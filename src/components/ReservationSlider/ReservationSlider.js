import React, { useEffect, useState } from 'react';
import css from './ReservationSlider.module.scss';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';

function ReservationSlider() {
  const [data, setData] = useState({});
  const dataLength = data.images?.length;
  let dataImages = [];

  useEffect(() => {
    fetch('http://localhost:3000/data/ReservationSlider.json')
      .then(res => res.json())
      .then(fetchdata => {
        setData(fetchdata);
      });
  }, []);

  if (data.images !== undefined) {
    dataImages = [data.images[dataLength - 1], ...data.images, data.images[0]];
  }

  return (
    <div className={css.component}>
      <div className={css.reservationCard}>
        <div className={css.roomInfo}>
          <h1 className={css.title}>ROOM INFORMATION</h1>
          <p className={css.roomName}>{data.room_name}</p>
          <p className={css.price}>
            ￦{data.price?.toLocaleString('ko-KR')}/1박
          </p>
          <div className={css.roomDetail}>
            <div>
              체크인 {data.check_in_time} / 체크아웃 {data.check_out_time}
            </div>
            <div>
              기준 인원 {data.min_limit}명 (최대 인원 {data.max_limit}
              명)
            </div>
          </div>
        </div>
        <div className={css.carousel}>
          <div className={css.cardContainer}>
            {data.images &&
              data.images.map((a, i) => {
                return (
                  <div className={css.card} key={i}>
                    <div
                      className={css.roomImg}
                      style={{
                        backgroundImage: `url(${data.images[i]})`,
                      }}
                      key={i}
                    />
                  </div>
                );
              })}
          </div>
          <div className={css.sliderBtn}>
            <div>
              <MdArrowBackIos size={20} />
            </div>
            <div>
              <MdArrowForwardIos size={20} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReservationSlider;

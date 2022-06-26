import React, { useEffect, useState } from 'react';
import css from './DetailBannerSlider.module.scss';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';

function DetailBannerSlider() {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch('http://localhost:3000/data/DetailBannerSlider.json')
      .then(res => res.json())
      .then(fetchdata => {
        setData(fetchdata);
      });
  }, []);

  return (
    <div className={css.component}>
      <div className={css.carousel}>
        <div className={css.cardContainer}>
          {data.images &&
            data.images.map((a, i) => {
              return (
                <div className={css.card} key={i}>
                  <div
                    className={css.promtionImg}
                    style={{
                      backgroundImage: `url(${data.images[i]})`,
                    }}
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
        <div className={css.roomInfo}>
          <div className={css.roomDetail1}>
            <span className={css.roomConcept}>{data.concept}</span>
            <div className={css.link}>
              <span>MAGAZINE</span>
              <span>PICK</span>
              <span>PROMOTION</span>
            </div>
          </div>
          <div className={css.roomDetail2}>
            <span className={css.roomName}>{data.room_name}</span>
            <div className={css.location}>
              <span>{data.province}</span>
              <span>{data.city}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailBannerSlider;

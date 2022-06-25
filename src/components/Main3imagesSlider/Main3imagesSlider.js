import React, { useEffect, useState } from 'react';
import css from './Main3imagesSlider.module.scss';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';

function Main3imagesSlider() {
  const [data, setData] = useState([]);
  const dataLength = data.length - 2;

  useEffect(() => {
    fetch('http://localhost:3000/data/Main3imagesSlider.json')
      .then(res => res.json())
      .then(fetchdata => {
        setData([fetchdata[fetchdata.length - 1], ...fetchdata, fetchdata[0]]);
      });
  }, []);

  return (
    <div className={css.component}>
      <div className={css.carousel}>
        <h1 className={css.title}>당신께만 추천드리는 스테이</h1>
        <div className={css.cardContainer}>
          <div className={css.cards}>
            {data.map((a, i) => {
              return (
                <div className={css.card} key={i}>
                  <div
                    className={css.cardImg}
                    style={{
                      backgroundImage: `url(${data[i].image})`,
                    }}
                  ></div>
                  <div className={css.roomName}>{data[i].room_name}</div>
                  <div className={css.roomInfo}>
                    <span className={css.province}>{data[i].privince}</span>
                    <span className={css.city}>{data[i].city}</span>
                    <span className={css.price}>
                      ￦{data[i].price.toLocaleString('ko-KR')}
                    </span>
                  </div>
                  <span className={css.reserve}>reserve</span>
                </div>
              );
            })}
          </div>
          <div className={css.pagenation}>
            <span className={`${css.pagNum} ${css.current}`}>3</span>
            <span className={`${css.pagNum} ${css.total}`}>{dataLength}</span>
            <MdArrowBackIos className={css.btn} />
            <MdArrowForwardIos className={css.btn} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main3imagesSlider;

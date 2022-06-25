import React, { useEffect, useRef, useState } from 'react';
import css from './MainPromationSlider.module.scss';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';

function MainPromationSlider() {
  const [data, setData] = useState([]);
  const dataLength = data.length - 2;
  let cardContainerRef = useRef();

  useEffect(() => {
    fetch('http://localhost:3000/data/MainPromationSlider.json')
      .then(res => res.json())
      .then(fetchdata => {
        setData([fetchdata[fetchdata.length - 1], ...fetchdata, fetchdata[0]]);
      });
  }, []);

  useEffect(() => {
    cardContainerRef.current.style.scrollBehavior = 'auto';
    cardContainerRef.current.scrollLeft = 1330;
  }, [cardContainerRef.current]);

  const sliderLeft = () => {
    infinity();
    cardContainerRef.current.style.scrollBehavior = 'smooth';
    cardContainerRef.current.scrollLeft -= 1330;
  };

  const sliderRight = () => {
    infinity();
    cardContainerRef.current.style.scrollBehavior = 'smooth';
    cardContainerRef.current.scrollLeft += 1330;
  };

  const infinity = () => {
    if (cardContainerRef.current.scrollLeft === 0) {
      cardContainerRef.current.style.scrollBehavior = 'auto';
      cardContainerRef.current.scrollLeft = 1330 * dataLength;
    }

    if (cardContainerRef.current.scrollLeft === 1330 * (dataLength + 1)) {
      cardContainerRef.current.style.scrollBehavior = 'auto';
      cardContainerRef.current.scrollLeft = 1330;
    }
  };

  const carouselRef = useRef();
  let isPressedDown = false;
  let cursorXspace;

  useEffect(() => {
    window.addEventListener('mouseup', () => {
      isPressedDown = false;
    });

    carouselRef?.current.addEventListener('mousedown', e => {
      isPressedDown = true;
      cursorXspace = e.offsetX - cardContainerRef.current.offsetLeft;
    });

    carouselRef?.current.addEventListener('mouseup', () => {
      isPressedDown = false;
    });

    carouselRef?.current.addEventListener('mousemove', e => {
      infinity();
      if (!isPressedDown) return;
      e.preventDefault();
      cardContainerRef.current.style.scrollBehavior = 'smooth';
      if (cursorXspace - e.offsetX > 250) {
        cardContainerRef.current.scrollLeft += 1330;
      } else if (cursorXspace - e.offsetX < -250) {
        cardContainerRef.current.scrollLeft -= 1330;
      }
    });
  }, [carouselRef]);

  return (
    <div className={css.component}>
      <div className={css.carousel} ref={carouselRef}>
        <ul className={css.cardContainer} ref={cardContainerRef}>
          {data.map((a, i) => {
            return (
              <div className={css.card} key={i}>
                <div className={css.promtionInfo}>
                  <p className={css.promotion}>PROMOTION</p>
                  <h1 className={css.promotionTitle}>
                    {data[i].promotion_title}
                  </h1>
                  <h2 className={css.promptionSubTitle}>
                    {data[i].promotion_sub_title}
                  </h2>
                  <p className={css.roomName}>{data[i].room_name}</p>
                  <div className={css.roomInfo}>
                    <div className={css.locationInfo}>
                      <p className={css.province}>{data[i].province} </p>
                      <p className={css.city}> {data[i].city}</p>
                      <p className={css.roomtype}>{data[i].room_type}</p>
                    </div>
                    <div className={css.poopleLimit}>
                      <p className={css.minNumOfpeople}>
                        최소 {data[i].max_limit}명
                      </p>
                      <p className={css.maxNumOfpeople}>
                        최대 {data[i].min_limit}명
                      </p>
                    </div>
                    <p className={css.price}>
                      {data[i].price.toLocaleString('ko-KR')}원
                    </p>
                  </div>

                  <div className={css.pagenation}>
                    <p className={css.currentPage}>{data[i].id + 1}</p>
                    <p className={css.totalPage}>{dataLength}</p>
                    <MdArrowBackIos className={css.btn} onClick={sliderLeft} />
                    <MdArrowForwardIos
                      className={css.btn}
                      onClick={sliderRight}
                    />
                  </div>
                </div>

                <div
                  className={css.promtionImg}
                  style={{
                    backgroundImage: `url(${data[i].image})`,
                  }}
                >
                  <div className={css.remainingPeriod}>
                    {data[i].left_days} DAYS LEFT!
                  </div>
                </div>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default MainPromationSlider;

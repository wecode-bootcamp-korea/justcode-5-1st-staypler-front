import React, { useEffect, useRef, useState } from 'react';
import css from './MainPromotionSlider.module.scss';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { BASEURL } from '../../../../ApiOrigin';

const infinity = (cardContainerRef, carouselRef, dataLength) => {
  if (cardContainerRef.current.scrollLeft === 0) {
    cardContainerRef.current.style.scrollBehavior = 'auto';
    cardContainerRef.current.scrollLeft =
      carouselRef.current.offsetWidth * dataLength;
  }

  if (
    cardContainerRef.current.scrollLeft ===
    carouselRef.current.offsetWidth * (dataLength + 1)
  ) {
    cardContainerRef.current.style.scrollBehavior = 'auto';
    cardContainerRef.current.scrollLeft = carouselRef.current.offsetWidth;
  }
};

function MainPromotionSlider() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const dataLength = data.length - 2;
  let cardContainerRef = useRef();
  const carouselRef = useRef();

  useEffect(() => {
    fetch(`${BASEURL}/main/promotion`)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(fetchdatas => {
        let fetchdata = fetchdatas.data;
        setData([fetchdata[fetchdata.length - 1], ...fetchdata, fetchdata[0]]);
      });
  }, []);

  const goToDetail = id => {
    navigate(`/rooms/${data[id].room_id}`);
  };

  useEffect(() => {
    cardContainerRef.current.style.scrollBehavior = 'auto';
    cardContainerRef.current.scrollLeft = carouselRef.current.offsetWidth;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardContainerRef.current]);

  const sliderLeft = () => {
    infinity(cardContainerRef, carouselRef, dataLength);
    cardContainerRef.current.style.scrollBehavior = 'smooth';
    cardContainerRef.current.scrollLeft -= carouselRef.current.offsetWidth;
  };

  const sliderRight = () => {
    infinity(cardContainerRef, carouselRef, dataLength);
    cardContainerRef.current.style.scrollBehavior = 'smooth';
    cardContainerRef.current.scrollLeft += carouselRef.current.offsetWidth;
  };

  useEffect(() => {
    let isPressedDown = false;
    let cursorXspace;

    const carouselRefCurrent = carouselRef.current;

    function mouseUpCallback() {
      isPressedDown = false;
    }

    function mouseDownCallback(e) {
      isPressedDown = true;
      cursorXspace = e.offsetX - cardContainerRef.current.offsetLeft;
    }

    function mouseMoveCallback(e) {
      infinity(cardContainerRef, carouselRef, dataLength);

      if (!isPressedDown) return;
      e.preventDefault();
      cardContainerRef.current.style.scrollBehavior = 'smooth';
      if (cursorXspace - e.offsetX > carouselRefCurrent.offsetWidth * 0.2) {
        cardContainerRef.current.scrollLeft += carouselRefCurrent.offsetWidth;
      } else if (
        cursorXspace - e.offsetX <
        carouselRefCurrent.offsetWidth * -0.2
      ) {
        cardContainerRef.current.scrollLeft -= carouselRefCurrent.offsetWidth;
      }
    }

    window.addEventListener('mouseup', mouseUpCallback);
    carouselRefCurrent.addEventListener('mousedown', mouseDownCallback);
    carouselRefCurrent.addEventListener('mouseup', mouseUpCallback);
    carouselRefCurrent.addEventListener('mousemove', mouseMoveCallback);

    return () => {
      window.removeEventListener('mouseup', mouseUpCallback);
      carouselRefCurrent.removeEventListener('mousedown', mouseDownCallback);
      carouselRefCurrent.removeEventListener('mouseup', mouseUpCallback);
      carouselRefCurrent.removeEventListener('mousemove', mouseMoveCallback);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carouselRef.current]);

  return (
    <div className={css.component}>
      <div className={css.carousel} ref={carouselRef}>
        <ul className={css.cardContainer} ref={cardContainerRef}>
          {data &&
            data.map((a, i) => {
              return (
                <div
                  className={css.card}
                  key={i}
                  onDoubleClick={() => {
                    goToDetail(i);
                  }}
                >
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
                        {data[i].price?.toLocaleString('ko-KR')}원
                      </p>
                    </div>

                    <div className={css.pagenation}>
                      <p className={css.currentPage}>{data[i].id + 1}</p>
                      <p className={css.totalPage}>{dataLength}</p>
                      <MdArrowBackIos
                        className={css.btn}
                        onClick={sliderLeft}
                      />
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

export default MainPromotionSlider;

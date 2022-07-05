import React, { useEffect, useState, useRef } from 'react';
import css from './Main3imagesSlider.module.scss';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { BASEURL } from '../../../../ApiOrigin';

const infinity = (cardContainerRef, carouselRef, dataLength) => {
  if (cardContainerRef?.current.scrollLeft === 0) {
    cardContainerRef.current.style.scrollBehavior = 'auto';
    cardContainerRef.current.scrollLeft =
      (carouselRef.current.offsetWidth / 3) * dataLength;
  }

  if (
    cardContainerRef?.current.scrollLeft ===
    (carouselRef.current.offsetWidth / 3) * dataLength * 2
  ) {
    cardContainerRef.current.style.scrollBehavior = 'auto';
    cardContainerRef.current.scrollLeft =
      (carouselRef.current.offsetWidth / 3) * dataLength;
  }
};

function Main3imagesSlider() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const dataLength = data?.length / 3;
  let cardContainerRef = useRef();
  const carouselRef = useRef();
  let [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch(`${BASEURL}/data/Main3imagesSlider.json`)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(fetch => {
        let fetchdata = fetch.data;
        fetchdata.map((a, i) => {
          fetchdata[i].index = i + 1;
        });
        setData([...fetchdata, ...fetchdata, ...fetchdata]);
      });
  }, []);

  const goToDetail = id => {
    navigate(`/rooms/${data[id].rooms_id}`);
  };

  useEffect(() => {
    cardContainerRef.current.style.scrollBehavior = 'auto';
    cardContainerRef.current.scrollLeft =
      (carouselRef.current.offsetWidth / 3) * dataLength;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardContainerRef.current]);

  const sliderLeft = () => {
    infinity(cardContainerRef, carouselRef, dataLength);

    cardContainerRef.current.style.scrollBehavior = 'smooth';
    cardContainerRef.current.scrollLeft -= carouselRef.current.offsetWidth / 3;
    setCurrentPage(
      ((cardContainerRef.current.scrollLeft /
        (carouselRef.current.offsetWidth / 3)) %
        dataLength) +
        1
    );
  };

  const sliderRight = () => {
    infinity(cardContainerRef, carouselRef, dataLength);

    cardContainerRef.current.style.scrollBehavior = 'smooth';
    cardContainerRef.current.scrollLeft += carouselRef.current.offsetWidth / 3;
    setCurrentPage(
      ((cardContainerRef.current.scrollLeft /
        (carouselRef.current.offsetWidth / 3)) %
        dataLength) +
        1
    );
  };

  return (
    <div className={css.component}>
      <div className={css.carousel} ref={carouselRef}>
        <h1 className={css.title}>당신께만 추천드리는 스테이</h1>
        <div className={css.cardContainer} ref={cardContainerRef}>
          <div className={css.cards}>
            {data.map((a, i) => {
              return (
                <div
                  className={css.card}
                  key={i}
                  onClick={() => {
                    goToDetail(i);
                  }}
                >
                  <div
                    className={css.cardImg}
                    style={{
                      backgroundImage: `url(${data[i].image})`,
                    }}
                  />
                  <div className={css.roomName}>{data[i].room_name}</div>
                  <div className={css.roomInfo}>
                    <span className={css.province}>{data[i].province}</span>
                    <span className={css.city}>{data[i].city}</span>
                    <span className={css.price}>
                      ￦{data[i].max_price?.toLocaleString('ko-KR')} ~
                    </span>
                    <span> ￦{data[i].min_price?.toLocaleString('ko-KR')}</span>
                  </div>
                  <span className={css.reserve}>reserve</span>
                </div>
              );
            })}
          </div>
          <div className={css.pagenation}>
            <span className={`${css.pagNum} ${css.current}`}>
              {currentPage}
            </span>
            <span className={`${css.pagNum} ${css.total}`}>{dataLength}</span>
            <MdArrowBackIos className={css.btn} onClick={sliderLeft} />
            <MdArrowForwardIos className={css.btn} onClick={sliderRight} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main3imagesSlider;

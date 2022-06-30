import React, { useEffect, useRef, useState } from 'react';
import css from './ReservationSlider.module.scss';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';

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

function ReservationSlider({ roomid }) {
  const [data, setData] = useState({});
  const dataLength = data.images?.length;
  let dataImages = [];
  let cardContainerRef = useRef();
  const carouselRef = useRef();

  useEffect(() => {
    fetch(`http://192.168.1.4:10010/rooms/${roomid}/room`)
      .then(res => res.json())
      .then(fetchdata => {
        setData(fetchdata.data[0]);
      });
  }, []);

  console.log(data);

  if (data.images !== undefined) {
    dataImages = [data.images[dataLength - 1], ...data.images, data.images[0]];
  }

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
        <div className={css.carousel} ref={carouselRef}>
          <div className={css.cardContainer} ref={cardContainerRef}>
            {dataImages &&
              dataImages.map((a, i) => {
                return (
                  <div className={css.card} key={i}>
                    <div
                      className={css.roomImg}
                      style={{
                        backgroundImage: `url(${dataImages[i]})`,
                      }}
                      key={i}
                    />
                  </div>
                );
              })}
          </div>
          <div className={css.sliderBtn}>
            <div onClick={sliderLeft}>
              <MdArrowBackIos size={20} />
            </div>
            <div onClick={sliderRight}>
              <MdArrowForwardIos size={20} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReservationSlider;

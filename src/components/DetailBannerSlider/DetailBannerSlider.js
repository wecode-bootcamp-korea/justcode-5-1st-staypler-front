import React, { useEffect, useRef, useState } from 'react';
import css from './DetailBannerSlider.module.scss';
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

function DetailBannerSlider() {
  const [data, setData] = useState({});
  const dataLength = data.images?.length;
  let dataImages = [];
  let cardContainerRef = useRef();
  const carouselRef = useRef();

  useEffect(() => {
    fetch('http://localhost:3000/data/DetailBannerSlider.json')
      .then(res => res.json())
      .then(fetchdata => {
        setData(fetchdata);
      });
  }, []);

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
      <div className={css.carousel} ref={carouselRef}>
        <div className={css.cardContainer} ref={cardContainerRef}>
          {dataImages &&
            dataImages.map((a, i) => {
              return (
                <div className={css.card} key={i}>
                  <div
                    className={css.promtionImg}
                    style={{
                      backgroundImage: `url(${dataImages[i]})`,
                    }}
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

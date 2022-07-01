import React, { useEffect, useRef, useState } from 'react';
import css from './MainBannerSlider.module.scss';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

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

function MainBannerSlider() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const dataLength = data.length - 2;
  let cardContainerRef = useRef();
  const carouselRef = useRef();

  useEffect(() => {
    fetch('http://192.168.1.6:10010/main/banner')
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
          {data.map((a, i) => {
            return (
              <li
                className={css.card}
                key={i}
                onDoubleClick={() => {
                  goToDetail(i);
                }}
              >
                <div
                  className={css.roomImg}
                  style={{
                    backgroundImage: `url(${data[i].image})`,
                  }}
                />
                <div className={css.roomInfo}>
                  <div className={css.roomName}>{data[i].room_name}</div>
                  <div className={css.roomConcept}>{data[i].concept}</div>
                  <div className={css.readMore}>read more</div>
                </div>
                <div className={css.pagenation}>
                  <div className={css.pagNums}>
                    <div className={css.currentPage}>
                      {data[i].id + 1 < 10
                        ? '0' + (data[i].id + 1)
                        : data[i].id + 1}
                    </div>
                    <div className={css.totalPage}>
                      {dataLength < 10 ? '0' + dataLength : dataLength}
                    </div>
                  </div>
                  <div className={css.sliderBtns}>
                    <MdArrowBackIos
                      size={20}
                      className={css.prevBtn}
                      onClick={sliderLeft}
                    />
                    <MdArrowForwardIos
                      size={20}
                      className={css.afterBtn}
                      onClick={sliderRight}
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default MainBannerSlider;

import React, { useEffect, useRef, useState } from 'react';
import css from './MainBannerSlider.module.scss';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';

function MainBannerSlider() {
  const [data, setData] = useState([]);
  const dataLength = data.length - 2;
  let cardContainerRef = useRef();

  useEffect(() => {
    fetch('http://localhost:3000/data/MainBannerSliderData.json')
      .then(res => res.json())
      .then(fetchdata => {
        setData([fetchdata[fetchdata.length - 1], ...fetchdata, fetchdata[0]]);
      });
  }, []);

  useEffect(() => {
    cardContainerRef.current.style.scrollBehavior = 'auto';
    cardContainerRef.current.scrollLeft = 1800;
  }, [cardContainerRef.current]);

  const sliderLeft = () => {
    infinity();
    cardContainerRef.current.style.scrollBehavior = 'smooth';
    cardContainerRef.current.scrollLeft -= 1800;
  };

  const sliderRight = () => {
    infinity();
    cardContainerRef.current.style.scrollBehavior = 'smooth';
    cardContainerRef.current.scrollLeft += 1800;
  };

  const infinity = () => {
    if (cardContainerRef.current.scrollLeft === 0) {
      cardContainerRef.current.style.scrollBehavior = 'auto';
      cardContainerRef.current.scrollLeft = 1800 * dataLength;
    }

    if (cardContainerRef.current.scrollLeft === 1800 * (dataLength + 1)) {
      cardContainerRef.current.style.scrollBehavior = 'auto';
      cardContainerRef.current.scrollLeft = 1800;
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
      // infinity();
      if (!isPressedDown) return;
      e.preventDefault();
      cardContainerRef.current.style.scrollBehavior = 'smooth';
      if (cursorXspace - e.offsetX > 350) {
        cardContainerRef.current.scrollLeft += 1800;
      } else if (cursorXspace - e.offsetX < -350) {
        cardContainerRef.current.scrollLeft -= 1800;
      }
    });
  }, [carouselRef]);

  return (
    <div className={css.component}>
      <div className={css.carousel} ref={carouselRef}>
        <ul className={css.cardContainer} ref={cardContainerRef}>
          {data.map((a, i) => {
            return (
              <li className={css.card} key={i}>
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
        <div className={css.btnGroup}></div>
      </div>
    </div>
  );
}

export default MainBannerSlider;

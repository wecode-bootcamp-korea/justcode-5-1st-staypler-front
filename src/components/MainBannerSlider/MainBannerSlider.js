import React, { useEffect, useRef, useState } from 'react';
import { MdArrowBackIos, MdArrowForwardIos, MdMaximize } from 'react-icons/md';

import css from './MainBannerSlider.module.scss';

function MainBannerSlider() {
  const [data, setData] = useState([]);
  const dataLength = data.length;

  useEffect(() => {
    fetch('http://localhost:3000/data/MainBannerSliderData.json')
      .then(res => res.json())
      .then(fetchdata => {
        setData(fetchdata);
      });
  }, []);

  let cardContainerReft = useRef();
  const sliderLeft = () => {
    cardContainerReft.current.style.scrollBehavior = 'smooth';
    cardContainerReft.current.scrollLeft -= 1800;
  };

  const sliderRight = () => {
    cardContainerReft.current.style.scrollBehavior = 'smooth';
    cardContainerReft.current.scrollLeft += 1800;
  };

  return (
    <div className={css.component}>
      <div className={css.carousel}>
        <div className={css.cardContainer} ref={cardContainerReft}>
          {data.map((a, i) => {
            return (
              <div className={css.card} key={i}>
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
              </div>
            );
          })}
        </div>
        <div className={css.btnGroup}></div>
      </div>
    </div>
  );
}

export default MainBannerSlider;

import React, { useState, useEffect, useRef } from 'react';
import { BASE_URL } from '../../config';
import css from './RoomInfoSlider.module.scss';
import RoomInfoImg from './RoomInfoImg';

const RoomInfoSlider = () => {
  const slideRef = useRef();
  const [slide, setSlide] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/data/roomIntro.json', {
      method: 'GET',
    })
      .then(res => res.json())
      .then(res => {
        setSlide(res.data);
      });
  }, []);

  const rooms = slide.length > 0 ? slide[0].rooms : null;
  const [currentRoom, setCurrentRoom] = useState(0);

  const state = slide.length && (100 / rooms.length) * currentRoom;

  const next = () => {
    setCurrentRoom(() =>
      currentRoom === rooms.length - 1 ? currentRoom : currentRoom + 1
    );
  };

  const prev = () => {
    setCurrentRoom(() => (currentRoom === 0 ? currentRoom : currentRoom - 1));
  };

  useEffect(() => {
    slideRef.current.style.transform = `translate(-${state}%)`;
    slideRef.current.style.transition = '.5s';
  }, [state]);

  return (
    <div className={css.container}>
      <div className={css.roomsInfoContainer}>
        <div className={css.roomsInfo}>
          <div className={css.title}>ROOMS</div>
          <div className={css.slideButtons}>
            <div className={css.button}>
              <img
                className="prevButton"
                src={process.env.PUBLIC_URL + './images/prevbutton.png'}
                alt="prev"
                onClick={prev}
              />
            </div>
            <div className={css.button}>
              <img
                className="nextButton"
                src={process.env.PUBLIC_URL + './images/nextbutton.png'}
                alt="prev"
                onClick={next}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={css.roomSlideContainer}>
        <div className={css.sliderWrapper}>
          <div className={css.roomSlide} ref={slideRef}>
            {slide.length &&
              rooms.map((el, idx) => {
                return (
                  <RoomInfoImg
                    className={css.cards}
                    imageUrl={el.imageUrl}
                    id={el.id}
                    key={el.id}
                    currentRoom={currentRoom}
                    price={el.price}
                    title={el.title}
                    type={el.type}
                    max_limit={el.max_limit}
                    min_limit={el.min_limit}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomInfoSlider;

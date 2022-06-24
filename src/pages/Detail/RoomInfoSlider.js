import React, { useState, useEffect, useRef } from 'react';
import { BASE_URL } from '../../config';
import style from './RoomsInfoSlider.module.scss';
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
        console.log('Success:', res.data);
        setSlide(res.data);
      });
  }, []);

  console.log('slide: ', slide);

  const rooms = slide.length > 0 ? slide[0].rooms : null;
  console.log('rooms: ', rooms);

  const [currentRoom, setCurrentRoom] = useState(0);
  const state = (90 / slide.length) * currentRoom;

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
    <div className={style.container}>
      <div className={style.roomsInfoContainer}>
        <div className={style.roomsInfo}>
          <div className={style.title}>ROOMS</div>
          <div className={style.slideButtons}>
            <div className={style.button}>
              <img
                className="prevButton"
                src={process.env.PUBLIC_URL + './images/prevbutton.png'}
                alt="prev"
                onClick={prev}
              />
            </div>
            <div className={style.button}>
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
      <div className={style.roomSlideContainer}>
        <div className={style.sliderWrapper}>
          <div className={style.roomSlide} ref={slideRef}>
            {slide.length > 0
              ? rooms.map((el, idx) => {
                  return (
                    <RoomInfoImg
                      className={style.cards}
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
                })
              : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomInfoSlider;

import React, { useState } from 'react';
import style from './RoomSpecial.module.scss';

const RoomSpecial = ({ details }) => {
  const special = details.length > 0 ? details[0].special : null;

  return (
    <div className={style.container}>
      <div className={style.specialWrap}>
        <div className={style.special}>SPECIAL</div>
        <div className={style.speailListWrap}>
          {special &&
            special.map((el, idx) => {
              return (
                <div className={style.contentWrap} key={el.id}>
                  <img src={el.image} alt={el.id} className={style.icon} />
                  <div className={style.title}>{el.title}</div>
                  <div className={style.content}>{el.content}</div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default RoomSpecial;

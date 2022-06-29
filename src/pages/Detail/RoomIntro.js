import React, { useState } from 'react';
import style from './RoomIntro.module.scss';

const RoomIntro = ({ details, room_name }) => {
  const roomsIntro = details.length > 0 ? details[0].rooms_intro : null;

  return (
    <div>
      {roomsIntro && (
        <div className={style.container}>
          <div className={style.titleDescContent}>
            <h1 className={style.introTitle}>{roomsIntro.title}</h1>
            <p className={style.roomName}>{room_name}</p>
          </div>
          <div className={style.mainContent}>
            <p>{roomsIntro.mainContent}</p>
          </div>
          <div className={style.subContent}>
            <p>{roomsIntro.subContent}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomIntro;

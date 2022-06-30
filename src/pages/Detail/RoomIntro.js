import React, { useState } from 'react';
import css from './RoomIntro.module.scss';

const RoomIntro = ({ details, room_name }) => {
  const roomsIntro = details.length > 0 ? details[0].rooms_intro : null;

  return (
    <div>
      {roomsIntro && (
        <div className={css.container}>
          <div className={css.titleDescContent}>
            <h1 className={css.introTitle}>{roomsIntro.title}</h1>
            <p className={css.roomName}>{room_name}</p>
          </div>
          <div className={css.mainContent}>
            <p>{roomsIntro.mainContent}</p>
          </div>
          <div className={css.subContent}>
            <p>{roomsIntro.subContent}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomIntro;

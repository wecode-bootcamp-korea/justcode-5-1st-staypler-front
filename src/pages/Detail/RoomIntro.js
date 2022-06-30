import React, { useState } from 'react';
import css from './RoomIntro.module.scss';

const RoomIntro = ({ roomData, room_name }) => {
  console.log('intro: ', roomData.intro);
  const roomsIntro = roomData.intro;

  return (
    <div>
      {roomsIntro && (
        <div className={css.container}>
          <div className={css.titleDescContent}>
            <h1 className={css.introTitle}>{roomsIntro.title}</h1>
            <p className={css.roomName}>{room_name}</p>
          </div>
          <div className={css.mainContent}>
            <p>{roomsIntro.main_content}</p>
          </div>
          <div className={css.subContent}>
            <p>{roomsIntro.sub_content}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomIntro;

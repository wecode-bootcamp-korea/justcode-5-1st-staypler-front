import React, { useState } from "react";
import css from "./RoomSpecial.module.scss";

const RoomSpecial = ({ roomData }) => {
  const special = roomData.specials;

  return (
    <div className={css.container}>
      <div className={css.specialWrap}>
        <div className={css.special}>SPECIAL</div>
        <div className={css.speailListWrap}>
          {special &&
            special.map((el, idx) => {
              return (
                <div className={css.contentWrap} key={el.id}>
                  <i>
                    <img src={el.image} alt={el.id} className={css.icon} />
                  </i>
                  <div className={css.title}>{el.title}</div>
                  <div className={css.content}>{el.content}</div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default RoomSpecial;

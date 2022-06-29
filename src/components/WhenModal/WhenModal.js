import React, { useState } from 'react';
import css from './WhenModal.module.scss';
import { AiOutlineClose, AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import BlackButton from '../BlackButton/BlackButton';
import moment from 'moment';
import CheckInOut from '../Calendar/CheckInOut';

function WhenModal({ modalRef, closeModal }) {
  const [stateMoment, setStateMoment] = useState(moment());
  const prev = () => {
    setStateMoment(stateMoment.clone().subtract(1, 'month'));
  };
  const next = () => {
    setStateMoment(stateMoment.clone().add(1, 'month'));
  };

  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [tempoCheckOut, setTempoCheckOut] = useState(null);

  const checked = checkedDay => {
    if (!checkIn) {
      setCheckIn(checkedDay);
    } else if (checkIn && !checkOut) {
      if (moment(checkIn).isAfter(checkedDay)) {
        setCheckIn(checkedDay);
      } else {
        setCheckOut(checkedDay);
      }
    } else {
      if (moment(checkIn).isAfter(checkedDay)) {
        setCheckIn(checkedDay);
      } else if (
        !moment(checkIn).isAfter(checkedDay) &&
        moment(checkOut).isAfter(checkedDay)
      ) {
        setCheckOut(checkedDay);
      } else {
        setCheckOut(checkedDay);
      }
    }
  };

  const reset = () => {
    setCheckIn(null);
    setCheckOut(null);
    setStateMoment(moment());
  };

  const onHover = day => {
    if (checkIn && !checkOut && !moment(checkIn).isAfter(day)) {
      setTempoCheckOut(day); //여기가 chekin만 클릭 후 마우스로 원하는 날짜까지 드래그 할 시,
    }
  };

  const onHoverReset = () => {
    setTempoCheckOut(null);
  };

  return (
    <div className={css.modalWrapper} ref={modalRef}>
      <div className={css.modal}>
        <div clssName={css.titleWrapper}>
          <div className={css.modalTitle}>
            <p className={css.whenText}>언제떠날까요?</p>
            <AiOutlineClose
              className={css.closeModal}
              size="50"
              id="modalClose1"
              onClick={() => {
                closeModal();
                reset();
              }} // 기존에 onclick시 close만 되던 기능에 추가해서 선택사항들 reset시키기
            />
          </div>
        </div>
        <div className={css.calendarWrapper}>
          <CheckInOut
            stateMoment={stateMoment}
            checkIn={checkIn}
            checkOut={checkOut}
            onCheck={checked}
            tempoCheckOut={tempoCheckOut}
            onHover={onHover}
            onHoverReset={onHoverReset}
          />
          <AiOutlineLeft size="22" className={css.prevBtn} onClick={prev} />
          <AiOutlineRight size="22" className={css.nextBtn} onClick={next} />
        </div>
      </div>
      <div className={css.btnWrapper}>
        <BlackButton
          className={css.searchBtn}
          content="search &nbsp; &nbsp; →"
        />
      </div>
    </div>
  );
}

export default WhenModal;

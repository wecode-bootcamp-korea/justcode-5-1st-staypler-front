import React, { useState } from 'react';
import css from './WhenModal.module.scss';
import { AiOutlineClose, AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import Calendar from '../Calendar/Calendar';
import BlackButton from '../BlackButton/BlackButton';
import moment from 'moment';

function WhenModal({ modalRef, closeModal }) {
  const [stateMoment, setStateMoment] = useState(moment());
  const prev = () => {
    setStateMoment(stateMoment.clone().subtract(1, 'month'));
  };
  const next = () => {
    setStateMoment(stateMoment.clone().add(1, 'month'));
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
              onClick={closeModal}
            />
          </div>
        </div>
        <div className={css.calendarWrapper}>
          <Calendar stateMoment={stateMoment} />
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

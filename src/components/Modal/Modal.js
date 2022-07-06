import React from 'react';
import css from './Modal.module.scss';

function Modal({ setOpenModal, text }) {
  return (
    <div className={css.modalBackground}>
      <div className={css.modalContainer}>
        <div className={css.titleCloseBtn}>
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            ×
          </button>
        </div>
        <div className={css.body}>
          <p>{text}</p>
        </div>
        <div className={css.footer}>
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;

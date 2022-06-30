import React from 'react';
import css from './ImgUploadModal.module.scss';

function ImgUploadModal({ setImgUploadModal, inputValue, setInputValue }) {
  const handleInput = event => {
    const { name, value } = event.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  return (
    <div className={css.modalBackground}>
      <div className={css.modalContainer}>
        <div className={css.titleCloseBtn}>
          <button
            onClick={() => {
              setImgUploadModal(false);
            }}
          >
            ×
          </button>
        </div>
        <div className={css.body}>
          <p>프로필 이미지 링크를 업로드해주세요.</p>
          <input
            type="link"
            name="image"
            value={inputValue.image}
            onChange={handleInput}
          />
        </div>
        <div className={css.footer}>
          <button
            onClick={() => {
              setImgUploadModal(false);
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

export default ImgUploadModal;

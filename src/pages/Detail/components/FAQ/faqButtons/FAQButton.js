import React from 'react';
import css from './FAQButton.module.scss';

function FAQButton({ name, clicked, click, index }) {
  const clickButton = () => {
    click(index);
  };

  return (
    <p
      className={css.infoBtn}
      onClick={() => {
        clickButton();
      }}
    >
      {name}
      {clicked === index ? 'infoActive' : ''}
    </p>
  );
}

export default FAQButton;

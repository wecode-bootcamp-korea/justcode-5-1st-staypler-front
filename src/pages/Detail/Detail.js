import React from 'react';
import css from './Detail.module.scss';
import FAQ from './FAQ/FAQ';

function Detail() {
  return (
    <div className={css.container}>
      <FAQ />
    </div>
  );
}

export default Detail;

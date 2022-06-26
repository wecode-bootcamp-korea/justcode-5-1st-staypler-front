import React from 'react';

import css from './PageMainHeader.module.scss';

function PageMainHeader(props) {
  const { pageTitleEN, pageTitleKO } = props;
  return (
    <div className={css.titleContainer}>
      <div className={css.titleEn}>{pageTitleEN}</div>
      <h1 className={css.titleKo}>{pageTitleKO}</h1>
    </div>
  );
}

export default PageMainHeader;

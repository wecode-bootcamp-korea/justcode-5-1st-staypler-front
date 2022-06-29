import React from 'react';
import { useNavigate } from 'react-router-dom';
import css from './PageMainHeader.module.scss';

function PageMainHeader(props) {
  const { pageTitleEN, pageTitleKO, url } = props;
  const navigate = useNavigate();

  return (
    <div className={css.titleContainer}>
      <div
        className={css.titleEn}
        onClick={() => {
          navigate(`${url}`);
        }}
      >
        {pageTitleEN}
      </div>
      <h1
        className={css.titleKo}
        onClick={() => {
          navigate(`${url}`);
        }}
      >
        {pageTitleKO}
      </h1>
    </div>
  );
}

export default PageMainHeader;

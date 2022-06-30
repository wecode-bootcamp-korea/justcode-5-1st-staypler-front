import React from 'react';
import css from './FaqContent.module.scss';

function FaqContent({ compInfo }) {
  const infoList = compInfo.infoList;

  return (
    <div>
      <div className={css.nameWrapper}>
        <span className={css.name}>{compInfo.name}</span>
      </div>
      <div className={css.contentWrapper}>
        <div className={css.subHeading}>{compInfo.subHeading}</div>
        <div className={css.contents}>
          <ul>
            <li className={css.contentList}>{infoList[0]}</li>
            <li className={css.contentList}>{infoList[1]}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default FaqContent;

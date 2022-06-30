import React, { useState, useEffect } from 'react';
import css from './FAQ.module.scss';
import FAQButton from './faqButtons/FAQButton';
import FaqContent from './faqContents/FaqContent';

const FAQ = () => {
  //infoButton 값 관리
  const [clicked, setClicked] = useState(0);

  //infoButton 관리 함수
  const click = num => {
    setClicked(num);
  };
  //components in array
  const [compInfo, setCompInfo] = useState([
    {
      id: 1,
      name: '인원 및 금액',
      subHeading: '',
      infoList: ['', ''],

      id: 2,
      name: '예약 및 결제',
      subHeading: '',
      infoList: ['', ''],

      id: 3,
      name: '이용안내',
      subHeading: '',
      infoList: ['', '', '', '', ''],

      id: 4,
      name: '인원 및 금액',
      subHeading: '',
      infoList: ['', ''],

      id: 5,
      name: '인원 및 금액',
      subHeading: '',
      infoList: ['', ''],
    },
  ]);

  useEffect(() => {
    fetch('/data/faq.json', { method: 'GET' })
      .then(res => res.json())
      .then(res => setCompInfo(res));
  });

  return (
    <div className={css.container}>
      <div className={css.buttons}>
        <p className={css.title}>FAQ</p>
        {compInfo.map((el, idx) => {
          return (
            <FAQButton
              key={el.id}
              click={click}
              name={el.name}
              clicked={clicked}
              index={idx}
            />
          );
        })}
      </div>
      <div className={css.contents}>
        <p>FAQ를 통하여 예약에 관련된 더 자세한 내용들을 찾아보세요.</p>
        <FaqContent compInfo={compInfo[clicked]} />
      </div>
    </div>
  );
};

export default FAQ;

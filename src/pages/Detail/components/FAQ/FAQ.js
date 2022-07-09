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
      subHeading: '인원 기준',
      infoList: [
        '숙박 기준인원은 1인, 최대 4인 입니다.',
        '기준인원 외 인원추가 요금은 별도 없습니다',
      ],

      id: 2,
      name: '예약 및 결제',
      subHeading: '환불 규정',
      infoList: [
        '예약 취소 및 날짜 변경 시 아래의 환불 규정에 따라 환불해드립니다.',
        '예약의 확정은 아래 사항을 모두 숙지하였고 모든 사항에 동의함을 의미합니다.',
      ],

      id: 3,
      name: '이용안내',
      subHeading: '안내 사항',
      infoList: [
        '체크인 시간은 오후 3시, 체크아웃 시간은 오전 11시 입니다.',
        '예약하신 당일 오전에 체크인 안내 문자를 드립니다.',
        '체크인/아웃은 리셉션을 통해 가능하며, 리셉션은 09:00 - 23:00 입니다.',
      ],

      id: 4,
      name: '부대 시설 안내',
      subHeading: '수영장 및 루프탑',
      infoList: [
        '수영장은 5층에 마련되어 있습니다.',
        '루프탑은 22:00시 까지만 운영합니다.',
      ],

      id: 5,
      name: '기타 안내',
      subHeading: '조식',
      infoList: [
        '로비 내 조식은 무료 제공됩니다.',
        '미리 말씀해 주시면 방으로 조식 배달 가능합니다.',
      ],
    },
  ]);

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

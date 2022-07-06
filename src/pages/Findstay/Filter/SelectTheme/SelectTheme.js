import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import {
  ModalApplyBtn,
  ModalApplyBtnWrapper,
  ModalTitle,
  ModalBox,
  CheckList,
} from '../../Filter/Filter';
const THEME_DATA = [
  { id: 1, type: '사색', name: '사색' },
  { id: 2, type: '갤러리', name: '갤러리' },
  { id: 3, type: '노천탕', name: '노천탕' },
  { id: 4, type: '가족여행', name: '가족여행' },
  { id: 5, type: '파티하우스', name: '파티하우스' },
  { id: 6, type: '디자인투어', name: '디자인투어' },
  { id: 7, type: '도심속휴식', name: '도심속휴식' },
  { id: 8, type: '정적인휴식', name: '정적인휴식' },
  { id: 9, type: '오션뷰', name: '오션뷰' },
  { id: 10, type: '풀빌라', name: '풀빌라' },
];

export default function SelectTheme({ closeHandler, handleFilter }) {
  const [selectedTheme, setSelectedTheme] = useState({
    사색: false,
    갤러리: false,
    노천탕: false,
    가족여행: false,
    파티하우스: false,
    디자인투어: false,
    도심속휴식: false,
    정적인휴식: false,
    오션뷰: false,
    풀빌라: false,
  });

  const handleChange = e => {
    const { name } = e.target;
    setSelectedTheme(current => ({ ...current, [name]: !current[name] }));
  };

  return (
    <ModalBox>
      <ModalTitle>
        테마
        <AiOutlineClose onClick={closeHandler} />
      </ModalTitle>
      <ModalApplyBtnWrapper>
        <ModalApplyBtn onClick={() => handleFilter(selectedTheme)}>
          적용하기
        </ModalApplyBtn>
      </ModalApplyBtnWrapper>
      <CheckList>
        {THEME_DATA.map((item, idx) => {
          return (
            <li key={idx}>
              <label onChange={handleChange} name={item.name}>
                <span>{item.type}</span>
                <input
                  type="checkbox"
                  value="space"
                  name={item.name}
                  checked={selectedTheme[item.name]}
                />
              </label>
            </li>
          );
        })}
      </CheckList>
    </ModalBox>
  );
}

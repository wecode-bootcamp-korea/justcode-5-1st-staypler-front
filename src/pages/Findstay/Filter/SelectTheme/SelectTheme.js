import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';
import { useLocation } from 'react-router-dom';
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
export default function SelectTheme({ closeHandler }) {
  const [selectedTheme, setSelectedTheme] = useState(
    Array(THEME_DATA.length).fill(false)
  );
  const handleChange = e => {
    const { name } = e.target;
    setSelectedTheme(current => ({ ...current, [name]: !current[name] }));
  };
  const location = useLocation();
  let [newQuery, setNewQuery] = useState();
  const keys = Object.keys(selectedTheme);
  const themes = [];
  for (let i = 0; i < keys.length; i++) {
    selectedTheme[keys[i]] === true && themes.push(keys[i]);
  }
  useEffect(() => {
    function makeNewQuery() {
      let query = location.search;
      if (query === '') {
        return '';
      } else if (query.includes('theme')) {
        let queryToArray = query.substring(1).split('&');
        let sortIndex = queryToArray.findIndex(element =>
          element.includes('theme')
        );
        queryToArray.splice(sortIndex, 1);
        let ModifiedQuery = queryToArray.join('&') + '&';
        return ModifiedQuery !== '&' ? ModifiedQuery : '';
      } else {
        return query.substring(1) + '&';
      }
    }
    setNewQuery(makeNewQuery());
  }, [location]);
  return (
    <ModalBox>
      <ModalTitle>
        테마
        <AiOutlineClose onClick={closeHandler} />
      </ModalTitle>
      <ModalApplyBtnWrapper>
        <Link to={`/findstay?${newQuery}theme=${themes.join()}`}>
          <ModalApplyBtn onClick={closeHandler}>적용하기</ModalApplyBtn>
        </Link>
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

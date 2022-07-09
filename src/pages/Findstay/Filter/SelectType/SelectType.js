import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ModalApplyBtn,
  ModalApplyBtnWrapper,
  ModalTitle,
  ModalBox,
  CheckList,
} from '../../Filter/Filter';
import { AiOutlineClose } from 'react-icons/ai';
const TYPE_DATA = [
  { id: 1, type: '게스트하우스', name: '게스트하우스' },
  { id: 2, type: '호텔', name: '호텔' },
  { id: 3, type: '민박', name: '민박' },
  { id: 4, type: '펜션', name: '펜션' },
  { id: 5, type: '모텔', name: '모텔' },
];
export default function SelectType({ closeHandler }) {
  const [selectedType, setSelectedType] = useState(
    Array(TYPE_DATA.length).fill(false)
  );
  const handleChange = e => {
    const { name } = e.target;
    setSelectedType(current => ({ ...current, [name]: !current[name] }));
  };
  const location = useLocation();
  let [newQuery, setNewQuery] = useState();
  const keys = Object.keys(selectedType);
  const types = [];
  for (let i = 0; i < keys.length; i++) {
    selectedType[keys[i]] === true && types.push(keys[i]);
  }
  useEffect(() => {
    function makeNewQuery() {
      let query = location.search;
      if (query === '') {
        return '';
      } else if (query.includes('type')) {
        let queryToArray = query.substring(1).split('&');
        let sortIndex = queryToArray.findIndex(element =>
          element.includes('type')
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
        스테이 유형
        <AiOutlineClose onClick={closeHandler} />
      </ModalTitle>
      <ModalApplyBtnWrapper>
        <ModalApplyBtn onClick={closeHandler}>
          <Link to={`/findstay?${newQuery}type=${types.join()}`}>적용하기</Link>
        </ModalApplyBtn>
      </ModalApplyBtnWrapper>
      <CheckList>
        {TYPE_DATA.map((item, idx) => {
          return (
            <li key={idx}>
              <label onChange={handleChange} name={item.name}>
                <span>{item.type}</span>
                <input
                  type="checkbox"
                  value="space"
                  name={item.name}
                  checked={selectedType[item.name]}
                />
              </label>
            </li>
          );
        })}
      </CheckList>
    </ModalBox>
  );
}

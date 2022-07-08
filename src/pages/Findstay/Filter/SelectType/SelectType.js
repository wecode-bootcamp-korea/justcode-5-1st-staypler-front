import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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

export default function SelectType({ closeHandler, handleFilter }) {
  const [selectedType, setSelectedType] = useState({
    게스트하우스: false,
    호텔: false,
    민박: false,
    펜션: false,
    모텔: false,
  });

  const handleChange = e => {
    const { name } = e.target;
    setSelectedType(current => ({ ...current, [name]: !current[name] }));
  };

  return (
    <ModalBox>
      <ModalTitle>
        스테이유형
        <AiOutlineClose onClick={closeHandler} />
      </ModalTitle>
      <ModalApplyBtnWrapper>
        {/* <Link
          to={`/findstay?type=${JSON.stringify(selectedType)}`}
          onClick={() => handleFilter(selectedType)}
        > */}
        <ModalApplyBtn onClick={() => handleFilter(selectedType, 'type')}>
          적용하기
        </ModalApplyBtn>
        {/* </Link> */}
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
                  // name="type" //수정
                  // value={item.name} //수정
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

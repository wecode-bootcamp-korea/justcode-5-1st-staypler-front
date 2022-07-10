import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';
import {
  ModalApplyBtn,
  ModalApplyBtnWrapper,
  ModalTitle,
  ModalBox,
} from '../../Filter/Filter';
const useCounter = () => {
  const [count, setCount] = useState({
    성인: 0,
    아동: 0,
    영아: 0,
  });
  const minusCount = type => {
    setCount({
      ...count,
      [type]: count[type] < 1 ? 0 : count[type] - 1,
    });
  };
  const plusCount = type => {
    setCount({
      ...count,
      [type]: count[type] + 1,
    });
  };
  return { count, plusCount, minusCount };
};

export default function SelectPeople({ closeHandler }) {
  const { count, plusCount, minusCount } = useCounter(0);

  const location = useLocation();

  const sumCount = Object.values(count).reduce((a, b) => a + b, 0);

  const PEOPLE_DATA = [
    { id: 1, type: '성인' },
    { id: 2, type: '아동', age: '24개월~12세' },
    { id: 3, type: '영아', age: '24개월 미만' },
  ];

  let [newQuery, setNewQuery] = useState();
  useEffect(() => {
    function makeNewQuery() {
      let query = location.search;
      if (query === '') {
        return '';
      } else if (query.includes('max_limit')) {
        let queryToArray = query.substring(1).split('&');
        let sortIndex = queryToArray.findIndex(element =>
          element.includes('max_limit')
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
        인원
        <AiOutlineClose onClick={closeHandler} />
      </ModalTitle>
      <div>
        {PEOPLE_DATA &&
          PEOPLE_DATA.map((item, idx) => {
            return (
              <PeopleCounter key={idx}>
                <span>
                  {item.type}
                  <p>{item.age}</p>
                </span>
                <NumberCount>
                  <ButtonMinus onClick={() => minusCount(item.type)} />
                  <InputNum>
                    <input type="number" value={count[item.type]} />
                    <span>명</span>
                  </InputNum>
                  <ButtonPlus onClick={() => plusCount(item.type)} />
                </NumberCount>
              </PeopleCounter>
            );
          })}
      </div>
      <ModalApplyBtnWrapper>
        <Link to={`/findstay?${newQuery}max_limit=${sumCount}`}>
          <ModalApplyBtn onClick={closeHandler}>적용하기</ModalApplyBtn>
        </Link>
      </ModalApplyBtnWrapper>
    </ModalBox>
  );
}
const PeopleCounter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 12px;
  height: 33px;
  font-size: 14px;
  div {
    display: flex;
    align-items: center;
  }
  span {
    p {
      margin-top: 5px;
      margin-right: 22px;
      font-size: 8px;
      color: #999;
    }
  }
`;
const NumberCount = styled.div`
  display: flex;
  position: relative;
  padding: 0 31px;
  text-align: center;
`;
const ButtonMinus = styled.button`
  position: absolute;
  display: inline-block;
  width: 31px;
  height: 32px;
  left: 0;
  background: #f9fafb url(https://www.stayfolio.com/web/images/btn_count.png)
    no-repeat 0 0;
  background-size: 29px 100px;
  border: 1px solid #e4e4e4;
  cursor: pointer;
  outline: none;
  appearance: none;
`;
const ButtonPlus = styled.button`
  position: absolute;
  display: inline-block;
  width: 31px;
  height: 32px;
  right: 0;
  background: #f9fafb url(https://www.stayfolio.com/web/images/btn_count.png)
    no-repeat 0 -50px;
  background-size: 29px 100px;
  border: 1px solid #e4e4e4;
  cursor: pointer;
  outline: none;
  appearance: none;
`;
const InputNum = styled.span`
  display: flex;
  width: 55px;
  height: 33px;
  border-top: 1px solid #e4e4e4;
  border-bottom: 1px solid #e4e4e4;
  font-size: 14px;
  text-align: center;
  input {
    display: inline-block;
    width: 37px;
    height: 31px;
    font-size: 14px;
    padding: 0;
    border: 0;
    vertical-align: middle;
    appearance: none;
    outline: none;
    text-align: right;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  span {
    display: inline-block;
    line-height: 30px;
    font-size: 14px;
  }
`;

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { BASEURL } from '../../../ApiOrigin';
import styled from 'styled-components';
import SelectPeople from './SelectPeople/SelectPeople';
import SelectType from './SelectType/SelectType';
import SelectTheme from './SelectTheme/SelectTheme';
import SelectPrice from './SelectPrice/SelectPrice';
export default function Filter() {
  const [rooms, setRooms] = useState([]);

  const [countPeopleTitle, setCountPeopleTitle] = useState('인원');
  const [priceTitle, setPriceTitle] = useState('가격 범위');
  const [typeTitle, setTypeTitle] = useState('스테이 유형');
  const [themeTitle, setThemeTitle] = useState('테마');

  const location = useLocation();
  const [currentID, setCurrentID] = useState();
  useEffect(() => {
    fetch(`${BASEURL}/findstay${location.search}`)
      .then(res => res.json())
      .then(res => setRooms(res.data));
  }, [location.search]);
  useEffect(() => {
    fetch(`${BASEURL}/findstay`)
      .then(res => res.json())
      .then(res => setRooms(res.data));
  }, []);

  const clickHandler = id => {
    setCurrentID(id);
  };
  const closeHandler = () => {
    setCurrentID(false);
  };
  return (
    <FilterContainer>
      <RowFilterLine>
        <Keyword>
          <Title>여행지/숙소</Title>
          <InputSearchbar type="text" />
        </Keyword>
        <FilterAreaBtn>국내전체</FilterAreaBtn>
        <CheckInOut>
          <ul>
            <li>
              <CheckInTitle>체크인</CheckInTitle>
            </li>
            <li>
              <CheckOutTitle>체크아웃</CheckOutTitle>
            </li>
          </ul>
          <DateContainer>
            <DateRange>
              <DateInputBox>
                <input type="text" placeholder="체크인" />
              </DateInputBox>
              <DateInputBox>
                <input type="text" placeholder="체크아웃" />
              </DateInputBox>
            </DateRange>
          </DateContainer>
        </CheckInOut>
      </RowFilterLine>
      <RowFilterLine>
        <div>
          <ModalBtnLayer>
            <ModalBtn onClick={() => clickHandler(0)}>
              {countPeopleTitle}
            </ModalBtn>
            {currentID === 0 && (
              <SelectPeople
                closeHandler={closeHandler}
                setCountPeopleTitle={setCountPeopleTitle}
                countPeopleTitle={countPeopleTitle}
              />
            )}
          </ModalBtnLayer>
        </div>
        <div>
          <ModalBtnLayer>
            <ModalBtn onClick={() => clickHandler(1)}>{priceTitle}</ModalBtn>
            {currentID === 1 && (
              <SelectPrice
                closeHandler={closeHandler}
                setPriceTitle={setPriceTitle}
                priceTitle={priceTitle}
              />
            )}
          </ModalBtnLayer>
        </div>
        <div>
          <ModalBtnLayer>
            <ModalBtn onClick={() => clickHandler(2)}>{typeTitle}</ModalBtn>
            {currentID === 2 && (
              <SelectType
                closeHandler={closeHandler}
                setThemeTitle={setTypeTitle}
                typeTitle={typeTitle}
              />
            )}
          </ModalBtnLayer>
        </div>
        <div>
          <ModalBtnLayer>
            <ModalBtn onClick={() => clickHandler(3)}>{themeTitle}</ModalBtn>
            {currentID === 3 && (
              <SelectTheme
                closeHandler={closeHandler}
                setThemeTitle={setThemeTitle}
                themeTitle={themeTitle}
              />
            )}
          </ModalBtnLayer>
        </div>
      </RowFilterLine>
      <SearchBtnWrapper>
        <SearchBtn>SEARCH</SearchBtn>
      </SearchBtnWrapper>
    </FilterContainer>
  );
}
const FilterContainer = styled.div`
  margin: 0 auto;
  border-top: 3px solid #000;
  position: relative;
  z-index: 20;
`;
const Keyword = styled.div``;
const Title = styled.span`
  font-size: 14px;
  color: #000;
  font-weight: 700;
  margin-right: 10px;
  line-height: 36px;
`;
const InputSearchbar = styled.input`
  border: 1px solid #e4e4e4;
  width: 200px;
  height: 36px;
  border-radius: 5px;
  font-size: 14px;
  color: #000;
  font-weight: 500;
  padding: 0 10px;
  outline: none;
  appearance: none;
  vertical-align: middle;
`;
const FilterAreaBtn = styled.button`
  padding: 0 15px;
  margin-left: 10px;
  background: #f2f2f2;
  border: none;
  min-width: 100px;
  line-height: 36px;
  text-align: left;
  font-size: 14px;
  border-radius: 5px;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
  cursor: pointer;
`;
const CheckInOut = styled.div`
  position: relative;
  display: block;
`;
const CheckInTitle = styled.span`
  position: absolute;
  z-index: 10;
  bottom: 10px;
  font-weight: 700;
  font-size: 14px;
  left: 48px;
`;
const CheckOutTitle = styled.span`
  position: absolute;
  z-index: 10;
  bottom: 10px;
  right: 208px;
  font-weight: 700;
  font-size: 14px;
`;
const DateContainer = styled.div`
  position: relative;
  width: 100%;
`;
const DateRange = styled.div`
  border: none;
  display: flex;
  border-radius: 2px;
  background-color: #fff;
`;
const DateInputBox = styled.div`
  width: 46%;
  margin-right: 8px;
  padding-left: 100px;
  input {
    width: 164px;
    height: 36px;
    cursor: pointer;
    border: 1px solid #e4e4e4;
    background: #fff url(https://www.stayfolio.com/web/images/arw_select.png)
      no-repeat 95% 50%;
    background-size: 20px 20px;
    border-radius: 5px;
    line-height: 36px;
    text-align: left;
    font-size: 14px;
    font-weight: 500;
    padding: 0 33px 0 12px;
    margin-right: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: inline-block;
    outline: none;
  }
`;
const RowFilterLine = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 60px;
  border-bottom: 1px solid #e6e6e6;
`;
const ModalBtnLayer = styled.div`
  position: relative;
  margin: 0;
  padding: 0;
`;
const ModalBtn = styled.button`
  display: block;
  background: #fff url(https://www.stayfolio.com/web/images/arw_select.png)
    no-repeat 95% 50%;
  background-size: 20px 20px;
  width: 200px;
  padding: 0 23px 0 12px;
  margin-right: 8px;
  border: 1px solid #e4e4e4;
  border-radius: 5px;
  line-height: 36px;
  text-align: left;
  font-size: 14px;
  color: #000;
  font-weight: 500;
  cursor: pointer;
`;
const SearchBtnWrapper = styled.div`
  height: 36px;
  display: flex;
  justify-content: center;
  margin-top: 36px;
`;
const SearchBtn = styled.button`
  display: block;
  background: url(https://www.stayfolio.com/web/images/arw-search2.png)
    no-repeat;
  background-position: 103px 12px;
  font-size: 14px;
  background-color: #000;
  background-size: 14px 11px;
  border-radius: 100px;
  color: #fff;
  font-family: Lato-Regular;
  line-height: 36px;
  letter-spacing: 2.5px;
  padding: 0 45px 0 25px;
  cursor: pointer;
`;
export const ModalBox = styled.div`
  position: absolute;
  display: block;
  min-width: 280px;
  margin-top: 28px;
  padding: 30px;
  background-color: #fff;
  border: 1px solid #e4e4e4;
  border-radius: 5px;
  line-height: 1;
  z-index: 10;
`;
export const ModalApplyBtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  padding: 10px 48px;
  background-color: black;
  color: white;
  border: none;
  font-size: 12px;
  border-radius: 100px;
  cursor: pointer;
  border: 0;
  a {
    text-decoration: none;
    color: #fff;
  }
`;
export const ModalApplyBtn = styled.div`
  display: flex;
  align-items: center;
  width: 100px;
  padding: 10px 20px;
  background-color: black;
  color: white;
  border: none;
  font-size: 12px;
  border-radius: 100px;
  cursor: pointer;
  border: 0;
  a {
    text-decoration: none;
    color: #fff;
  }
`;
export const ModalTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 20px;
  & > svg {
    font-size: 20px;
    cursor: pointer;
  }
`;
export const CheckList = styled.ul`
  width: 160px;
  padding-top: 14px;
  li {
    width: 100%;
    margin-top: 15px;
    label {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      cursor: pointer;
      input {
        left: auto;
        right: 0;
        margin: 0;
        cursor: pointer;
      }
      span {
        width: 100%;
        display: inline-block;
        text-align: center;
        font-size: 14px;
      }
    }
  }
`;

import React, { useCallback, useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  ModalApplyBtn,
  ModalApplyBtnWrapper,
  ModalTitle,
  ModalBox,
} from '../../Filter/Filter';
const MultiRangeSlider = ({ min, max, closeHandler }) => {
  MultiRangeSlider.propTypes = {
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
  };
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef(null);
  const maxValRef = useRef(null);
  const range = useRef(null);
  const getPercent = useCallback(
    value => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );
  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(+maxValRef.current.value);
      if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [minVal, getPercent]);
  useEffect(() => {
    if (minValRef.current) {
      const minPercent = getPercent(+minValRef.current.value);
      const maxPercent = getPercent(maxVal);
      if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [maxVal, getPercent]);

  const location = useLocation();
  let [newQuery, setNewQuery] = useState();
  useEffect(() => {
    function makeNewQuery() {
      let query = location.search;
      if (query === '') {
        return '';
      } else if (query.includes('max_price')) {
        let queryToArray = query.substring(1).split('&');
        let sortIndex = queryToArray.findIndex(element =>
          element.includes('max_price')
        );
        queryToArray.splice(sortIndex, 2);
        let ModifiedQuery = queryToArray.join('&') + '&';
        return ModifiedQuery !== '&' ? ModifiedQuery : '';
      } else {
        return query.substring(1) + '&';
      }
    }
    setNewQuery(makeNewQuery());
  }, [location]);
  return (
    <>
      <SliderContainer>
        <Thumb>
          <LeftSliderInput
            type="range"
            min={min}
            max={max}
            value={minVal}
            ref={minValRef}
            onChange={event => {
              const value = Math.min(+event.target.value, maxVal - 1);
              setMinVal(value);
              event.target.value = value.toString();
            }}
          />
          <RightSliderInput
            type="range"
            min={min}
            max={max}
            value={maxVal}
            ref={maxValRef}
            onChange={event => {
              const value = Math.max(+event.target.value, minVal + 1);
              setMaxVal(value);
              event.target.value = value.toString();
            }}
          />
          <SliderTrack />
          <SliderRange ref={range} />
        </Thumb>
        <Slider>
          <SliderValue>
            <PriceTitle>최저요금</PriceTitle>
            <PriceWrapper>
              <PriceInput type="text" value={`${minVal}만원`} readOnly />
            </PriceWrapper>
          </SliderValue>
          <Divider>-</Divider>
          <SliderValue>
            <PriceTitle>최고요금</PriceTitle>
            <PriceWrapper>
              <PriceInput type="text" value={`${maxVal}만원`} readOnly />
            </PriceWrapper>
          </SliderValue>
        </Slider>
      </SliderContainer>
      <ModalApplyBtnWrapper>
        <Link
          to={`/findstay?${newQuery}max_price=${maxVal * 10000}&min_price=${
            minVal * 10000
          }`}
        >
          <ModalApplyBtn onClick={closeHandler}>적용하기</ModalApplyBtn>
        </Link>
      </ModalApplyBtnWrapper>
    </>
  );
};
export default MultiRangeSlider;
const SliderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const LeftSliderInput = styled.input`
  position: absolute;
  -webkit-appearance: none;
  width: 250px;
  height: 5px;
  border-radius: 5px;
  background: #eee;
  outline: none;
  opacity: 0.7;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 30px;
    height: 30px;
    background-image: url('https://www.stayfolio.com/_next/static/media/img_handle.23f1f9a8c659e4645b25820c9a87cac7.png');
    cursor: pointer;
  }
`;
const RightSliderInput = styled.input`
  position: absolute;
  -webkit-appearance: none;
  width: 250px;
  height: 5px;
  border-radius: 5px;
  background: transparent;
  outline: none;
  opacity: 0.7;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 30px;
    height: 30px;
    background-image: url('https://www.stayfolio.com/_next/static/media/img_handle.23f1f9a8c659e4645b25820c9a87cac7.png');
    cursor: pointer;
  }
`;
const Thumb = styled.div`
  position: relative;
  z-index: 1;
  input[type='range'] {
    pointer-events: none;
  }
  input[type='range']::-webkit-slider-thumb {
    pointer-events: all;
  }
`;
const Slider = styled.div`
  position: relative;
  justify-content: space-between;
  display: flex;
  align-items: center;
  margin-top: 100px;
  width: 300px;
`;
const SliderTrack = styled.div`
  position: absolute;
  height: 5px;
  border-radius: 3px;
  background-color: #eee;
  width: 100%;
  z-index: 1;
`;
const SliderRange = styled.div`
  position: absolute;
  height: 5px;
  border-radius: 3px;
  background-color: #000;
  z-index: 1;
`;
const SliderValue = styled.div`
  position: relative;
  color: #000;
  font-size: 12px;
`;
const PriceTitle = styled.span`
  display: block;
  margin-bottom: 8px;
  font-size: 12px;
  color: #999;
`;
const PriceWrapper = styled.span`
  display: inline-block;
  padding: 0 8px 0 0;
  border: 1px solid #e4e4e4;
  line-height: 32px;
`;
const PriceInput = styled.input`
  width: 85px;
  height: 32px;
  padding-bottom: 5px;
  font-size: 14px;
  text-align: right;
  vertical-align: middle;
  border: 0;
  appearance: none;
  outline: none;
`;
const Divider = styled.span`
  border: none;
  padding: 25px 5px 5px;
  line-height: 32px;
`;

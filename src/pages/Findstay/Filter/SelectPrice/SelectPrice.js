import React, { useState } from 'react';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';
import MultiRangeSlider from './MultiRangeSlider';

import {
  ModalApplyBtn,
  ModalApplyBtnWrapper,
  ModalTitle,
  ModalBox,
} from '../../Filter/Filter';

const SelectPrice = ({ closeHandler, handleFilter }) => {
  return (
    <ModalBox>
      <ModalTitle>
        가격 범위
        <AiOutlineClose onClick={closeHandler} />
      </ModalTitle>
      <MultiRangeSlider
        min={0}
        max={100}
        onChange={({ min, max }) => console.log(`min = ${min}, max = ${max}`)}
      />
      <ModalApplyBtnWrapper>
        <ModalApplyBtn onClick={() => handleFilter()}>적용하기</ModalApplyBtn>
      </ModalApplyBtnWrapper>
    </ModalBox>
  );
};

export default SelectPrice;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';
import MultiRangeSlider from './MultiRangeSlider';

import {
  ModalApplyBtn,
  ModalApplyBtnWrapper,
  ModalTitle,
  ModalBox,
} from '../../Filter/Filter';

const SelectPrice = ({ closeHandler }) => {
  return (
    <ModalBox>
      <ModalTitle>
        가격 범위
        <AiOutlineClose onClick={closeHandler} />
      </ModalTitle>

      <MultiRangeSlider min={0} max={100} />
    </ModalBox>
  );
};

export default SelectPrice;

import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';

const Order = () => {
  const [sortedBtn, setSortedBtn] = useState(false);

  const sortBtn = e => {
    e.preventDefault();
    e.target.style.color = sortedBtn ? '#999999' : 'black';
    setSortedBtn(!sortedBtn);
  };
  return (
    <OrderWrapper>
      <OrderCategory>
        <OrderButton onClick={sortBtn}>• 최신순</OrderButton>
        <OrderButton>• 인기순</OrderButton>
        <OrderButton>• 높은 가격순</OrderButton>
        <OrderButton>• 낮은 가격순</OrderButton>
        <OrderButton>• 가까운 거리순</OrderButton>
      </OrderCategory>
    </OrderWrapper>
  );
};

const OrderWrapper = styled.div`
  margin-top: 109px;
  border-bottom: 2px solid #000;
  font-size: 14px;
  line-height: 2px;
`;

const OrderCategory = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-bottom: 14px;
`;

const OrderButton = styled.li`
  display: list-item;
  margin-left: 20px;
  cursor: pointer;
  list-style: none;
  color: #999999;
  font-size: 14px;
  /* z-index: 20; */
  ${props => (props.isActive ? 'white' : 'palevioletred')}
`;

export default Order;

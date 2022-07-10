import { check } from 'prettier';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Order = () => {
  const location = useLocation();
  let [newQuery, setNewQuery] = useState();

  useEffect(() => {
    function makeNewQuery() {
      let query = location.search;
      if (query === '') {
        return '';
      } else if (query.includes('sort')) {
        let queryToArray = query.substring(1).split('&');
        let sortIndex = queryToArray.findIndex(element =>
          element.includes('sort')
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

  const [select, setSelect] = useState('최신순');
  const handleChange = event => {
    const value = event.target.value;
    setSelect(value);
  };

  return (
    <OrderWrapper>
      <OrderCategory>
        <Link to={`/findstay?${newQuery}sort=`}>
          <Label>
            <input
              type="radio"
              name="sort"
              value="최신순"
              checked={select === '최신순'}
              onChange={event => handleChange(event)}
            />
            최신순
          </Label>
        </Link>

        <Link to={`/findstay?${newQuery}sort=likes`}>
          <Label>
            <input
              type="radio"
              name="sort"
              value="인기순"
              checked={select === '인기순'}
              onChange={event => handleChange(event)}
            />
            인기순
          </Label>
        </Link>

        <Link to={`/findstay?${newQuery}sort=min_price DESC`}>
          <Label>
            <input
              type="radio"
              name="sort"
              value="높은 가격순"
              checked={select === '높은 가격순'}
              onChange={event => handleChange(event)}
            />
            높은 가격순
          </Label>
        </Link>

        <Link to={`/findstay?${newQuery}sort=min_price`}>
          <Label>
            <input
              type="radio"
              name="sort"
              value="낮은 가격순"
              checked={select === '낮은 가격순'}
              onChange={event => handleChange(event)}
            />
            낮은 가격순
          </Label>
        </Link>
      </OrderCategory>
    </OrderWrapper>
  );
};

export default Order;

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
  a {
    text-decoration: none;
    color: #000;
  }
`;

const Label = styled.label`
  cursor: pointer;
  text-decoration: none;
  input[type='radio']:after {
    width: 5px;
    height: 5px;
    position: relative;
    left: -1px;
    border-radius: 50px;
    background-color: #000;
    content: '';
    display: inline-block;
    visibility: visible;
    border: 5px solid #fff;
  }

  input[type='radio']:checked:after {
    width: 5px;
    height: 5px;
    position: relative;
    top: 2;
    left: -1px;
    border-radius: 50px;
    background-color: #fff;
    content: '';
    display: inline-block;
    visibility: visible;
    border: 5px solid #000;
  }
`;

import { check } from 'prettier';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

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

  return (
    <div>
      <div>
        <Link to={`/findstay?${newQuery}sort=`}>
          <label>
            <input type="radio" name="sort" value="최신순" />
            최신순
          </label>
        </Link>
        <Link to={`/findstay?${newQuery}sort=likes`}>
          <label>
            <input type="radio" name="sort" value="인기순" />
            인기순
          </label>
        </Link>
        <Link to={`/findstay?${newQuery}sort=min_price DESC`}>
          <label>
            <input type="radio" name="sort" value="높은 가격순" />
            높은 가격순
          </label>
        </Link>
        <Link to={`/findstay?${newQuery}sort=min_price`}>
          <label>
            <input type="radio" name="sort" value="낮은 가격순" />
            낮은 가격순
          </label>
        </Link>
      </div>
    </div>
  );
};

export default Order;

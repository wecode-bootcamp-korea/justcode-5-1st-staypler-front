import React, { useState, useEffect } from 'react';
import css from './Findstay.module.scss';
import Feed from './Feed.js';
import { BASEURL } from '../../ApiOrigin';
import PageHeader from '../../components/PageHeader/PageHeader';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Filter from './Filter/Filter';
import Order from './Filter/Order';

function Findstay() {
  const [data, setData] = useState([]);

  let [pageBtnNum, setPageBtnNum] = useState(1);
  let [pages, setpages] = useState();

  let location = useLocation();
  console.log(location.search);

  useEffect(() => {
    fetch(`${BASEURL}/rooms${location.search}&page=${pageBtnNum}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('login-token')}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(fetchdata => {
        console.log(fetchdata);
        setpages(Math.ceil(fetchdata.rooms_count / 6));
        setData(fetchdata.data);
      });
  }, [pageBtnNum, location]);

  const pageNumber = [];
  for (let i = 1; i <= pages; i++) {
    pageNumber.push(i);
  }

  return (
    <div className={css.container}>
      <PageHeader
        pageTitleEN="FIND STAY"
        pageTitleKO="머무는 것 자체로 여행이 되는 공간"
        url="/findstay"
      />
      <Filter />
      <Order />
      {data.map(feed => {
        return (
          <Feed
            key={feed.id}
            id={feed.id}
            roomName={feed.title}
            roomType={feed.type}
            province={feed.province}
            images={feed.images[0]}
            city={feed.city}
            maxPrice={feed.max_price}
            minPrice={feed.min_price}
            maxLimit={feed.max_limit}
            minLimit={feed.min_limit}
            isLike={feed.isLike}
          />
        );
      })}
      <div className={css.pagenationWrapper}>
        {pageNumber.map(num => {
          return (
            <div
              className={css.pageNumber}
              key={num}
              onClick={() => {
                setPageBtnNum(num);
              }}
            >
              {num}
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Findstay;

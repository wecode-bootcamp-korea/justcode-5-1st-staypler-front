import React, { useState, useEffect } from 'react';
import css from './Findstay.module.scss';
import Feed from './Feed.js';
// import { useNavigate } from 'react-router-dom';
// import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';

function Findstay() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch('http://192.168.1.4:10010/rooms?page=1')
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(fetchdata => {
        setData(fetchdata.data);
      });
  }, []);

  const [nameInput, setNameInput] = useState('');
  const updateNameInput = e => {
    setNameInput(e.target.value);
  };

  // const sortedFeeds = data.filter(feed => {
  //   return feed.title.includes(nameInput);
  // });

  return (
    <div className={css.container}>
      <header>
        <div className={css.title}>FIND STAY</div>
        <div className={css.subtitle}>머무는 것 자체로 여행이 되는 공간</div>
      </header>
      <div className={css.filterWrapper}>
        <div className={css.firstLine}>
          <div className={css.keyword}>
            <span className={css.tit}>여행지/숙소</span>
            <input
              className={css.searchBar}
              type="text"
              onChange={updateNameInput}
            />
            <div className={css.filterBtn}>
              <button className={css.filterBtn}>지역</button>
            </div>
            <div className={css.checking}>
              <span className={css.checkingTit}>체크인</span>
              <input
                type="text"
                className={css.checkingBtn}
                placeholder="체크인 날짜"
              />
              <span className={css.checkingTit}>체크아웃</span>
              <input
                type="text"
                className={css.checkingBtn}
                placeholder="체크아웃 날짜"
              />
            </div>
          </div>
        </div>
        <div className={css.firstLine}>
          <div className={css.keyword}>
            <div className={css.filterBtn}>
              <button className={css.filterBtn}>인원</button>
            </div>
            <button className={css.filterBtn}>가격범위</button>
            <div className={css.filterBtn}>
              <button className={css.filterBtn}>스테이유형</button>
            </div>
            <div className={css.filterBtn}>
              <button className={css.filterBtn}>테마</button>
            </div>
          </div>
        </div>
        <div className={css.searchBtnWrapper}>
          <button className={css.searchBtn}>search</button>
        </div>
      </div>
      {data.map(feed => {
        return (
          <Feed
            key={feed.id}
            id={feed.id}
            roomName={feed.title}
            roomType={feed.type}
            province={feed.province}
            images={feed.images.image}
            city={feed.city}
            maxPrice={feed.max_price}
            minPrice={feed.min_price}
            maxLimit={feed.max_limit}
            minLimit={feed.min_limit}
            isLike={feed.isLike}
          />
        );
      })}
    </div>
  );
}

export default Findstay;

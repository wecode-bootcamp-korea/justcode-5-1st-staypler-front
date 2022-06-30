import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import css from './MypageStayList.module.scss';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';

function MypageStayList({ API }) {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  let cardContainerRef = useRef();
  const carouselRef = useRef();

  const [pages, setPages] = useState();

  const numberOfpages = [];
  for (let i = 1; i <= pages; i++) {
    numberOfpages.push(i);
  }
  const [CurrentButton, setCurrentButton] = useState(1);
  let params = {
    page: CurrentButton,
    count: 3,
    getImageAll: 1,
    id: 1,
  };

  let query = Object.keys(params)
    .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
    .join('&');

  let url = API + '?' + query;

  useEffect(() => {
    fetch(url)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(fetchdata => {
        setPages(fetchdata.maxPage);
        setData(fetchdata.data);
      });
  }, []);

  console.log(data);

  // pagenation 버튼 클릭 후, fetch해올 때 사용예정
  useEffect(() => {
    fetch(url)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(fetchdata => {
        setPages(fetchdata.maxPage);
        setData(fetchdata.data);
      });
  }, [CurrentButton]);

  const goToDetail = id => {
    navigate(`/rooms/${data[id].rooms_id}`);
  };

  useEffect(() => {
    let isPressedDown = false;
    let cursorXspace;
    let carouselRefCurrent = carouselRef.current;

    function mouseUpCallback() {
      isPressedDown = false;
    }

    function mouseDownCallback(e) {
      isPressedDown = true;
      cursorXspace = e.offsetX - cardContainerRef.current.offsetLeft;
    }

    function mouseMoveCallback(e) {
      if (!isPressedDown) return;
      e.preventDefault();
      cardContainerRef.current.style.scrollBehavior = 'smooth';
      if (cursorXspace - e.offsetX > carouselRefCurrent.offsetWidth * 0.2) {
        cardContainerRef.current.scrollLeft += carouselRefCurrent.offsetWidth;
      } else if (
        cursorXspace - e.offsetX <
        carouselRefCurrent.offsetWidth * -0.2
      ) {
        cardContainerRef.current.scrollLeft -= carouselRefCurrent.offsetWidth;
      }
    }

    window.addEventListener('mouseup', mouseUpCallback);
    carouselRefCurrent?.addEventListener('mousedown', mouseDownCallback);
    carouselRefCurrent?.addEventListener('mouseup', mouseUpCallback);
    carouselRefCurrent?.addEventListener('mousemove', mouseMoveCallback);

    return () => {
      window.removeEventListener('mouseup', mouseUpCallback);
      carouselRefCurrent?.removeEventListener('mousedown', mouseDownCallback);
      carouselRefCurrent?.removeEventListener('mouseup', mouseUpCallback);
      carouselRefCurrent?.removeEventListener('mousemove', mouseMoveCallback);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carouselRef.current]);

  return (
    <div className={css.container}>
      {data &&
        data.map((a, i) => {
          return (
            <div className={css.card} key={i}>
              <div className={css.roomInfo}>
                <div className={css.roomName}>{data[i].rooms_name}</div>
                <div className={css.roomDetail}>
                  <div>
                    <span className={css.province}>{data[i].province}</span>
                    <span className={css.city}>{data[i].city}</span>
                  </div>
                  <div>
                    <span className={css.minNumPeople}>
                      최소 {data[i].min_limit}명
                    </span>
                    <span className={css.maxNumPeople}>
                      최대 {data[i].max_limit}명
                    </span>
                  </div>
                  <div className={css.price}>
                    ￦{data[i].max_price?.toLocaleString('ko-KR')}
                  </div>
                  <div className={css.price}>
                    ￦{data[i].min_price?.toLocaleString('ko-KR')}
                  </div>
                </div>
                <button
                  className={css.reservationBtn}
                  onClick={() => {
                    goToDetail(i);
                  }}
                >
                  예약하기
                </button>
              </div>
              <div className={css.carousel} ref={carouselRef}>
                <div className={css.cardContainer} ref={cardContainerRef}>
                  {data[i].images &&
                    data[i].images.map((aa, ii) => {
                      return (
                        <div
                          className={css.roomImage}
                          style={{
                            backgroundImage: `url(${data[i].images[ii]})`,
                          }}
                          key={ii}
                          onClick={() => {
                            goToDetail(i);
                          }}
                        />
                      );
                    })}
                </div>
              </div>
            </div>
          );
        })}
      <div>
        <div className={css.paginationContainer}>
          <div
            onClick={() =>
              setCurrentButton(prev => (prev === 1 ? prev : prev - 1))
            }
          >
            <MdArrowBackIosNew />
          </div>
          {numberOfpages.map((page, i) => {
            return (
              <div
                key={i}
                className={`${CurrentButton === page && css.active}`}
                onClick={() => setCurrentButton(page)}
              >
                {page}
              </div>
            );
          })}
          <div
            onClick={() =>
              setCurrentButton(prev =>
                prev === numberOfpages ? prev : prev + 1
              )
            }
          >
            <MdArrowForwardIos />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MypageStayList;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import css from './Detail.module.scss';
import DetailBannerSlider from './components/DetailBannerSlider/DetailBannerSlider';
import Like from './components/Like/Like';
import RoomInfoSlider from './components/RoomInfoSlider/RoomInfoSlider';
import RoomIntro from './components/RoomIntro/RoomIntro';
import RoomSpecial from './components/RoomSpecial/RoomSpecial';
import FAQ from './components/FAQ/FAQ';
import { BASEURL } from '../../ApiOrigin';

function Detail() {
  const [data, setData] = useState([]);
  let { id } = useParams();

  useEffect(() => {
    fetch(`${BASEURL}/rooms/${id}`, {
      method: 'GET',
      headers: {
        // Authorization: `Bearer ${localStorage.getItem('login-token')}`,
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
        setData(fetchdata.data[0]);
      });
  }, []);

  return (
    <div className={css.container}>
      <div className={css.roomName}>
        {data.room_name}
        {data && <Like id={id} isLike={data.islike} />}
      </div>
      {data && <DetailBannerSlider roomData={data} />}
      {data && <RoomInfoSlider roomData={data} />}
      {data && <RoomIntro roomData={data} room_name={data.room_name} />}
      {data && <RoomSpecial roomData={data} />}
      <div
        className={css.address}
      >{`${data.room_name}의 주소는 [ ${data.address} ] 입니다.`}</div>
      {data && <FAQ roomData={data} />}
    </div>
  );
}
export default Detail;

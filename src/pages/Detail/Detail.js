import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import DetailBannerSlider from '../../components/DetailBannerSlider/DetailBannerSlider';
import Like from '../../components/Like/Like';
import RoomInfoSlider from './RoomInfoSlider';
import RoomIntro from './RoomIntro';
import RoomSpecial from './RoomSpecial';
import css from './Detail.module.scss';
import FAQ from './FAQ/FAQ';
function Detail() {
  const [data, setData] = useState([]);
  let { id } = useParams();

  useEffect(() => {
    fetch(`http://192.168.1.6:10010/rooms/${id}`, {
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

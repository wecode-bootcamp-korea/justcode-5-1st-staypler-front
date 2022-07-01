import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReservationSlider from '../../components/ReservationSlider/ReservationSlider';
import ReservationHeader from './ReservationHeader';

import css from './Reservation.module.scss';

function Reservation() {
  const { roomid } = useParams();
  const [data, setData] = useState({});
  useEffect(() => {
    fetch(`http://192.168.1.6:10010/rooms/${roomid}/room`, {
      method: 'GET',
      headers: {
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

  // console.log(data);
  return (
    <div className={css.container}>
      <ReservationHeader roomid={roomid} roomname={data?.room_name} />
      {data && (
        <ReservationSlider
          roomid={roomid}
          data={data}
          imageLength={data.images?.length}
        />
      )}
    </div>
  );
}

export default Reservation;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReservationSlider from './components/ReservationSlider/ReservationSlider';
import ReservationHeader from './components/ReservationHeader/ReservationHeader';
import { BASEURL } from '../../ApiOrigin';
import PageHeader from '../../components/PageHeader/PageHeader';

import css from './Reservation.module.scss';

function Reservation() {
  const { roomid } = useParams();
  const [data, setData] = useState({});
  useEffect(() => {
    fetch(`${BASEURL}/rooms/${roomid}/room`, {
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

  return (
    <div className={css.container}>
      <PageHeader
        pageTitleEN="BOOKING"
        pageTitleKO=""
        url={`/reservation/${roomid}`}
      />
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

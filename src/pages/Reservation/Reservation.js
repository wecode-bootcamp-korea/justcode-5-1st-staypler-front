import React from 'react';
import { useParams } from 'react-router-dom';
import ReservationSlider from '../../components/ReservationSlider/ReservationSlider';

import css from './Reservation.module.scss';

function Reservation() {
  const { roomid } = useParams();
  return (
    <div className={css.container}>
      <ReservationSlider roomid={roomid} />
    </div>
  );
}

export default Reservation;

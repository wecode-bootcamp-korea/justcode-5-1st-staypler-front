import React from 'react';
import ReservationSlider from '../../components/ReservationSlider/ReservationSlider';

import css from './Reservation.module.scss';

function Reservation() {
  return (
    <div className={css.container}>
      <ReservationSlider />
    </div>
  );
}

export default Reservation;

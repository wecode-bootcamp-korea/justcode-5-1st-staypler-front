import React, { useState, useEffect, useRef } from 'react';
import css from './ReservationHeader.module.scss';
import { Link } from 'react-router-dom';
import { MdKeyboardArrowDown } from 'react-icons/md';
import WhenModalForReservation from '../../../../components/WhenModal/WhenModalForReservation';
function ReservationHeader({ roomid, roomname }) {
  const [modalActive, setModalActive] = useState(0);
  const [reservatinStart, setStart] = useState();
  const [reservatinEnd, setEnd] = useState();

  const [price, setPrice] = useState('');
  const modalWhenRef = useRef();
  const openModal = () => setModalActive(1);
  const closeModal = () => setModalActive(0);

  // 모달 ON/OFF 상태 관리
  useEffect(() => {
    if (modalActive === 1) {
      modalWhenRef.current.style.display = 'block';
    } else {
      modalWhenRef.current.style.display = 'none';
    }
  }, [modalActive]);

  return (
    <div className={css.container}>
      <div className={css.header}>
        <div className={css.bookingRow}>
          <div className={css.name}>{roomname}</div>
          <div className={css.bookingDate} onClick={openModal}>
            날짜를 선택해주세요.
            <MdKeyboardArrowDown size={20} />
          </div>
          {price ? (
            <Link
              to={`/payment?start_date=${reservatinStart}&end_date=${reservatinEnd}&room_id=${roomid}`}
            >
              <div className={css.bookingBtn}>
                ￦{price.toLocaleString('ko-KR')} 결제하기
              </div>
            </Link>
          ) : (
            <div className={css.bookingBtn}>결제하기</div>
          )}
        </div>
      </div>
      <WhenModalForReservation
        modalRef={modalWhenRef}
        closeModal={closeModal}
        roomid={roomid}
        setPrice={setPrice}
        setStart={setStart}
        setEnd={setEnd}
      />
    </div>
  );
}
export default ReservationHeader;

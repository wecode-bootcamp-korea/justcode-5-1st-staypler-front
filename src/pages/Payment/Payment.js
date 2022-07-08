import React, { useState, useEffect, useRef } from 'react';
import css from './Payment.module.scss';
import { useParams, useLocation, Link } from 'react-router-dom';
import BlackButton from '../../components/BlackButton/BlackButton';
import WhenModal from '../../components/WhenModal/WhenModal';
import { VscChevronDown } from 'react-icons/vsc';
import { BASEURL } from '../../ApiOrigin';
import PageHeader from '../../components/PageHeader/PageHeader';
// import Modal from '../../components/Modal/Modal';

function Payment() {
  const location = useLocation(); // 굳구ㄸ!!ㅋㅋㅋㅋㅋ
  const roomId = location.search.substr(location.search.indexOf('room_id') + 8);

  //데이터
  const [roomdata, setRoomData] = useState();
  const [reservationData, setReservationData] = useState(); //예약 페이지에서 받아오는
  const [modalActive, setModalActive] = useState(0);
  // const [openOkModal, setOpenOkModal] = useState(false);
  // const [modalText, setModalText] = useState('');
  const modalWhenRef = useRef();
  // const navigate = useNavigate();

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

  const [inputs, setInputs] = useState({
    user_id: '',
    start_date: '',
    end_date: '',
    nights: '',
    price: '',
    total_price: '',
    type: '',
    roomid: roomId,
    room_type_name: '',
    number: '',
    user_name: '',
    phone_number: '',
    email: '',
  });

  const {
    room_id,
    user_id,
    start_date,
    end_date,
    nights,
    price,
    number,
    user_name,
    phone_number,
    email,
  } = inputs;

  useEffect(() => {
    fetch(`${BASEURL}/rooms/room/bookings${location.search}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('login-token')}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => {
        setRoomData(res.data[0]);
        console.log(res.data[0]);
        fetch(
          `${BASEURL}/payment?start_date=${start_date}&end_date=${end_date}&room_id=${roomId}`,
          {
            method: 'GET',
          }
        )
          .then(res => res.json())
          .then(res => {
            setReservationData(res.data[0]);
            console.log(res.data[0]);
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  }, [roomId]);

  const onChange = e => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출, input에 들어간 내용
    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤
      [name]: value, // name 키를 가진 값을 value 로 설정
    });
    console.log(inputs);
  };

  // async function savePaymentBtn() {
  //   await fetch(`${BASEURL}/payment`, {
  //     method: 'PUT',
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem('login-token')}`,
  //       'Content-Type': 'application/json',
  //       Accept: 'application/json',
  //     },
  //     body: JSON.stringify({
  //       user_name: setInputs.user_name,
  //       phone_number: setInputs.phone_number,
  //       email: setInputs.email,
  //     }),
  //   }).then(res => {
  //     console.log(res.json());
  //     if (res.status === 200) {
  //       setOpenOkModal(true);
  //       setModalText('예약이 완료되었습니다.');
  //     } else {
  //       setOpenOkModal(true);
  //       setModalText('정보가 올바른 형식으로 입력되지 않았습니다.');
  //     }
  //   });
  // }

  return (
    <div className={css.container}>
      <PageHeader pageTitleEN="BOOKING" pageTitleKO="" url="/payment" />
      <div className={css.subTitle}>
        <div className={css.subLeft}>
          <h1>{roomdata?.rooms_name}</h1>
        </div>
        <div className={css.subCenter} onClick={openModal}>
          날짜를 선택해주세요.
        </div>
        <VscChevronDown className={css.modalIcon} size="20" />
        <div className={css.subRight}>
          <h1>₩{roomdata?.total_price}</h1>
        </div>
      </div>
      <div className={css.bookingWrapper}>
        <div className={css.bookingTitle}>
          <h2>RESERVATIONS</h2>
        </div>

        <div className={css.bookingList}>
          <div className={css.bookingLeft}>
            <p className={css.listText}>예약 스테이</p>
          </div>
          <div className={css.bookingRight}>
            <p>
              {roomdata?.room_name} / {roomdata?.type}
            </p>
          </div>
        </div>

        <div className={css.bookingList}>
          <div className={css.bookingLeft}>
            <p className={css.listText}>예약일</p>
          </div>
          <div className={css.bookingRight}>
            <p>2022-07-03 ~ 2022-07-04 1박</p>
          </div>
        </div>

        <div className={css.bookingList}>
          <div className={css.bookingLeft}>
            <p className={css.listText}>이름</p>
          </div>
          <div className={css.bookingRight}>
            <input
              name="name"
              onChange={onChange}
              value={roomdata?.user_name}
            />
          </div>
        </div>

        <div className={css.bookingList}>
          <div className={css.bookingLeft}>
            <p className={css.listText}>휴대전화</p>
          </div>
          <div className={css.bookingRight}>
            <input
              name="phoneNumber"
              onChange={onChange}
              value={roomdata?.phone_number}
            />
          </div>
        </div>

        <div className={css.bookingList}>
          <div className={css.bookingLeft}>
            <p className={css.listText}>이메일</p>
          </div>
          <div className={css.bookingRight}>
            <input name="email" onChange={onChange} value={roomdata?.email} />
          </div>
        </div>

        <div className={css.bookingList}>
          <div className={css.bookingLeft}>
            <p className={css.listText}>인원 (최대 {roomdata?.max_limit}명)</p>
          </div>
          <div className={css.bookingRight}>
            <select name="number" onChange={onChange} value={roomdata?.number}>
              {roomdata &&
                [...Array(roomdata?.max_limit)].map((n, index) => {
                  return (
                    <option value={String(index + 1)}>{index + 1}명</option>
                  );
                })}
            </select>
          </div>
        </div>

        <div className={css.bookingList}>
          <div className={css.bookingLeft}>
            <p className={css.listText}>동의사항</p>
          </div>
          <div className={css.bookingRight}>
            <div className={css.agreeWrap}>
              <div className={css.must}>
                <h4>금연안내</h4>
              </div>
              <p>
                숙소 내 모든 구역에서는 절대 금연(전자담배 포함)입니다. 위반 시
                즉각 퇴실 조치와 추가 청소비를 청구합니다.
              </p>
              <div className={css.agreeBox}>
                <p>필수</p>
                <input className={css.checkInput} type="checkbox" id="1" />
                <p>동의</p>
              </div>
            </div>
            <div className={css.agreeWrap}>
              <div className={css.must}>
                <h4>변상규정</h4>
              </div>
              <p>
                숙소 내 기물 파손 및 침구 오염 등이 발생할 경우 배상비용이
                청구됩니다.
              </p>
              <div className={css.agreeBox}>
                <p>필수</p>
                <input className={css.checkInput} type="checkbox" id="1" />
                <p>동의</p>
              </div>
            </div>
            <div className={css.agreeWrap}>
              <div className={css.must}>
                <h4>조리 및 반입 불가 음식</h4>
              </div>
              <p>
                바베큐, 육류(삼겹살), 생선 등 냄새가 심한 음식의 반입 및 조리는
                불가합니다. 간단한 취사만 가능합니다.
              </p>
              <div className={css.agreeBox}>
                <p>필수</p>
                <input className={css.checkInput} type="checkbox" id="1" />
                <p>동의</p>
              </div>
            </div>
          </div>
        </div>

        <div className={css.bookingList}>
          <div className={css.bookingLeft}>
            <p className={css.listText}>예상 결제금액</p>
          </div>
          <div className={css.bookingRightPrice}>
            <p>
              <span className={css.fontgray}>객실 요금</span>
              <span style={{ marginLeft: '10px' }}>
                {' '}
                {roomdata?.room_name} / {roomdata?.type} ₩{roomdata?.price}*
                {roomdata?.nights} 박
              </span>
              <span style={{ marginLeft: 'auto' }} className={css.fontgray}>
                ₩{roomdata?.total_price}
              </span>
            </p>
            <div className={css.bookingPrice}>
              <h1>₩{roomdata?.total_price}</h1>
            </div>
          </div>
        </div>
        <Link to="/" className={css.btnWrapper}>
          <BlackButton className={css.searchBtn} content="결제하기" />
        </Link>
      </div>
      <WhenModal modalRef={modalWhenRef} closeModal={closeModal} />
    </div>
  );
}

export default Payment;

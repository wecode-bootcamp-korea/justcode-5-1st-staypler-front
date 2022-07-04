import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './../components/Header/Header';
import Footer from './../components/Footer/Footer';
import Home from './Home/Home';
import Login from './Login/Login';
import Signup from './Signup/Signup';
import Findstay from './Findstay/Findstay';
import Detail from './Detail/Detail';
import Reservation from './Reservation/Reservation';
import Payment from './Payment/Payment';
import Mypage from './Mypage/Mypage';
import MypageStayList from './Mypage/components/MypageStayList/MypageStayList';
import MypageEditInformation from './Mypage/components/MypageEditInformation/MypageEditInformation';
import MypageroomSlider from './Mypage/components/MypageroomSlider/MypageroomSlider';
import { BASEURL } from '../ApiOrigin';

function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/findstay" element={<Findstay />} />
        <Route path="/reservation/:roomid" element={<Reservation />} />
        <Route path="/rooms/:id" element={<Detail />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/mypage" element={<Mypage />}>
          <Route
            path=""
            element={
              <>
                <MypageroomSlider
                  title="다가올 예약"
                  API={`${BASEURL}/mypage/like`}
                />
                <MypageroomSlider
                  title="관심 스테이"
                  API={`${BASEURL}/mypage/like`}
                />
              </>
            }
          />
          <Route
            path="likestay"
            element={<MypageStayList API={`${BASEURL}/mypage/like`} />}
          />
          <Route
            path="reservation"
            element={<MypageStayList API={`${BASEURL}/mypage/bookings`} />}
          />
          <Route path="edit" element={<MypageEditInformation />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default Router;

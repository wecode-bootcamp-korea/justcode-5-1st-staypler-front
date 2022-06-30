import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './Home/Home';
import Login from './Login/Login';
import Signup from './Signup/Signup';
import Findstay from './Findstay/Findstay';
import Detail from './Detail/Detail';
import Reservation from './Reservation/Reservation';
import Payment from './Payment/Payment';
import Mypage from './Mypage/Mypage';
import MypageStayList from './Mypage/components/MypageStayList';
import MypageEditInformation from './Mypage/components/MypageEditInformation';
import MypageroomSlider from './Mypage/components/MypageroomSlider';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/findstay" element={<Findstay />} />
        <Route path="/rooms/:id" element={<Detail />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/mypage" element={<Mypage />}>
          <Route
            path=""
            element={
              <>
                <MypageroomSlider
                  title="다가올 예약"
                  API="http://192.168.1.4:10010/mypage/bookings"
                />
                <MypageroomSlider
                  title="관심 스테이"
                  API="http://192.168.1.4:10010/mypage/like"
                />
              </>
            }
          />
          <Route
            path="likestay"
            element={
              <MypageStayList API="http://192.168.1.4:10010/mypage/like" />
            }
          />
          <Route
            path="reservation"
            element={
              <MypageStayList API="http://192.168.1.4:10010/mypage/bookings" />
            }
          />
          <Route path="edit" element={<MypageEditInformation />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

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

function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/findstay" element={<Findstay />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default Router;

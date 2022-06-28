import React from 'react';
import css from './Footer.module.scss';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
import { SiNaver } from 'react-icons/si';

function Footer() {
  return (
    <div className={css.container}>
      <div className={css.footerLeft}>
        <div className={css.menu}>
          <p>ABOUT</p>
          <br />
          <p>4 POINT APPROACH</p>
          <br />
          <p>NEWSLETTER</p>
          <br />
          <p>CAREERS</p>
        </div>
      </div>

      <div className={css.footerDetail}>
        상호 : (주)스테이플러 &nbsp;&nbsp; 대표자 : 구씨
        <br />
        서울특별시 종로구 어쩌구로1길 12, 3층(서울동) &nbsp;&nbsp; TEL:
        1234-5678 &nbsp;&nbsp; summer@staypler.com
        <br />
        사업자등록번호: 123-45-67890&nbsp;&nbsp;통신판매업신고: 제1234-
        서울종로-05678호[사업자정보확인]
        <br />
        관광사업자등록 : 일반여행업 1234-56789호(종로구청)
      </div>
      <div className={css.copyRight}>Copyright©STAYPLER</div>

      <div className={css.footerRight}>
        <div className={css.logo}>
          S T A Y <br />P L E R
        </div>
        <div className={css.icon}>
          <FaFacebookF />
          &nbsp;
          <FaInstagram />
          &nbsp;
          <SiNaver />
          &nbsp;
          <FaYoutube />
        </div>
      </div>
    </div>
  );
}

export default Footer;

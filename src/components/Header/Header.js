import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import css from './Header.module.scss';
import { MdOutlineLocationOn } from 'react-icons/md';
import { BsCalendar4 } from 'react-icons/bs';
import { BsToggleOn } from 'react-icons/bs';
import WhereModal from '../WhereModal/WhereModal';
import WhenModal from '../WhenModal/WhenModal';

function Header() {
  const [modalActive, setModalActive] = useState(0);
  const modalWhereRef = useRef();
  const modalWhenRef = useRef();

  const openModal1 = () => setModalActive(1);
  const openModal2 = () => setModalActive(2);

  const closeModal = () => setModalActive(0);

  // 모달 ON/OFF 상태 관리
  useEffect(() => {
    if (modalActive === 1) {
      modalWhereRef.current.style.display = 'block';
    } else if (modalActive === 2) {
      modalWhenRef.current.style.display = 'block';
    } else {
      modalWhenRef.current.style.display = 'none';
      modalWhereRef.current.style.display = 'none';
    }
  }, [modalActive]);

  // 모달 ON 되었을 때, 외부 스크롤 방지 관리
  useEffect(() => {
    if (modalActive) {
      document.body.style.cssText = `position: fixed; top: -$(window.scrollY)px; width: 100%;`;
    }
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    };
  }, [modalActive]);

  return (
    <>
      <div className={css.container}>
        <nav className={css.nav}>
          <Link to="/" className={css.logo}>
            S T A Y <br /> P L E R
          </Link>
          <div className={css.centerMenu}>
            <div id="modal1" className={css.modalBtn} onClick={openModal1}>
              <div>
                <MdOutlineLocationOn className={css.modalIcon} size="26" />
              </div>
              <p id="modalOpen1" className={css.modalText}>
                어디로떠날까요?
              </p>
            </div>
            <div id="modal2" className={css.modalBtn} onClick={openModal2}>
              <BsCalendar4 className={css.modalIcon} size="26" />
              <p id="modalOpen2" className={css.modalText}>
                언제떠날까요?
              </p>
            </div>
          </div>
          <div className={css.sideMenu}>
            <Link to="/Detail" className={css.menuList}>
              FIND STAY
            </Link>
            <Link to="/" className={css.menuList}>
              PROMOTION
            </Link>
            <Link to="/" className={css.menuList}>
              JOURNAL
            </Link>
            <Link to="/" className={css.menuList}>
              PRE-ORDER
            </Link>
            <Link to="/" className={css.menuList}>
              LOGIN
            </Link>
            <Link to="/" className={css.menuList}>
              <BsToggleOn size="23" />
            </Link>
          </div>
        </nav>
      </div>
      <WhereModal modalRef={modalWhereRef} closeModal={closeModal} />
      <WhenModal modalRef={modalWhenRef} closeModal={closeModal} />
    </>
  );
}

export default Header;

import React, { useEffect, useState } from 'react';
import { FiHeart } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import style from './Like.module.scss';

function Like(props) {
  const [isLike, setIsLike] = useState(false);

  function clickHeart() {
    setIsLike(!isLike);
    // let token = sessionStorage.getItem('login-token') || '';
    fetch('http://localhost:3000/data/roomIntro.json', {
      method: 'POST',
      // headers: {
      //   Authorization: token,
      // },
    }).then(res => res.json());
  }

  return (
    <div>
      <button onClick={clickHeart}>
        {isLike ? (
          <FiHeart size="23" color="#d2d2d2" className={style.heart} />
        ) : (
          <FaHeart size="23" color="#d2d2d2" className={style.heart} />
        )}
      </button>
    </div>
  );
}
export default Like;

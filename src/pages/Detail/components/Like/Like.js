import React, { useEffect, useState } from 'react';
import { FiHeart } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import style from './Like.module.scss';
import { BASEURL } from '../../../../ApiOrigin';

function Like({ id, isLike }) {
  const [heart, setHeart] = useState();

  useEffect(() => {
    console.log('LIKE', isLike);
    setHeart(isLike);
  }, []);

  const HeartBtn = () => {
    fetch(`${BASEURL}/rooms/${id}/like`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('login-token')}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(res => {
        setHeart(res.isLike);
      });
  };

  return (
    <div>
      <button onClick={HeartBtn}>
        {heart ? (
          <FaHeart size="23" color="#d2d2d2" className={style.heart} />
        ) : (
          <FiHeart size="23" color="#d2d2d2" className={style.heart} />
        )}
      </button>
    </div>
  );
}
export default Like;

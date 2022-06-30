import React, { useEffect, useState } from 'react';
import { FiHeart } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import style from './Like.module.scss';

function Like(props) {
  const [isLike, setIsLike] = useState(false);
  const [likeTable, setLikeTable] = useState(null);

  useEffect(() => {
    setIsLike(!isLike);
    fetch('http://192.168.1.4:10010/mypage', {
      method: 'GET',
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
      .then(res => setLikeTable(res));
  }, []);

  return (
    <div>
      <button>
        {isLike ? (
          <FiHeart
            size="23"
            color="#d2d2d2"
            className={style.heart}
            onClick={() => setIsLike(prev => !prev)}
          />
        ) : (
          <FaHeart
            size="23"
            color="#d2d2d2"
            className={style.heart}
            onClick={() => setIsLike(prev => !prev)}
          />
        )}
      </button>
    </div>
  );
}
export default Like;

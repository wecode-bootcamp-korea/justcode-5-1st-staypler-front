import React, { useEffect, useState } from 'react';
import { FiHeart } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import style from './Like.module.scss';

function Like(props) {
  const [isLike, setIsLike] = useState(false);
  const [likeTable, setLikeTable] = useState(null);

  useEffect(() => {
    setIsLike(!isLike);
    // let token = localStorage.getItem('login-token') || '';
    fetch('http://localhost:3000/data/roomIntro.json', {
      method: 'GET',
      // headers: {
      //   Authorization: token,
      // },
    })
      .then(res => res.json())
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

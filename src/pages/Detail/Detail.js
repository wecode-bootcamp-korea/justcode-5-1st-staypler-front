import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DetailBannerSlider from '../../components/DetailBannerSlider/DetailBannerSlider';

import css from './Detail.module.scss';

function Detail() {
  const [data, setData] = useState([]);
  let { id } = useParams();

  useEffect(() => {
    fetch(`http://192.168.1.4:10010/rooms/${id}`)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(fetchdata => {
        setData(fetchdata.data[0]);
      });
  }, []);

  return (
    <div className={css.container}>
      {data && <DetailBannerSlider roomData={data} />}
    </div>
  );
}

export default Detail;

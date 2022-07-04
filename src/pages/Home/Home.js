import React from 'react';
import MainBannerSlider from './components/MainBannerSlider/MainBannerSlider';
import Main3imagesSlider from './components/Main3imagesSlider/Main3imagesSlider';
import MainPromotionSlider from './components/MainPromotionSlider/MainPromotionSlider';
import css from './Home.module.scss';

function Home() {
  return (
    <div className={css.container}>
      <MainBannerSlider />
      <MainPromotionSlider />
      <Main3imagesSlider />
    </div>
  );
}

export default Home;

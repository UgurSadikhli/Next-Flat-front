import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import styles from './Carousel.module.css';

export default function Carousel({ images }) {
  if (!images || images.length === 0) return null;

  return (
    <Swiper
      spaceBetween={30}
      pagination={{
        clickable: true,
        renderBullet: (index, className) => {
          return (
            `<span class="${className}" style="background: ${index === 0 ? 'goldenrod' : 'goldenrod'}"></span>`
          );
        },
      }}
      navigation={{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }}
      loop={true}
      modules={[Pagination, Navigation]}
      className={styles.mySwiper} 
      style={{
        borderRadius: '15px', 
        overflow: 'hidden', 
      }}
    >
      {images.map((image, index) => (
        <SwiperSlide key={index} style={{ borderRadius: '15px' }}> 
          <img 
            src={image} 
            alt={`Slide ${index + 1}`} 
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: '15px', 
            }} 
          />
        </SwiperSlide>
      ))}

      <div className="swiper-button-prev" style={{ color: 'goldenrod' }}></div>
      <div className="swiper-button-next" style={{ color: 'goldenrod' }}></div>
    </Swiper>
  );
}

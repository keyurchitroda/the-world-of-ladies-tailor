"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

const CoverSwiper = () => {
  return (
    <Swiper
      slidesPerView={1}
      loop={true}
      spaceBetween={30}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination, Navigation]}
      navigation
      className="mySwiper"
      autoplay={true}
    >
      <SwiperSlide>
        <img src="/cover1.jpg" className="object-cover h-48 w-96" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="/cover2.jpg" height={100} />
      </SwiperSlide>
    </Swiper>
  );
};

export default CoverSwiper;

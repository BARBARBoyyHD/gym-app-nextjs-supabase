"use client";

import { Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";

export default function Testimony() {
  return (
    <section className="my-24">
      <div className="max-w-6xl mx-auto">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          // Hilangkan pagination & scrollbar → jangan import & jangan gunakan
        >
          <SwiperSlide>
            <div className="text-white text-center w-full px-6 md:w-2/3 mx-auto flex items-center justify-center flex-col relative">
              <span className="absolute top-0 text-8xl text-brand">"</span>
              <p className="italic font-medium leading-8 text-xl tracking-normal mt-14">
                "Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Corrupti velit tempora et. Illo velit odit architecto! Doloribus
                iure, amet autem velit cupiditate quaerat quidem
                necessitatibus!"{" "}
              </p>
              <span className="font-bold text-lg mt-8 mb-4">Daniel </span>
              <p className="text-white/70">September 22, 2025</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="text-white text-center w-full px-6 md:w-2/3 mx-auto flex items-center justify-center flex-col relative">
              <span className="absolute top-0 text-8xl text-brand">"</span>
              <p className="italic font-medium leading-8 text-xl tracking-normal mt-14">
                "Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Corrupti velit tempora et. Illo velit odit architecto! Doloribus
                iure, amet autem velit cupiditate quaerat quidem
                necessitatibus!"{" "}
              </p>
              <span className="font-bold text-lg mt-8 mb-4">Alexander </span>
              <p className="text-white/70">December 03, 2025</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="text-white text-center w-full px-6 md:w-2/3 mx-auto flex items-center justify-center flex-col relative">
              <span className="absolute top-0 text-8xl text-brand">"</span>
              <p className="italic font-medium leading-8 text-xl tracking-normal mt-14">
                "Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Corrupti velit tempora et. Illo velit odit architecto! Doloribus
                iure, amet autem velit cupiditate quaerat quidem
                necessitatibus!"{" "}
              </p>
              <span className="font-bold text-lg mt-8 mb-4">Bradley </span>
              <p className="text-white/70">December 06, 2025</p>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
}

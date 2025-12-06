"use client";

import { Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import ButtonBrand from "../button/ButtonBrand";

export default function Contact() {
  return (
    <section className="mb-28">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 mb-20">
          <div>
            <h2 className="text-5xl font-bold uppercase mb-3">
              Let's Get started
            </h2>
            <p className="my-6">Fill out the form or contact us directly</p>
            <p className="text-white/70 mb-4 leading-relaxed">
              In order to offer you the best pricing plan, our managers will
              contact you as soon as possible and ask some questions about your
              health, fitness goals, expectations, and your favorite sports
              activities
            </p>
            <ButtonBrand title="Get free consultation" />
          </div>
          <div className="space-y-6 mx-auto ">
            <div>
              <h5 className="font-bold text-2xl uppercase mb-2">Address</h5>
              <p className="text-white/70">
                Jl. Fitness Raya No. 20 Kota Bandung, <br /> Indonesia 40123
              </p>
            </div>
            <div>
              <h5 className="font-bold text-2xl uppercase mb-2">Phone</h5>
              <p className="text-white/70">+62 812-3456-7890</p>
            </div>
            <div>
              <h5 className="font-bold text-2xl uppercase mb-2">E-mail</h5>
              <p className="text-white/70">info@liftup.com</p>
            </div>
            <div>
              <h5 className="font-bold text-2xl uppercase mb-2">
                Operational Hours
              </h5>
              <ul className="text-white/70 space-y-1">
                <li>Mon-Fri 8:00AM - 09:00PM</li>
                <li>Sat 8:00AM - 08:00PM</li>
              </ul>
            </div>
          </div>
        </div>
        <Swiper
          modules={[Navigation, Autoplay]}
          slidesPerView={3}
          spaceBetween={0}
          navigation
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            0: {
              slidesPerView: 1, // mobile
            },
            768: {
              slidesPerView: 2, // optional tablet
            },
            1024: {
              slidesPerView: 3, // desktop
            },
          }}
          className="w-full"
        >
          <SwiperSlide>
            <div className="w-[355px] h-[355px] bg-gray-700 mx-auto"></div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="w-[355px] h-[355px] bg-gray-700 mx-auto"></div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="w-[355px] h-[355px] bg-gray-700 mx-auto"></div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-[355px] h-[355px] bg-gray-700 mx-auto"></div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-[355px] h-[355px] bg-gray-700 mx-auto"></div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-[355px] h-[355px] bg-gray-700 mx-auto"></div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-[355px] h-[355px] bg-gray-700 mx-auto"></div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
}

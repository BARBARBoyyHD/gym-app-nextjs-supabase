"use client";

import Image from "next/image";
import { useState } from "react";
import ButtonBrand from "../button/ButtonBrand";
export default function Classes() {
  const [openStates, setOpenStates] = useState<boolean[]>(Array(4).fill(false));

  const classesData = [
    {
      title: "Boxing",
      desc: "Improve strength, conditioning, and coordination with high-intensity boxing classes led by our professional trainers.",
    },
    {
      title: "Yoga",
      desc: "Enhance flexibility, reduce stress, and strengthen your core through mindful yoga sessions suitable for all levels.",
    },
    {
      title: "Aerobics",
      desc: "A high-energy workout that improves cardio, coordination, and overall endurance.",
    },
    {
      title: "Crossfit",
      desc: "Boost endurance and build muscle with a variety of high-intensity functional exercises.",
    },
    {
      title: "Pilates",
      desc: "Strengthen your core, improve posture, and increase mobility through controlled, low-impact movements.",
    },
    {
      title: "HIIT",
      desc: "A fast-paced interval workout designed to maximize calorie burn and improve cardiovascular endurance in a short time.",
    },
  ];

  const toggle = (index: number) => {
    // Toggle only the clicked dropdown, leaving others unchanged
    setOpenStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  return (
    <section>
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-3">
            Our <span className="text-brand">Classes</span>
          </h2>
          <p className="text-white/70">
            Whatever your fitness goals are, our dedicated fitness instructors
            will help you achieve them.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {classesData.slice(0, 4).map((item, index) => {
            // Auto-generate image name
            const imageName = item.title.toLowerCase() + ".jpg";

            return (
              <div key={index} className="space-y-4">
                {/* Image */}
                <div className="relative w-full h-80 overflow-hidden bg-gray-800">
                  <Image
                    src={`/images/${imageName}`}
                    alt={item.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                  />
                </div>

                {/* Title + Dropdown */}
                <div>
                  <div
                    onClick={() => toggle(index)}
                    className="flex justify-between items-center cursor-pointer"
                  >
                    <h5 className="text-2xl font-semibold color-brand">
                      {item.title}
                    </h5>
                    <span className="text-3xl font-bold text-brand transition-transform">
                      {openStates[index] ? "-" : "+"}
                    </span>
                  </div>

                  {/* Content */}
                  <div
                    className={`transition-all duration-500 overflow-hidden ${
                      openStates[index] ? "max-h-96 mt-3" : "max-h-0"
                    }`}
                  >
                    <p className="text-white/70 leading-7">{item.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="text-center">
          <a href="/classes" className="inline-block text-center">
            <ButtonBrand title="See more" />
          </a>
        </div>
      </div>
    </section>
  );
}

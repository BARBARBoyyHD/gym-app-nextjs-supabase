"use client";

import { useState } from "react";

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
      title: "Zumba",
      desc: "A fun and energetic dance workout designed to burn calories while enjoying upbeat music.",
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
          <h2 className="text-4xl font-bold mb-3">Our Classes</h2>
          <p className="text-white/70">
            Whatever your fitness goals are, our dedicated fitness instructors
            will help you achieve them.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 space-x-6 space-y-6">
          {classesData.slice(0, 4).map((item, index) => (
            <div key={index}>
              <div className="bg-gray-800 w-full h-80 mb-6"></div>

              <div>
                {/* Title + Icon */}
                <div
                  onClick={() => toggle(index)}
                  className="flex justify-between items-center cursor-pointer"
                >
                  <h5 className="text-2xl font-semibold color-brand">
                    {item.title}
                  </h5>
                  <span className="text-3xl font-bold text-brand select-none transform transition-transform duration-300">
                    {openStates[index] ? "-" : "+"}
                  </span>
                </div>

                {/* Dropdown (With Smoother Animation) */}
                <div
                  className={`transition-all duration-500 ease-in-out overflow-hidden ${
                    openStates[index] ? "max-h-96  mt-4" : "max-h-0"
                  }`}
                >
                  <p className="text-white/70 leading-7">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

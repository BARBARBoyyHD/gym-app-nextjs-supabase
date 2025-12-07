import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

import { GiRunningShoe } from "react-icons/gi";
import { LiaSwimmingPoolSolid } from "react-icons/lia";
import { RiArchiveDrawerLine } from "react-icons/ri";
import { CiDumbbell } from "react-icons/ci";
import { PiBabyLight } from "react-icons/pi";
import { PiFlowerLotusLight } from "react-icons/pi";
export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="max-w-6xl mx-auto px-4 mt-24">
          <div className=" grid grid-cols-1 md:grid-cols-5 gap-10 place-items-center space-y-5">
            <div className="md:col-span-3">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                About Lift<span className="text-brand">Up</span>
              </h1>
              <p className="text-lg text-white/70 leading-7">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere
                corrupti, neque, ipsa qui nesciunt quod nostrum tempora
                obcaecati reprehenderit harum consequatur officiis. Iste facere,
                excepturi dicta recusandae accusantium dolorem minima.
              </p>
            </div>
            <div className="relative w-80 h-80 md:col-span-2">
              <div
                className="w-64 h-64 bg-gray-800 rounded-xl absolute top-0 left-0 
                  transform -translate-x-8 -translate-y-8"
              ></div>
              <div
                className="w-64 h-64 bg-gray-700 rounded-xl absolute bottom-0 right-0 
                  transform translate-x-8 translate-y-8"
              ></div>
            </div>
          </div>
        </section>
        <section className="max-w-6xl mx-auto px-4 my-32">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Our Facility
            </h2>
            <p className="text-lg text-white/70 leading-7 mt-6">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor
              voluptas tempore atque sequi asperiores eveniet debitis
              consequatur. Deserunt nobis facere accusantium non reiciendis
              optio.
            </p>
          </div>
          <h5 className="text-3xl md:text-3xl font-bold uppercase text-brand text-center mt-18">
            Our Facility offers:
          </h5>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-16">
            <div className="flex flex-col items-start gap-4">
              <RiArchiveDrawerLine size={60} className="text-brand" />
              <h3 className="text-white font-semibold text-xl uppercase">
                Locker Rooms
              </h3>
              <p className="text-white/70 leading-relaxed">
                Each box is monitored so you can choose your own locker and get
                your own code of entry.
              </p>
            </div>
            <div className="flex flex-col items-start gap-4">
              <CiDumbbell size={60} className="text-brand" />
              <h3 className="text-white font-semibold text-xl uppercase">
                Training Equipment
              </h3>
              <p className="text-white/70 leading-relaxed">
                Achieve your fitness goals effectively with our range of
                state-of-the-art equipment.
              </p>
            </div>
            <div className="flex flex-col items-start gap-4">
              <GiRunningShoe size={60} className="text-brand" />
              <h3 className="text-white font-semibold text-xl uppercase">
                Indoor Track
              </h3>
              <p className="text-white/70 leading-relaxed">
                We have a track for those who want to make cardio workouts at
                any time. Run Forest, run!
              </p>
            </div>
            <div className="flex flex-col items-start gap-4">
              <LiaSwimmingPoolSolid size={60} className="text-brand" />
              <h3 className="text-white font-semibold text-xl uppercase">
                Lap Pool
              </h3>
              <p className="text-white/70 leading-relaxed">
                We are proud to offer two spacious lap pools with four lanes and
                20 yards in length
              </p>
            </div>
            <div className="flex flex-col items-start gap-4">
              <PiBabyLight size={60} className="text-brand" />
              <h3 className="text-white font-semibold text-xl uppercase">
                Child Care
              </h3>
              <p className="text-white/70 leading-relaxed">
                We provide a safe and secure children's area for children from 6
                weeks to 12 years of age.
              </p>
            </div>
            <div className="flex flex-col items-start gap-4">
              <PiFlowerLotusLight size={60} className="text-brand" />
              <h3 className="text-white font-semibold text-xl uppercase">
                SPA/Massage Therapy
              </h3>
              <p className="text-white/70 leading-relaxed">
                We have a few spa packages for you to choose from. Relax a bit
                after you training at LiftUp!
              </p>
            </div>
          </div>
        </section>
        <section className="max-w-6xl mx-auto px-4 my-24">
          <div className="flex flex-wrap">
            <div className="flex-1 flex justify-start">
              <div className="bg-gray-800 w-[468px] h-[600px]"></div>
            </div>
            <div className="flex-1 flex items-center flex-wrap">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold uppercase">
                  Our <span className="text-brand">Mission</span>
                </h2>
                <p className="text-lg my-6">
                  FitB was conceived as a means to the end. Our coaches have
                  experience in training professionals in a variety of demanding
                  sports.
                </p>
                <p className="text-lg text-white/70 mb-4 leading-relaxed">
                  Our mission is to help you succeed. Whether your goal is to be
                  extremely fit while balancing family life and work, or to
                  climb the Mount Everest, FitB is the catalyst to get you
                  there.
                </p>
                <p className="text-lg text-white/70 mb-4 leading-relaxed">
                  We believe in hard work, community, and progress. Come try a
                  free session and see why FitB is the place to help you reach
                  your fitness goals!
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

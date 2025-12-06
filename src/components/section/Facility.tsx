import { TbTreadmill } from "react-icons/tb";
import { TbYoga } from "react-icons/tb";
import { TbUserHeart } from "react-icons/tb";
import { TbCurrencyDollar } from "react-icons/tb";

export default function Facility() {
  return (
    <section className="my-32">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-10 px-4">
        {/* Facility 1 */}
        <div className="flex flex-col items-start gap-4">
          <TbTreadmill size={60} className="text-brand" />
          <h3 className="text-white font-semibold text-lg">
            FULLY EQUIPPED GYM
          </h3>
          <p className="text-white/70 leading-relaxed">
            Our spacious gym is suitable for group lessons and has all the
            necessary equipment.
          </p>
        </div>

        {/* Facility 2 */}
        <div className="flex flex-col items-start gap-4">
          <TbYoga size={60} className="text-brand" />
          <h3 className="text-white font-semibold text-lg">
            SELECT YOUR ACTIVITY
          </h3>
          <p className="text-white/70 leading-relaxed">
            Choose the activities which suit you and don't pay for the
            unnecessary ones.
          </p>
        </div>

        {/* Facility 3 */}
        <div className="flex flex-col items-start gap-4">
          <TbUserHeart size={60} className="text-brand" />
          <h3 className="text-white font-semibold text-lg">OPEN FOR ANYONE</h3>
          <p className="text-white/70 leading-relaxed">
            Whatever your fitness level is, you can attend our fitness classes
            at any time.
          </p>
        </div>

        {/* Facility 4 */}
        <div className="flex flex-col items-start gap-4">
          <TbCurrencyDollar size={60} className="text-brand" />
          <h3 className="text-white font-semibold text-lg">FLEXIBLE PRICES</h3>
          <p className="text-white/70 leading-relaxed">
            You can select a training plan, instructor, and schedule suitable
            for you.
          </p>
        </div>
      </div>
    </section>
  );
}

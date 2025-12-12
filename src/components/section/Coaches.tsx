import Image from "next/image";
import ButtonBrand from "../button/ButtonBrand";

export default function Coaches() {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
          Our <span className="text-brand">Coaches</span>
        </h2>
        <p className="text-white/70 text-center">
          Our team of highly trained and certified fitness instructors will help
          you set your goals.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 space-y-6 text-center mt-12 mb-7 gap-8">
          <div>
            <div className="relative bg-gray-800 h-[400px]">
              <Image
                src="/images/trainer-04.jpg"
                alt="Trainer Image"
                fill
                className="object-cover"
                priority
                sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
              />
            </div>
            <div className="mt-6">
              <h5 className="text-2xl font-semibold text-brand">Petersen</h5>
              <p className="text-white/70">Professional Trainer</p>
            </div>
          </div>
          <div>
            <div className="relative bg-gray-800 h-[400px]">
              <Image
                src="/images/trainer-03.jpg"
                alt="Trainer Image"
                fill
                className="object-cover object-top"
                priority
                sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
              />
            </div>
            <div className="mt-6">
              <h5 className="text-2xl font-semibold text-brand">Mary Grey</h5>
              <p className="text-white/70">Professional Trainer</p>
            </div>
          </div>
          <div>
            <div className="relative bg-gray-800 h-[400px]">
              <Image
                src="/images/trainer-06.jpg"
                alt="Trainer Image"
                fill
                className="object-cover object-top"
                priority
                sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
              />
            </div>
            <div className="mt-6">
              <h5 className="text-2xl font-semibold text-brand">Steve</h5>
              <p className="text-white/70">Professional Trainer</p>
            </div>
          </div>
        </div>
        <div className="text-center">
          <ButtonBrand title="See more" link="/coaches" />
        </div>
      </div>
    </section>
  );
}

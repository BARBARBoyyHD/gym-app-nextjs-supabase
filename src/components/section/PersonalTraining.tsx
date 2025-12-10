import Image from "next/image";
import ButtonWhite from "../button/ButtonWhite";
export default function Coaches() {
  return (
    <section className="mt-24">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row flex-wrap space-y-5 md:space-y-0">
          <div className="flex-1 flex justify-start">
            <div className="relative bg-gray-800 w-full h-[450px] md:w-[468px] md:h-[600px]">
              <Image
                src="/images/personal-training.jpg"
                alt="Personal Training Image"
                fill
                className="object-cover"
                priority
                sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
              />
            </div>
          </div>
          <div className="text-center md:text-left flex-1 flex items-center flex-wrap">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-3">
                Personal Training
              </h2>
              <p className="my-6">
                Maximum results and flexible training schedule.
              </p>
              <p className="text-justify text-white/70 mb-4 leading-relaxed">
                Group training is not for everyone. If you want to train 1-on-1,
                FitB offers you personal training to work on your individual
                skills and achieve fitness goals. Our personal trainers are
                dedicated to providing you with the best fitness experience
                possible.
              </p>
              <ButtonWhite title="Explore now" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

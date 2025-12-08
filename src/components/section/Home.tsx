import Image from "next/image";
import ButtonBrand from "../button/ButtonBrand";
export default function Home() {
  return (
    <section className="h-screen flex items-center">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex justify-center items-center order-1 md:order-2">
          <div className="relative w-72 h-72 md:w-[420px] md:h-[420px] rounded-xl overflow-hidden">
            <Image
              src="/images/hero.jpg"
              alt="Gym Hero Image"
              fill
              className="object-cover"
              priority
              sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
            />
          </div>
        </div>
        <div className="flex flex-col justify-center text-left space-y-4 order-2 md:order-1">
          <h1 className="text-4xl md:text-7xl font-bold leading-tight">
            GET FIT AND FEEL <span className="text-brand">GREAT!</span>
          </h1>
          <p className="text-lg text-white/70 max-w-md leading-7">
            Our professional instructors will help you stay active and healthy
          </p>
          <ButtonBrand title="Join Now" />
        </div>
      </div>
    </section>
  );
}

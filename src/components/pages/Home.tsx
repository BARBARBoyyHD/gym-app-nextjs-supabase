export default function Home() {
  return (
    <section className="h-screen flex items-center">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* HERO IMAGE */}
        <div className="flex justify-center items-center order-1 md:order-2">
          <div className="w-72 h-72 md:w-[420px] md:h-[420px] bg-slate-200 rounded-xl">
            {/* nanti ganti dengan <Image /> dari next/image */}
          </div>
        </div>

        {/* TEXT CONTENT */}
        <div className="flex flex-col justify-center text-left space-y-4 order-2 md:order-1">
          <h1 className="text-4xl md:text-7xl font-bold leading-tight">
            GET FIT AND FEEL <span className="color-brand">GREAT!</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-md">
            Our professional instructors will help you stay active and healthy
          </p>
          <button className="bg-brand hover:bg-brand-hover text-black font-semibold px-6 py-3 rounded-md w-fit mt-2">
            Join Now
          </button>
        </div>
      </div>
    </section>
  );
}

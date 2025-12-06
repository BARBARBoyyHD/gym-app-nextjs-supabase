import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="max-w-6xl mx-auto px-4 my-24">
          <div className=" grid grid-cols-1 md:grid-cols-5 gap-10 place-items-center space-y-5">
            <div className="md:col-span-3">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                About Lift<span className="text-brand">Up</span>
              </h1>
              <p className="text-lg text-white/70 leading-7">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum
                soluta aperiam, commodi eos tempore aliquid dolorem atque. Earum
                fugit ullam excepturi sed perspiciatis aliquam deleniti
                voluptate! Tempora deleniti quibusdam sapiente voluptatum. Ad
                culpa veritatis minima aperiam atque, quod ratione doloremque.
              </p>
            </div>
            <div className="relative w-80 h-80 md:col-span-2">
              <div
                className="w-64 h-64 bg-gray-800 rounded-xl absolute top-0 left-0 
                  transform -translate-x-3 -translate-y-3"
              ></div>
              <div
                className="w-64 h-64 bg-gray-700 rounded-xl absolute bottom-0 right-0 
                  transform translate-x-3 translate-y-3"
              ></div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

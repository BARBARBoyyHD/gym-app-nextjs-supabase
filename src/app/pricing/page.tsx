import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ButtonBrand from "@/components/button/ButtonBrand";

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="max-w-6xl mx-auto px-4 mt-36 md:my-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            Pricing <span className="text-brand">Plans</span>
          </h2>
          <p className="text-white/70 text-center">
            Choose a pricing plan which suits your fitness goals.
          </p>
          {/* Bundle Packages */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 space-y-6 mt-12 gap-8">
            {/* Bronze */}
            <div className="bg-dark-secondary border-brand h-[500px] p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-white/70 uppercase text-2xl font-bold">
                  Bronze
                </h3>
                <h5 className="uppercase text-3xl font-bold my-4">
                  <span className="text-brand">$80</span>/Month
                </h5>
                <span className="text-sm text-white/70">
                  Basic membership access
                </span>
                <ul className="list-disc my-6 space-y-2">
                  <li className="ml-4 marker-brand">Full gym access</li>
                  <li className="ml-4 marker-brand">Modern equipment access</li>
                  <li className="ml-4 marker-brand">Free locker included</li>
                  <li className="ml-4 marker-brand">No personal trainer</li>
                </ul>
              </div>
              <div>
                <ButtonBrand
                  className="w-full justify-center"
                  icon={false}
                  title="Select plan"
                />
              </div>
            </div>
            {/* Silver */}
            <div className="bg-dark-secondary border-brand h-[500px] p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-white/70 uppercase text-2xl font-bold">
                  Silver
                </h3>
                <h5 className="uppercase text-3xl font-bold my-4">
                  <span className="text-brand">$150</span>/Month
                </h5>
                <span className="text-sm text-white/70">
                  Membership + Trainer + 3 selected course classes
                </span>
                <ul className="list-disc my-6 space-y-2">
                  <li className="ml-4 marker-brand">Full gym access</li>
                  <li className="ml-4 marker-brand">Modern equipment access</li>
                  <li className="ml-4 marker-brand">3 course classes</li>
                  <li className="ml-4 marker-brand">
                    Personal trainer (8 session)
                  </li>
                  <li className="ml-4 marker-brand">Free locker included</li>
                </ul>
              </div>
              <div>
                <ButtonBrand
                  className="w-full justify-center"
                  icon={false}
                  title="Select plan"
                />
              </div>
            </div>

            {/* Gold */}
            <div className="bg-dark-secondary border-brand h-[500px] p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-white/70 uppercase text-2xl font-bold">
                  Gold
                </h3>
                <h5 className="uppercase text-3xl font-bold my-4">
                  <span className="text-brand">$220</span>/Month
                </h5>
                <span className="text-sm text-white/70">
                  Member + Trainer + All course classes + 1 Class
                </span>
                <ul className="list-disc my-6 space-y-2">
                  <li className="ml-4 marker-brand">Full gym access</li>
                  <li className="ml-4 marker-brand">Modern equipment access</li>

                  <li className="ml-4 marker-brand">All course classes</li>
                  <li className="ml-4 marker-brand">1 bonus class</li>
                  <li className="ml-4 marker-brand">
                    Personal trainer (12 session)
                  </li>
                  <li className="ml-4 marker-brand">Free locker included</li>
                </ul>
              </div>
              <div>
                <ButtonBrand
                  className="w-full justify-center"
                  icon={false}
                  title="Select plan"
                />
              </div>
            </div>
          </div>

          {/* Classes Package Title */}
          <div className="text-center mt-20">
            <h2 className="text-4xl uppercase font-bold">Classes Package</h2>
            <p className="text-white/70 mt-2">
              Choose your preferred class package to level up your training
              performance.
            </p>
          </div>

          {/* Classes Packages */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 space-y-6 mt-12 gap-8">
            {/* Bronze Class */}
            <div className="bg-dark-secondary border-brand h-[400px] p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-white/70 uppercase text-2xl font-bold">
                  Bronze
                </h3>
                <h5 className="uppercase text-3xl font-bold my-4">
                  <span className="text-brand">$25</span>/Class
                </h5>
                <span className="text-sm text-white/70">1 class + course</span>
                <ul className="list-disc my-6 space-y-2">
                  <li className="ml-4 marker-brand">1 selected class</li>
                  <li className="ml-4 marker-brand">Course included</li>
                  <li className="ml-4 marker-brand">Free locker included</li>
                </ul>
              </div>
              <div>
                <ButtonBrand
                  className="w-full justify-center"
                  icon={false}
                  title="Select plan"
                />
              </div>
            </div>

            {/* Silver Class */}
            <div className="bg-dark-secondary border-brand h-[400px] p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-white/70 uppercase text-2xl font-bold">
                  Silver
                </h3>
                <h5 className="uppercase text-3xl font-bold my-4">
                  <span className="text-brand">$60</span>/3 Classes
                </h5>
                <span className="text-sm text-white/70">
                  3 classes + course
                </span>
                <ul className="list-disc my-6 space-y-2">
                  <li className="ml-4 marker-brand">3 selected classes</li>
                  <li className="ml-4 marker-brand">Course included</li>
                  <li className="ml-4 marker-brand">Free locker included</li>
                </ul>
              </div>
              <div>
                <ButtonBrand
                  className="w-full justify-center"
                  icon={false}
                  title="Select plan"
                />
              </div>
            </div>

            {/* Gold Class */}
            <div className="bg-dark-secondary border-brand h-[400px] p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-white/70 uppercase text-2xl font-bold">
                  Gold
                </h3>
                <h5 className="uppercase text-3xl font-bold my-4">
                  <span className="text-brand">$90</span>/5 Classes
                </h5>
                <span className="text-sm text-white/70">
                  5 classes + course
                </span>
                <ul className="list-disc my-6 space-y-2">
                  <li className="ml-4 marker-brand">5 selected classes</li>
                  <li className="ml-4 marker-brand">Course included</li>
                  <li className="ml-4 marker-brand">Free locker included</li>
                </ul>
              </div>
              <div>
                <ButtonBrand
                  className="w-full justify-center"
                  icon={false}
                  title="Select plan"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

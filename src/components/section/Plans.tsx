import ButtonBrand from "../button/ButtonBrand";

export default function Plans() {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 mb-12">
        <h2 className="text-4xl font-bold mb-4 text-center">Pricing Plans</h2>
        <p className="text-white/70 text-center">
          Choose a pricing plan which suits your fitness goals.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 space-y-6 mt-12 gap-8">
          <div className="bg-dark-secondary border-brand h-[425px] p-8">
            <h3 className="text-white/70 uppercase text-2xl font-bold">Pro</h3>
            <h5 className="uppercase text-3xl font-bold my-4 ">
              <span className="text-brand">$100</span>/Month
            </h5>
            <span className="text-sm text-white/70">Pro Plans</span>
            <ul className="list-disc my-6 space-y-2">
              <li className="ml-4 marker-brand">Course access</li>
              <li className="ml-4 marker-brand">Any fitness program</li>
              <li className="ml-4 marker-brand">Personal training sessions</li>
              <li className="ml-4 marker-brand">Full services</li>
            </ul>
            <ButtonBrand title="Select plan" />
          </div>
          <div className="bg-dark-secondary border-brand h-[425px] p-8">
            <h3 className="text-white/70 uppercase text-2xl font-bold">
              10 Classes
            </h3>
            <h5 className="uppercase text-3xl font-bold my-4">
              <span className="text-brand">$100</span>
            </h5>
            <span className="text-sm text-white/70">10 group classes</span>
            <ul className="list-disc my-6 space-y-2">
              <li className="ml-4 marker-brand">Any fitness program</li>
              <li className="ml-4 marker-brand">Personal training sessions</li>
              <li className="ml-4 marker-brand">$15 per each extra training</li>
              <li className="ml-4 marker-brand">No individual sessions</li>
            </ul>
            <ButtonBrand title="Select plan" />
          </div>
          <div className="bg-dark-secondary border-brand h-[425px] p-8">
            <h3 className="text-white/70 uppercase text-2xl font-bold">
              Open Training
            </h3>
            <h5 className="uppercase text-3xl font-bold my-4 ">
              <span className="text-brand">$12</span>/Visit
            </h5>
            <span className="text-sm text-white/70">Pro Plans</span>
            <ul className="list-disc my-6 space-y-2">
              <li className="ml-4 marker-brand">Full acces to the gym</li>
              <li className="ml-4 marker-brand">Open from 8am to 9pm</li>
              <li className="ml-4 marker-brand">50+ gym machines</li>
              <li className="ml-4 marker-brand">Modern machines</li>
            </ul>
            <ButtonBrand title="Select plan" />
          </div>
        </div>
      </div>
    </section>
  );
}

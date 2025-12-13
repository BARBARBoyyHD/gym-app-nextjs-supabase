import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";
export default function CoachesPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="max-w-6xl mx-auto px-4 mt-36 md:my-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            Our <span className="text-brand">Coaches</span>
          </h2>
          <p className="text-white/70 text-center">
            Our team of highly trained and certified fitness instructors will
            help you set your goals.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 space-y-6 mt-12">
            <div>
              <div className="relative bg-gray-800 h-[400px]">
                <Image
                  src="/images/trainer-01.jpg"
                  alt="Trainer Image"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                />
              </div>
              <div className="mt-6 text-center">
                <h5 className="text-2xl font-bold text-brand">Hank Wilson</h5>
                <p className="text-white/70">Professional Trainer</p>
              </div>
            </div>
            <div>
              <div className="relative bg-gray-800 h-[400px]">
                <Image
                  src="/images/trainer-02.jpg"
                  alt="Trainer Image"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                />
              </div>
              <div className="mt-6 text-center">
                <h5 className="text-2xl font-bold text-brand">Frank Stone</h5>
                <p className="text-white/70">Founder/Head Coach</p>
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
              <div className="mt-6 text-center">
                <h5 className="text-2xl font-bold text-brand">Mary Grey</h5>
                <p className="text-white/70">Professional Trainer</p>
              </div>
            </div>
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
              <div className="mt-6 text-center">
                <h5 className="text-2xl font-bold text-brand">Petersen</h5>
                <p className="text-white/70">Professional Trainer</p>
              </div>
            </div>
            <div>
              <div className="relative bg-gray-800 h-[400px]">
                <Image
                  src="/images/trainer-05.jpg"
                  alt="Trainer Image"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                />
              </div>
              <div className="mt-6 text-center">
                <h5 className="text-2xl font-bold text-brand">Olivia</h5>
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
              <div className="mt-6 text-center">
                <h5 className="text-2xl font-bold text-brand">Steve</h5>
                <p className="text-white/70">Professional Trainer</p>
              </div>
            </div>
          </div>
        </section>
        <section>
          <CallToAction
            title="NEED ASSISTANCE? CONTACT US"
            description="In order to offer you the best services, we will ask you a couple of questions about your fitness goals."
            buttonTitle="Contact Us"
          />
        </section>
      </main>
      <Footer />
    </>
  );
}

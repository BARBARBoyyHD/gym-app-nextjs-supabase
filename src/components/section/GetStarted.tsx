import Image from "next/image";

export default function GetStarted() {
  return (
    <section className="my-24">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap">
          <div className="flex-1 flex justify-start">
            <div className="relative bg-gray-800 w-[468px] h-[600px]">
              <Image
                src="/images/started.jpg"
                alt="Get Started Image"
                fill
                className="object-cover"
                priority
                sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
              />
            </div>
          </div>
          <div className="flex-1 flex items-center flex-wrap">
            <div>
              <h2 className="text-5xl font-extrabold mb-3">How To Start</h2>
              <p className="my-6">
                Ready to start a new and healthy chapter of your life?
              </p>
              <h5 className="text-2xl font-extrabold text-brand mb-6 capitalize">
                Get Consultation
              </h5>
              <p className="text-white/70 mb-4 leading-relaxed">
                <a href="#">
                  <span className="text-brand underline">
                    {" "}
                    Fill out the form
                  </span>
                </a>{" "}
                and one of our representatives will get in touch with you. Get
                answers to all the questions you may have and choose the
                training direction that is right for you.
              </p>
              <h5 className="text-2xl font-extrabold text-brand mb-6 capitalize">
                Sign Up For A New Class
              </h5>
              <p className="text-white/70 mb-4 leading-relaxed">
                You have a great chance to experience a free trial of the class
                of your choice and determine if it's right for you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

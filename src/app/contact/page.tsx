import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="max-w-5xl mx-auto bg-background text-white px-4 mt-12 mb-24">
          <div className="w-full max-w-5xl p-10 ">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h1 className="text-center md:text-left text-4xl md:text-5xl font-bold mb-4">
                  Contact <span className="text-brand">Us</span>
                </h1>
                <p className="text-center md:text-left text-white/70 leading-relaxed mb-8">
                  Feel free to reach out through this form or contact us
                  directly. We&apos;re here to help you with anything you need.
                </p>

                {/* PHONE */}
                <div className="flex items-start gap-4 mb-6">
                  <FaPhone className="text-brand text-xl mt-1" />
                  <p className="text-white/80">+62 812 3456 7890</p>
                </div>

                {/* EMAIL */}
                <div className="flex items-start gap-4 mb-6">
                  <FaEnvelope className="text-brand text-xl mt-1" />
                  <p className="text-white/80">info@liftupfitness.com</p>
                </div>

                {/* LOCATION */}
                <div className="flex items-start gap-4">
                  <FaMapMarkerAlt className="text-brand text-xl mt-1" />
                  <p className="text-white/80 leading-relaxed">
                    15 West Street, Bandung <br />
                    Jawa Barat, Indonesia
                  </p>
                </div>
              </div>

              {/* RIGHT SIDE — CONTACT FORM */}
              <form className="space-y-6">
                {/* NAME */}
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="w-full md:w-1/2">
                    <label className="text-sm text-white/70 mb-1 block">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full bg-black/30 border border-white/20 focus:border-brand focus:ring-2 focus:ring-brand/30 outline-none px-4 py-3 rounded-lg"
                      placeholder="First"
                    />
                  </div>

                  <div className="w-full md:w-1/2">
                    <label className="text-sm text-white/70 mb-1 block">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="w-full bg-black/30 border border-white/20 focus:border-brand focus:ring-2 focus:ring-brand/30 outline-none px-4 py-3 rounded-lg"
                      placeholder="Last"
                    />
                  </div>
                </div>

                {/* EMAIL */}
                <div>
                  <label className="text-sm text-white/70 mb-1 block">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full bg-black/30 border border-white/20 focus:border-brand focus:ring-2 focus:ring-brand/30 outline-none px-4 py-3 rounded-lg"
                    placeholder="example@email.com"
                  />
                </div>

                {/* PHONE */}
                <div>
                  <label className="text-sm text-white/70 mb-1 block">
                    Phone <span className="text-white/40">(optional)</span>
                  </label>
                  <input
                    type="text"
                    className="w-full bg-black/30 border border-white/20 focus:border-brand focus:ring-2 focus:ring-brand/30 outline-none px-4 py-3 rounded-lg"
                    placeholder="xxx-xxx-xxxx"
                  />
                </div>

                {/* MESSAGE */}
                <div>
                  <label className="text-sm text-white/70 mb-1 block">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    className="w-full bg-black/30 border border-white/20 focus:border-brand focus:ring-2 focus:ring-brand/30 outline-none px-4 py-3 rounded-lg"
                    placeholder="Type your message..."
                  ></textarea>
                </div>

                {/* SUBMIT BUTTON */}
                <button
                  type="submit"
                  className="w-full bg-brand bg-brand-hover cursor-pointer text-black font-semibold py-3 rounded-lg transition hover:bg-brand-hover"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

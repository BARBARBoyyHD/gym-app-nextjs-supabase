export default function Footer() {
  return (
    <footer className="    ">
      <div className="max-w-6xl mx-auto px-4  border-white/20 border-t pt-20">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-5 space-y-5">
          <div>
            <h2 className="text-2xl font-bold text-brand">LiftUp</h2>
            <p className="mt-4 text-xs text-white/70 leading-relaxed">
              LiftUp adalah platform latihan modern yang menyediakan layanan
              profesional, kelas premium, dan kursus berlajar yang
              bersertifikat.
            </p>
          </div>

          <div className="mx-auto">
            <h3 className="text-lg font-semibold text-white mb-4">
              Navigation
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-white/70 text-brand-hover duration-75"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/70 text-brand-hover duration-75"
                >
                  Classes
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/70 text-brand-hover duration-75"
                >
                  Coaches
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/70 text-brand-hover duration-75"
                >
                  Plan
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/70 text-brand-hover duration-75"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="mx-auto">
            <h3 className="text-lg font-semibold text-white mb-4">
              Information
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-white/70 text-brand-hover duration-75"
                >
                  Trainers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/70 text-brand-hover duration-75"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/70 text-brand-hover duration-75"
                >
                  Pricing plan
                </a>
              </li>
            </ul>
          </div>

          <div className="ml-auto">
            <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-white/70">Email: info@liftup.com</li>
              <li className="text-white/70">Phone: +62 812-3456-7890</li>
            </ul>
          </div>

          <div className="ml-auto">
            <h3 className="text-lg font-semibold text-white mb-4">Location</h3>
            <p className="text-sm text-white/70">
              Jl. Fitness Raya No. 20
              <br />
              Kota Bandung, Indonesia
              <br />
              40123
            </p>
          </div>
        </div>
        <div className="border-t border-white/20 mt-10 py-5 text-center text-sm text-white/70">
          © {new Date().getFullYear()} LiftUp. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

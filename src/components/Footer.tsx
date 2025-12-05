export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 pt-12 pb-6">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo + About */}
        <div>
          <h2 className="text-2xl font-bold text-brand">LiftUp</h2>
          <p className="mt-4 text-sm leading-relaxed">
            LiftUp adalah platform latihan modern yang menyediakan layanan
            profesional, kelas premium, dan kursus berlajar yang bersertifikat.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Navigation</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-brand">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-brand">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-brand">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-brand">
                Coaches
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-brand">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact / Social */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li>Email: info@liftup.com</li>
            <li>Phone: +62 812-3456-7890</li>
          </ul>

          <h4 className="text-lg font-semibold text-white mt-6 mb-2">
            Social Media
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-brand">
                YouTube
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-brand">
                Instagram
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-brand">
                TikTok
              </a>
            </li>
          </ul>
        </div>

        {/* Location */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Location</h3>
          <p className="text-sm leading-relaxed">
            Jl. Fitness Raya No. 20
            <br />
            Kota Bandung, Indonesia
            <br />
            40123
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 mt-10 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} LiftUp. All rights reserved.
      </div>
    </footer>
  );
}

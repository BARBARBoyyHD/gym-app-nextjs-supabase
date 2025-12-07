export default function Coaches() {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
          Our <span className="text-brand">Coaches</span>
        </h2>
        <p className="text-white/70 text-center">
          Our team of highly trained and certified fitness instructors will help
          you set your goals.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 space-y-6 text-center mt-12 gap-8">
          <div>
            <div className="bg-gray-800 h-[400px]"></div>
            <div className="mt-6">
              <h5 className="text-2xl font-semibold text-brand">Petersen</h5>
              <p className="text-white/70">Professional Trainer</p>
            </div>
          </div>
          <div>
            <div className="bg-gray-800 h-[400px]"></div>
            <div className="mt-6">
              <h5 className="text-2xl font-semibold text-brand">Steve</h5>
              <p className="text-white/70">Professional Trainer</p>
            </div>
          </div>
          <div>
            <div className="bg-gray-800 h-[400px]"></div>
            <div className="mt-6">
              <h5 className="text-2xl font-semibold text-brand">Mary Grey</h5>
              <p className="text-white/70">Professional Trainer</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

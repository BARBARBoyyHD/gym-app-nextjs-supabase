export default function Coaches() {
  return (
    <section className="mt-24">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap">
          <div className="flex-1 flex justify-start">
            <div className="bg-gray-800 w-[468px] h-[600px]"></div>
          </div>
          <div className="flex-1 flex items-center flex-wrap">
            <div>
              <h2 className="text-5xl font-bold mb-3">Personal Training</h2>
              <p className="my-6">
                Maximum results and flexible training schedule.
              </p>
              <p className="text-white/70 mb-4 leading-relaxed">
                Group training is not for everyone. If you want to train 1-on-1,
                FitB offers you personal training to work on your individual
                skills and achieve fitness goals. Our personal trainers are
                dedicated to providing you with the best fitness experience
                possible.
              </p>
              <button className="bg-transparent border-white border-2 text-white font-semibold px-8 py-2 w-fit mt-2 hover:bg-white hover:text-black cursor-pointer duration-75">
                Explore now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

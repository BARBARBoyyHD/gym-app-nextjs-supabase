export default function Facility() {
  const facilities = [
    {
      title: "FULLY EQUIPPED GYM",
      desc: "Our spacious gym is suitable for group lessons and has all the necessary equipment.",
    },
    {
      title: "SELECT YOUR ACTIVITY",
      desc: "Choose the activities which suit you and don't pay for the unnecessary ones.",
    },
    {
      title: "OPEN FOR ANYONE",
      desc: "Whatever your fitness level is, you can attend our fitness classes at any time.",
    },
    {
      title: "FLEXIBLE PRICES",
      desc: "You can select a training plan, instructor, and schedule suitable for you.",
    },
  ];

  return (
    <section className="my-32 ">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-10 px-4">
        {facilities.map((item, index) => (
          <div key={index} className="flex flex-col items-start gap-4">
            {/* Icon placeholder */}
            <div className="w-12 h-12 bg-brand rounded-xl"></div>

            <h3 className="text-white font-semibold text-lg">{item.title}</h3>

            <p className="text-white/70 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

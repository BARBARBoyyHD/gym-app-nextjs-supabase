import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import CallToActionBlock from "@/components/CallToActionBlock";
export default function ClassesPage() {
  const classesData = [
    {
      title: "Boxing",
      desc: "Improve strength, conditioning, and coordination with high-intensity boxing classes led by our professional trainers.",
    },
    {
      title: "Yoga",
      desc: "Enhance flexibility, reduce stress, and strengthen your core through mindful yoga sessions suitable for all levels.",
    },
    {
      title: "Zumba",
      desc: "A fun and energetic dance workout designed to burn calories while enjoying upbeat music.",
    },
    {
      title: "Crossfit",
      desc: "Boost endurance and build muscle with a variety of high-intensity functional exercises.",
    },
    {
      title: "Pilates",
      desc: "Strengthen your core, improve posture, and increase mobility through controlled, low-impact movements.",
    },
    {
      title: "HIIT",
      desc: "A fast-paced interval workout designed to maximize calorie burn and improve cardiovascular endurance in a short time.",
    },
  ];
  return (
    <>
      <Navbar />
      <main>
        <section className="max-w-6xl mx-auto px-4 my-24">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            Our <span className="text-brand">Classes</span>
          </h2>
          <p className="text-white/70 text-center">
            Our facility offers a variety of gym equipment and fitness classes.
            Select the activities you like the most!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 space-y-6 mt-12">
            {classesData.map((item, index) => (
              <div key={index}>
                <div className="bg-gray-800 w-full h-80 mb-6"></div>
                <div>
                  <h5 className="text-2xl font-bold text-brand mb-3 uppercase ">
                    {item.title}
                  </h5>

                  <p className="text-white/70 leading-7 text-lg">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section>
          <CallToActionBlock title="GET YOUT FIRST CLASS FOR FREE!" />
        </section>
      </main>

      <Footer />
    </>
  );
}

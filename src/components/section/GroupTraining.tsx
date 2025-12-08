import Image from "next/image";
export default function GroupTraining() {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap">
          <div className="flex-1 flex items-center flex-wrap ">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-3">
                Group Training
              </h2>
              <p className="my-6">Work in groups to become a better you.</p>
              <p className="text-white/70 mb-4 leading-relaxed">
                If you prefer to train in groups, we have something to offer
                you. Our experienced instructors train small groups (10-12
                people) and can pay attention to each person. We have different
                group classes that will help you keep fit:
              </p>
              <ul className="list-disc mb-4">
                <li className=" ml-4 marker-brand">
                  <span className="pl-1">Pilates </span>
                </li>
                <li className="ml-4 marker-brand my-2">
                  <span className="pl-1"> Fitbal aerobics </span>
                </li>
                <li className="ml-4 marker-brand">
                  <span className="pl-1">Yoga, Etc. </span>
                </li>
              </ul>
              <p className="text-white/70 mb-4 leading-relaxed">
                At the same time, you meet wonderful people and train with great
                interest. You won&apos;t want to miss our workouts!
              </p>
            </div>
          </div>
          <div className="flex-1 flex justify-end">
            <div className="relative bg-gray-800 w-[468px] h-[600px]">
              <Image
                src="/images/group-training.jpg"
                alt="Group Training Image"
                fill
                className="object-cover"
                priority
                sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

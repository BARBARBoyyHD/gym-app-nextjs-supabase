export default function CallToAction({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-6xl mx-auto my-24 text-center">
      <h3 className="text-4xl font-bold text-white mb-2">{title}</h3>
      <p className="text-white/70 mb-4">{description}</p>
      <button className="bg-brand bg-brand-hover text-black font-semibold px-6 py-3 w-fit cursor-pointer  mt-2">
        Order Now
      </button>
      <div></div>
    </div>
  );
}

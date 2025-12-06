import ButtonBrand from "./button/ButtonBrand";

export default function CallToAction({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-6xl mx-auto px-4 my-24 text-center">
      <h3 className="text-4xl font-bold text-white mb-2">{title}</h3>
      <p className="text-white/70 mb-4">{description}</p>
      <ButtonBrand title="Order Now!" />
    </div>
  );
}

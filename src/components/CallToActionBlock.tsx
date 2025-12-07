import ButtonDark from "./button/ButtonDark";

export default function CallToActionBlock({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-6xl mx-auto px-4 my-24 text-center bg-brand py-16">
      <h3 className="text-4xl font-bold text-dark">{title}</h3>
      <p className="text-dark my-6">{description}</p>
      <ButtonDark title="Join now!" />
    </div>
  );
}

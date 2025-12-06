export default function ButtonBrand({ title }: { title: string }) {
  return (
    <button className="bg-brand bg-brand-hover text-black font-semibold px-6 py-3 w-fit cursor-pointer  mt-2">
      {title}
    </button>
  );
}

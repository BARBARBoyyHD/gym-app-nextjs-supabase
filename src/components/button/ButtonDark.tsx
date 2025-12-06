export default function ButtonDark({ title }: { title: string }) {
  return (
    <button className="bg-dark-hover bg-dark text-white hover:text-black font-semibold px-8 py-3 w-fit mt-2 cursor-pointer duration-75">
      {title}
    </button>
  );
}

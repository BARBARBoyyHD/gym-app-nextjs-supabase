import { FaChevronRight } from "react-icons/fa";

export default function ButtonBrand({
  style = " ",
  icon = true,
  title,
}: {
  style?: string;
  icon?: boolean;
  title: string;
}) {
  return (
    <button
      className={`bg-brand bg-brand-hover text-black font-bold px-6 py-3 w-fit cursor-pointer mt-2 flex items-center duration-75 ${style}`}
    >
      {icon && <FaChevronRight className="inline-block" />}

      <span>{title}</span>
    </button>
  );
}

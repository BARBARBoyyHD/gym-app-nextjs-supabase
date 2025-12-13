import { ButtonHTMLAttributes } from "react";

type ButtonWhiteProps = {
  title: string;
  children?: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function ButtonWhite({
  title,
  children,
  ...props
}: ButtonWhiteProps) {
  return (
    <button
      className="bg-transparent border-white border-2 text-white font-semibold px-8 py-2 w-fit mt-2 hover:bg-white hover:text-black cursor-pointer duration-75"
      {...props}
    >
      {title}{children}
    </button>
  );
}

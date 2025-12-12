import Link from "next/link";
import { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

type ButtonDarkProps = {
  title: string;
  link?: string;
  children?: React.ReactNode;
} & (
  | AnchorHTMLAttributes<HTMLAnchorElement>
  | ButtonHTMLAttributes<HTMLButtonElement>
);

export default function ButtonDark({
  title,
  link,
  children,
  ...props
}: ButtonDarkProps) {
  if (link) {
    return (
      <Link
        href={link}
        className="bg-dark bg-dark-hover text-white hover:text-black font-semibold px-8 py-3 w-fit mt-2 cursor-pointer duration-75 inline-block"
        {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {title}
        {children}
      </Link>
    );
  }

  return (
    <button
      className="bg-dark bg-dark-hover text-white hover:text-black font-semibold px-8 py-3 w-fit mt-2 cursor-pointer duration-75"
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {title}
      {children}
    </button>
  );
}

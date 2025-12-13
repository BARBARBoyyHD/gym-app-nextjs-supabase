import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
import { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

type ButtonBrandProps = {
  className?: string;
  icon?: boolean;
  title: string;
  link?: string;
  children?: React.ReactNode;
} & (
  | AnchorHTMLAttributes<HTMLAnchorElement>
  | ButtonHTMLAttributes<HTMLButtonElement>
);

export default function ButtonBrand({
  className = " ",
  icon = true,
  title,
  link = " ",
  children,
  ...props
}: ButtonBrandProps) {
  if (link) {
    return (
      <Link
        href={link}
        className={`bg-brand bg-brand-hover text-black font-bold px-6 py-3 w-fit cursor-pointer mt-2 flex items-center duration-75 ${className} inline-block`}
        {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {icon && <FaChevronRight className="inline-block" />}
        <span>{title}</span>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={`bg-brand bg-brand-hover text-black font-bold px-6 py-3 w-fit cursor-pointer mt-2 flex items-center duration-75 ${className}`}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {icon && <FaChevronRight className="inline-block" />}
      <span>{title}</span>
      {children}
    </button>
  );
}

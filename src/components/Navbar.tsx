"use client";
import Link from "next/link";
import { useState } from "react";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const path = usePathname();

  return (
    <header className="bg-darktext-white">
      <nav className="max-w-6xl mx-auto px-4 pt-8 pb-4 flex items-center justify-between">
        <div className="text-xl font-bold color-brand">
          <Link href="/">
            {" "}
            Lift<span className="text-brand">Up</span>
          </Link>
        </div>

        <ul className="hidden md:flex items-center gap-10">
          <li>
            <Link
              href="/about"
              className={`nav-link ${path.startsWith("/about") && "active"}`}
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              href="/classes"
              className={`nav-link ${path.startsWith("/classes") && "active"} `}
            >
              Classes
            </Link>
          </li>
          <li>
            <Link
              href="/courses"
              className={`nav-link ${path.startsWith("/courses") && "active"} `}
            >
              Courses
            </Link>
          </li>
          <li>
            <Link
              href="/coaches"
              className={`nav-link ${path.startsWith("/coaches") && "active"}`}
            >
              Coaches
            </Link>
          </li>
          <li>
            <Link
              href="/pricing"
              className={`nav-link ${path.startsWith("/pricing") && "active"}`}
            >
              Pricing
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className={`nav-link ${path.startsWith("/contact") && "active"}`}
            >
              Contact
            </Link>
          </li>
        </ul>
        {/* Social (Desktop) */}
        <ul className="hidden md:flex items-center gap-3 text-sm">
          <li>
            <a
              href="#"
              className="text-brand inline-block p-1 border bg-brand-hover duration-75 text-dark-hover border-brand"
            >
              <FaFacebook size={20} />
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-brand inline-block p-1 border bg-brand-hover duration-75 text-dark-hover border-brand"
            >
              <FaYoutube size={20} />
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-brand inline-block p-1 border bg-brand-hover duration-75 text-dark-hover border-brand"
            >
              <FaInstagram size={20} />
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-brand inline-block p-1 border bg-brand-hover duration-75 text-dark-hover border-brand"
            >
              <FaXTwitter size={20} />
            </a>
          </li>
        </ul>
        {/* Mobile Button (Hamburger) */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
        >
          {/* Hamburger icon (pure HTML/CSS) */}
          <div className="space-y-1.5">
            <span className="block w-6 h-0.5 bg-white"></span>
            <span className="block w-6 h-0.5 bg-white"></span>
            <span className="block w-6 h-0.5 bg-white"></span>
          </div>
        </button>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-black border-t border-white/10">
          <ul className="flex flex-col gap-4 px-4 py-6 text-lg">
            <li>
              <Link href="/about" className="nav-link font-semibold">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/classes" className="nav-link font-semibold">
                Classes
              </Link>
            </li>
            <li>
              <Link href="/courses" className="nav-link font-semibold">
                Courses
              </Link>
            </li>
            <li>
              <Link href="/coaches" className="nav-link font-semibold">
                Personal Trainer
              </Link>
            </li>
            <li>
              <Link href="/pricing" className="nav-link font-semibold">
                Plan
              </Link>
            </li>
            <li>
              <Link href="/contact" className="nav-link font-semibold">
                Contact
              </Link>
            </li>
          </ul>
          <ul className="flex flex-col gap-2 px-4 pb-6 text-sm">
            <li>
              <a
                href="#"
                className="text-brand inline-block p-1 border bg-brand-hover duration-75 text-dark-hover border-brand"
              >
                <FaFacebook size={20} />
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-brand inline-block p-1 border bg-brand-hover duration-75 text-dark-hover border-brand"
              >
                <FaYoutube size={20} />
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-brand inline-block p-1 border bg-brand-hover duration-75 text-dark-hover border-brand"
              >
                <FaInstagram size={20} />
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-brand inline-block p-1 border bg-brand-hover duration-75 text-dark-hover border-brand"
              >
                <FaXTwitter size={20} />
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

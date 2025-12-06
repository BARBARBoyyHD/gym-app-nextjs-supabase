"use client";
import Link from "next/link";
import { useState } from "react";
export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="bg-dark text-white">
      <nav className="max-w-6xl mx-auto px-4 pt-8 pb-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold color-brand">
          <a href="/"> LiftUp</a>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-10">
          <li>
            <Link href="/about" className="nav-link font-medium">
              About Us
            </Link>
          </li>
          <li>
            <Link href="/classes" className="nav-link font-medium">
              Classes
            </Link>
          </li>
          <li>
            <Link href="/coaches" className="nav-link font-medium">
              Coaches
            </Link>
          </li>
          <li>
            <Link href="/plan" className="nav-link font-medium">
              Plan
            </Link>
          </li>
          <li>
            <Link href="/contact" className="nav-link font-medium">
              Contact
            </Link>
          </li>
        </ul>
        {/* Social (Desktop) */}
        <ul className="hidden md:flex items-center gap-4 text-sm">
          <li>
            <a href="#" className="nav-link ">
              YT
            </a>
          </li>
          <li>
            <a href="#" className="nav-link ">
              IG
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
              <a href="#" className="nav-link font-semibold">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="nav-link font-semibold">
                Classes
              </a>
            </li>
            <li>
              <a href="#" className="nav-link font-semibold">
                Personal Trainer
              </a>
            </li>
            <li>
              <a href="#" className="nav-link font-semibold">
                Plan
              </a>
            </li>
            <li>
              <a href="#" className="nav-link font-semibold">
                Contact
              </a>
            </li>
          </ul>
          <ul className="flex flex-col gap-2 px-4 pb-6 text-sm">
            <li>
              <a href="#" className="nav-link font-semibold">
                YT
              </a>
            </li>
            <li>
              <a href="#" className="nav-link font-semibold">
                IG
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

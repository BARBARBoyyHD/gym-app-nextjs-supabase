"use client";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-dark text-white">
      <nav className="max-w-6xl mx-auto px-4 pt-8 pb-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold color-brand">LiftUp</div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-10">
          <li>
            <a href="#" className="nav-link font-medium">
              About Us
            </a>
          </li>
          <li>
            <a href="#" className="nav-link font-medium">
              Classes
            </a>
          </li>
          <li>
            <a href="#" className="nav-link font-medium">
              Coaches
            </a>
          </li>
          <li>
            <a href="#" className="nav-link font-medium">
              Plan
            </a>
          </li>
          <li>
            <a href="#" className="nav-link ">
              Contact
            </a>
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

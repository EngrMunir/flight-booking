'use client'
import Link from "next/link";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-950 shadow-md px-6 py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold text-white">✈️ TravelApp</div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-6 text-white font-medium">
          <Link href="/flights"><li className="hover:bg-sky-900 cursor-pointer">Flights</li></Link>
          <li className="hover:bg-sky-900 cursor-pointer">Cars</li>
          <li className="hover:bg-sky-900 cursor-pointer">Hotels</li>
        </ul>

        {/* Right menu (Desktop only) */}
        <ul className="hidden md:flex items-center gap-6 text-white text-sm">
          <li className="hover:bg-sky-900 cursor-pointer">USD</li>
          <li className="hover:bg-sky-900 cursor-pointer">Support & Help</li>
          <li className="hover:bg-sky-900 cursor-pointer">Sign In</li>
        </ul>

        {/* Hamburger (Mobile) */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <HiX className="w-6 h-6 text-white" />
            ) : (
              <HiMenu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 px-4 space-y-2 text-white">
          <ul className="flex flex-col gap-2">
            <li className="hover:bg-sky-900 cursor-pointer">Flights</li>
            <li className="hover:bg-sky-900 cursor-pointer">Cars</li>
            <li className="hover:bg-sky-900 cursor-pointer">Hotels</li>
          </ul>
          <ul className="flex flex-col gap-2 mt-4 border-t pt-4">
            <li className="hover:bg-sky-900 cursor-pointer">USD</li>
            <li className="hover:bg-sky-900 cursor-pointer">Support & Help</li>
            <li className="hover:bg-sky-900 cursor-pointer">Sign In</li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

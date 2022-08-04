import Link from "next/link";
import React, { useRef } from "react";
import { CgMenu, CgClose } from "react-icons/cg";
export default function Navbar() {
  const navRef = useRef<HTMLDivElement>(null);
  const showNavbar = () => {
    navRef.current?.classList.toggle("mobile__navbar");
  };

  return (
    <header className="p-4 bg-black text-white transition-all duration-200 ease-in-out">
      <div className="flex justify-between items-center">
        {/* Navbar Title */}
        <div className="bg-gradient-to-tr from-[#14e81e] via-[#00ea8d] to-[#017ed5] bg-clip-text text-transparent w-min font-bold text-2xl">
          Dodzs.dev
        </div>
        <nav
          ref={navRef}
          className="hidden md:flex md:justify-between md:gap-4"
        >
          <Link href={"/"} rel="noreferrer">
            <span className="md:cursor-pointer md:hover:bg-zinc-600 md:py-1 md:px-4 md:rounded-full transition-colors duration-150 ease-in">
              /home
            </span>
          </Link>
          <Link href={"/portfolio"} rel="noreferrer">
            <span className="md:cursor-pointer md:hover:bg-zinc-600 md:py-1 md:px-4 md:rounded-full transition-colors duration-150 ease-in">
              /portfolio
            </span>
          </Link>
          <button onClick={showNavbar} className="md:hidden">
            <CgClose size={32} />
          </button>
        </nav>
        <button onClick={showNavbar} className="md:hidden">
          <CgMenu size={32} />
        </button>
      </div>
    </header>
  );
}

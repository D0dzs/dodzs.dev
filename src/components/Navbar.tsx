import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { CgClose } from "react-icons/cg";
import { BiMenuAltRight } from "react-icons/bi";

export default function Navbar() {
  const navRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });
  const showNavbar = () => {
    navRef.current?.classList.toggle("mobile__navbar");
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (size.width >= 768 && isOpen) {
      navRef.current?.classList.toggle("mobile__navbar");
      setIsOpen(!isOpen);
    }
  }, [size.width, isOpen]);

  return (
    <header className="p-4 bg-black text-white transition-all duration-200 ease-in-out shadow-navbar z-[99999]">
      <div className="flex justify-between items-center">
        {/* Navbar Title */}
        <div className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent w-min font-bold text-2xl">
          <Link href={"/"} rel="noreferrer">
            Dodzs.dev
          </Link>
        </div>
        <nav
          ref={navRef}
          className="hidden md:flex md:justify-between md:gap-4 transition-all"
        >
          <Link href={"/"} rel="noreferrer" onClick={() => setIsOpen(!isOpen)}>
            <span className="md:cursor-pointer md:hover:bg-zinc-600 md:py-1 md:px-4 md:rounded-full transition-colors duration-150 ease-in">
              /home
            </span>
          </Link>
          <Link
            href={"/discord"}
            rel="noreferrer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="md:cursor-pointer md:hover:bg-zinc-600 md:py-1 md:px-4 md:rounded-full transition-colors duration-150 ease-in">
              /discord
            </span>
          </Link>
          {/* <button onClick={showNavbar} className="md:hidden">
            <CgClose size={32} />
          </button> */}
        </nav>
        <button onClick={showNavbar} className="md:hidden">
          {isOpen ? <CgClose size={32} /> : <BiMenuAltRight size={32} />}
        </button>
      </div>
    </header>
  );
}

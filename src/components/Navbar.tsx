import Link from "next/link";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { CgClose, CgMenu } from "react-icons/cg";
import { Dialog, Transition } from "@headlessui/react";
import { motion } from "framer-motion";

export default function Navbar() {
  const navRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });
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
      setIsOpen(!isOpen);
    }
  }, [size.width, isOpen]);

  const links = [
    { href: "/", display: "/home" },
    { href: "/about", display: "/about" },
    { href: "/discord", display: "/discord" },
  ];

  return (
    <header className="p-4 bg-black text-white transition-all duration-200 ease-in-out shadow-navbar z-[99999]">
      <div className="flex justify-between items-center">
        <div className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent w-min font-bold text-3xl">
          <Link href={"/"} rel="noreferrer">
            Dodzs.dev
          </Link>
        </div>
        <nav
          ref={navRef}
          className="hidden md:flex md:justify-between md:gap-4 transition-all"
        >
          {links.map(({ display, href }, index) => {
            return (
              <Link href={href} rel="noreferrer" key={index}>
                <span className="md:cursor-pointer md:hover:bg-zinc-600 md:py-1 md:px-4 md:rounded-full transition-colors duration-150 ease-in">
                  {display}
                </span>
              </Link>
            );
          })}
        </nav>
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          <CgMenu size={32} />
        </button>
      </div>
      {isOpen && (
        <div>
          <Transition appear show={isOpen} as={Fragment}>
            <Dialog
              as={motion.div}
              className="relative z-[999]"
              onClose={() => setIsOpen(false)}
            >
              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-min p-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-screen transform overflow-hidden rounded bg-zinc-800/80 backdrop-blur-sm text-left align-middle shadow-xl transition-all basis-auto">
                      <Dialog.Title
                        as="div"
                        className="flex justify-between bg-black/50 p-3"
                      >
                        <p className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent w-min font-bold text-2xl">
                          Dodzs.dev
                        </p>
                        <button
                          onClick={() => setIsOpen(false)}
                          className="self-center"
                        >
                          <CgClose size={32} color={"white"} />
                        </button>
                      </Dialog.Title>
                      <div className="text-white font-semibold flex flex-col justify-start gap-3 p-3 pb-4">
                        {links.map(({ display, href }, index) => {
                          return (
                            <Link href={href} rel="noreferrer" key={index}>
                              <button
                                onClick={() => setIsOpen(false)}
                                className="min-w-min flex ml-4"
                              >
                                <span>{display.replace("/", "")}</span>
                              </button>
                            </Link>
                          );
                        })}
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </div>
      )}
    </header>
  );
}

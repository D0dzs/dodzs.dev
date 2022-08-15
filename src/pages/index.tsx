import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Container from "../components/Container";
import { CgClose } from "react-icons/cg";
import { config } from "../../config";

// Technologies used:
import { TbBrandNextjs } from "react-icons/tb";
import {
  SiTailwindcss,
  SiHtml5,
  SiGithub,
  SiVercel,
  SiPostman,
  SiVisualstudiocode,
} from "react-icons/si";
import { FaReact, FaCss3 } from "react-icons/fa";
import { animateOnScroll } from "../utils/animateOnScroll";

const Home: NextPage = () => {
  const welcomeStyle =
    "text-4xl font-bold text-center text-white mt-40 my-24 md:m-0";
  const [browserType, setbrowserType] = useState("");
  useEffect(() => {
    setbrowserType(navigator.userAgent.replace(/\/.+/g, ""));
    window.addEventListener("scroll", () => {
      animateOnScroll(".tech-item", 0.8, "tech-item-visible", false);
    });
  });

  return (
    <Container>
      <section
        id="hero-wrapper"
        className="flex flex-col lg:flex-row md:items-center md:justify-center md:h-[75vh]"
      >
        <div id="hero-title" className="p-2 md:transform md:-translate-y-12">
          <p className={welcomeStyle}>Üdvözöllek az oldalamon!</p>
        </div>
        <div
          id="hero-subtitle"
          className="md:transform md:-translate-y-12 md:ml-2 mb-16 md:mb-0"
        >
          <div
            id="temrinal-wrapper"
            className="h-fit min-w-fit bg-zinc-800/80 backdrop-blur-sm mx-6 rounded-2xl font-mono md:w-[30rem] shadow-black shadow-2xl"
          >
            <div className="terminal-title bg-neutral-900 p-2 rounded-t-2xl flex justify-between">
              <p className="ml-1">
                <span className="font-semibold">Vercel Prompt </span>
                <span className="text-gray-200 text-sm">
                  [Version {config.site_version}]
                </span>
              </p>
              <CgClose className="self-center mr-1" color="white" size={24} />
            </div>
            <div className="terminal-container p-2 pb-6 ml-1">
              <p>Using Next.js [Version 12.2.0]</p>
              <p className="text-sm">
                <span className="font-sans">&#169;</span> {browserType}{" "}
                Corporation. All rights reserved.
              </p>
              <br />
              <p className="m-0 p-0 flex flex-col gap-y-1">
                <span>
                  \dodzs.dev&gt; Hello, <strong>Zsolt</strong> vagyok{" "}
                  <strong>{config.yrs_old}</strong> éves.
                </span>
                <br />
                <span className="flex">
                  \dodzs.dev&gt; Loading... <span id="cursor" />
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id="technoligies-wrapper" className="h-fit mt-16">
        <div id="tech-wrapper" className="pb-8">
          <div id="tech-title" className="p-4 text-center">
            <p className="font-bold first-letter:text-neutral-300 text-neutral-50 text-2xl">
              Technológiák
            </p>
            <p className="text-slate-300">
              Ide felsoroltam azokat a technológiákat amiket felhasználtam ehhez
              a weboldal készítése során.
            </p>
          </div>
          <div
            id="tech-container"
            className="flex flex-col items-center gap-y-2 md:flex-row md:flex-wrap md:w-[760px] md:gap-3 md:justify-center md:mx-auto lg:w-[1020px]"
          >
            <div className="bg-black/60 rounded-2xl p-1 w-80 tech-item">
              <p className="flex self-center justify-between p-2">
                <FaCss3 size={26} color={"#2965f1"} /> CSS3
              </p>
            </div>
            <div className="bg-black/60 rounded-2xl p-1 w-80 tech-item">
              <p className="flex self-center justify-between p-2">
                <SiGithub size={26} /> Github
              </p>
            </div>
            <div className="bg-black/60 rounded-2xl p-1 w-80 tech-item">
              <p className="flex self-center justify-between p-2">
                <SiHtml5 size={26} color={"#e44d25"} /> HTML5
              </p>
            </div>
            <div className="bg-black/60 rounded-2xl p-1 w-80 tech-item">
              <p className="flex self-center justify-between p-2">
                <TbBrandNextjs size={26} /> Next.js
              </p>
            </div>
            <div className="bg-black/60 rounded-2xl p-1 w-80 tech-item">
              <p className="flex self-center justify-between p-2">
                <SiPostman size={26} color={"#fd6c35"} /> Postman
              </p>
            </div>
            <div className="bg-black/60 rounded-2xl p-1 w-80 tech-item">
              <p className="flex self-center justify-between p-2">
                <FaReact size={26} color={"#61dafb"} /> React
              </p>
            </div>
            <div className="bg-black/60 rounded-2xl p-1 w-80 tech-item">
              <p className="flex self-center justify-between p-2">
                <SiTailwindcss size={26} color={"#38bdf8"} /> TailwindCSS
              </p>
            </div>
            <div className="bg-black/60 rounded-2xl p-1 w-80 tech-item">
              <p className="flex self-center justify-between p-2">
                <SiVercel size={26} /> Vercel
              </p>
            </div>
            <div className="bg-black/60 rounded-2xl p-1 w-80 tech-item">
              <p className="flex self-center justify-between p-2">
                <SiVisualstudiocode size={26} color={"#106dbf"} /> Visual Studio
                Code
              </p>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default Home;

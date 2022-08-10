import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Container from "../components/Container";
import { CgClose } from "react-icons/cg";
import { config } from "../../config";

const Home: NextPage = () => {
  const welcomeStyle =
    "text-4xl font-bold text-center bg-gradient-to-b md:bg-gradient-to-r from-slate-200 via-slate-300 to-slate-400 bg-clip-text text-transparent mt-40 my-24 md:m-0";
  const [browserType, setbrowserType] = useState("");
  useEffect(() => {
    setbrowserType(navigator.userAgent.replace(/\/.+/g, ""));
  });

  return (
    <Container>
      <section className="flex flex-col md:flex-row md:items-center md:justify-center md:h-screen">
        <div id="hero-title" className="md:transform md:-translate-y-24">
          <p className={welcomeStyle}>Üdvözöllek az oldalamon!</p>
        </div>
        <div
          id="hero-subtitle"
          className="md:transform md:-translate-y-24 md:ml-2"
        >
          <div
            id="temrinal-wrapper"
            className="h-fit min-w-screen bg-zinc-800/80 backdrop-blur-sm m-4 rounded-2xl font-mono md:min-w-full shadow-black shadow-2xl"
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
                  \vercel\storage\dodzs.dev&gt; Hello, <strong>Zsolt</strong>{" "}
                  vagyok <strong>{config.yrs_old}</strong> éves.
                </span>
                <br />
                <span className="flex">
                  \vercel\storage\dodzs.dev&gt; Loading... <span id="cursor" />
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default Home;

import { useReducedMotion } from "framer-motion";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";
import { config } from "../../config";
import { motion } from "framer-motion";
import { loadCursor } from "../utils/loadCursor";

export default function Container(props: any) {
  const { children } = props;
  const router = useRouter();
  const reduceMotion = useReducedMotion();

  const variants = {
    initial: {
      scale: reduceMotion ? 1 : 0.96,
      y: reduceMotion ? 0 : 15,
      opacity: 0,
    },
    animate: {
      y: 0,
      scale: 1,
      opacity: 1,
    },
    exit: {
      y: reduceMotion ? 0 : 15,
      opacity: 0,
      transition: {
        duration: reduceMotion ? 0 : 0.2,
      },
    },
    transition: {
      duration: reduceMotion ? 0 : 0.2,
    },
  };

  const ballCanvas = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (typeof window === "undefined" || !ballCanvas.current) return;
    return loadCursor(ballCanvas.current);
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content={config.author} />
        <meta name="keywords" content={config.keywords} />
        <meta name="description" content={config.description} />
        <meta name="theme-color" content={config.theme_color} />
        <meta
          name="copyright"
          content={`Copyright ${config.author} | ${new Date().getFullYear()}`}
        ></meta>
        <meta name="msapplication-TileColor" content={config.theme_color} />
        <meta property="og:type" content={config.type} />
        <meta property="og:description" content={config.description} />
        <meta property="og:title" content={config.title} />
        <meta property="og:url" content={config.url + router.asPath} />
      </Head>
      <div className="stuff(s)-that-useless-but-fancy-\:D">
        <div
          id="ball-canvas"
          ref={ballCanvas}
          className="ball-transitions pointer-events-none fixed z-30 h-6 w-6 rounded-full border border-black bg-transparent opacity-0 shadow-md duration-200 dark:border-white"
        />
      </div>
      <main className="flex min-h-screen flex-col antialiased dark:bg-zinc-700 dark:text-white">
        {config.smoothTransition ? (
          <motion.div {...variants}>{children}</motion.div>
        ) : (
          children
        )}
      </main>
    </>
  );
}

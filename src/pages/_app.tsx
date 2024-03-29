import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AnimatePresence, MotionConfig } from "framer-motion";
import NextNProgress from "nextjs-progressbar";

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <MotionConfig reducedMotion="user">
      <NextNProgress
        color="orange"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow={true}
        options={{ showSpinner: false }}
      />
      <AnimatePresence exitBeforeEnter>
        <Component {...pageProps} key={router.route} />
      </AnimatePresence>
    </MotionConfig>
  );
}

export default MyApp;

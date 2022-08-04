import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import Container from "../components/Container";

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <Container>
      <h1 className="text-center mt-16 font-semibold first-letter:text-xl first-letter:text-neutral-300">
        Hello Next.js 👋
      </h1>
      <span className="flex items-center justify-center mt-3">
        <sub>
          Current path:{" "}
          <span className="font-semibold">
            {router.asPath == "/"
              ? "home"
              : router.asPath.trim().replace("/", "")}
          </span>
        </sub>
      </span>
    </Container>
  );
};

export default Home;

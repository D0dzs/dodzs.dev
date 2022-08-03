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

      <p className="flex items-center justify-center mt-12 font-semibold cursor-pointer">
        <Link href={"/portfolio"} rel="noreferrer">
          <span className="bg-zinc-800 p-4 px-8 rounded-full hover:bg-neutral-300 hover:text-zinc-800 transition-colors duration-200 ease-in-out hover:scale-105">
            Portfolió
          </span>
        </Link>
      </p>
    </Container>
  );
};

export default Home;

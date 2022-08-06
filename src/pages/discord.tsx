import { useRouter } from "next/router";
import React from "react";
import Container from "../components/Container";
import discordData from "../utils/discordData";
import { CgExternal } from "react-icons/cg";

export default function Discord() {
  const router = useRouter();
  const data = discordData("401390393746259978");
  const boxStyle =
    "flex flex-row bg-zinc-600 shadow-xl p-4 rounded-xl w-96 md:w-auto";

  return (
    <Container>
      <h1 className="text-center mt-16 font-semibold first-letter:text-xl first-letter:text-neutral-300">
        Hello Next.js 👋
      </h1>
      <div className="flex flex-col items-center justify-center gap-4">
        <p>
          Current path:{" "}
          <span className="font-semibold">
            {router.asPath == "/"
              ? "home"
              : router.asPath.trim().replace("/", "")}
          </span>
        </p>
        <section className="flex flex-col gap-8 select-none m-8 md:flex-row flex-wrap md:w-[1120px] flex-auto justify-center">
          {data?.activities.map((val, index) => {
            if (val?.assets?.large_text.match("PreMiD")) {
              return (
                <div className={boxStyle} key={index}>
                  <div>
                    <img
                      src={`https://cdn.discordapp.com/app-assets/${val?.application_id}/${val?.assets?.large_image}.png`}
                      className="rounded-md"
                      width={76}
                      height={76}
                    />
                  </div>
                  <div className="flex flex-col items-start justify-center ml-4">
                    <a
                      href={`https://www.twitch.tv/${val?.state.toLocaleLowerCase()}`}
                      target={"_blank"}
                      rel="noreferrer"
                      className="hover:text-[#9b65ff] transition-all duration-150 ease-in"
                    >
                      <p className="font-semibold self-left flex">
                        {val?.name}{" "}
                        <span>
                          <CgExternal size={24} />
                        </span>
                      </p>
                    </a>
                    <p className="text-[0.9rem] hidden md:block">
                      {val?.details}
                    </p>
                    <p className="text-[0.9rem]">{val?.state}</p>
                  </div>
                </div>
              );
            }

            if (val?.name.toLocaleLowerCase() === "spotify") {
              return (
                <div className={boxStyle} key={index}>
                  <div>
                    <img
                      src={`${data?.spotify?.album_art_url}`}
                      className="rounded-md"
                      width={76}
                      height={76}
                    />
                  </div>
                  <div className="flex flex-col items-start justify-center ml-4">
                    <a
                      href={`https://open.spotify.com/track/${data?.spotify?.track_id}`}
                      target={"_blank"}
                      rel="noreferrer"
                      className="hover:text-[#1DB954] transition-all duration-150 ease-in"
                    >
                      <p className="font-semibold self-left flex">
                        {val?.name}{" "}
                        <span>
                          <CgExternal size={24} />
                        </span>
                      </p>
                    </a>
                    <p className="text-[0.9rem]">by {data?.spotify?.artist}</p>
                    <p className="text-[0.9rem]">on {data?.spotify?.album}</p>
                  </div>
                </div>
              );
            }

            return (
              <div className={boxStyle} key={index}>
                <div>
                  <img
                    src={`${val?.assets?.large_image.replace(
                      /.*https/g,
                      "https:/"
                    )}`}
                    className="rounded-md"
                    width={76}
                    height={76}
                  />
                </div>
                <div className="flex flex-col items-start justify-center ml-4">
                  <p className="font-semibold self-left">{val?.name}</p>
                  <p className="text-[0.9rem]">{val?.details}</p>
                  <p className="text-[0.9rem]">{val?.state}</p>
                </div>
              </div>
            );
          })}
        </section>
      </div>
    </Container>
  );
}

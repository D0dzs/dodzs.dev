import { useRouter } from "next/router";
import React from "react";
import Container from "../components/Container";
import discordData from "../utils/discordData";
import { CgExternal } from "react-icons/cg";

export default function Discord() {
  const router = useRouter();
  const data = discordData("401390393746259978");
  const boxStyle =
    "flex flex-row bg-zinc-600 shadow-xl p-2 rounded-xl w-96 min-w-0";

  return (
    <Container>
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="my-8 font-semibold text-3xl font-mono text-[#7c85e9] flex flex-col">
          <span className="first-letter:text-[#5865F2]">Discord Presences</span>
          <span className="text-sm text-white self-center min-w-0">
            Aktív:{" "}
            {data?.activities.length == 0 ? "N/A" : data?.activities.length}
          </span>
        </h1>
        <section className="flex flex-col gap-8 select-none m-8 md:flex-row flex-wrap md:w-[1120px] flex-auto justify-center">
          {data?.activities.length == 0 ? (
            <div className="font-mono text-xl text-center text-gray-300">
              Sajnos{" "}
              <span className="bg-gradient-to-r from-orange-400 to-red-500 text-transparent bg-clip-text min-w-min font-extrabold">
                {data?.discord_user.username}
              </span>{" "}
              jelenleg nem játszik semmivel :(
            </div>
          ) : null}

          {data?.activities.map((val, index) => {
            if (val?.assets?.large_text.match("PreMiD")) {
              let srcURL = val?.assets?.large_image;
              let httpsURL = srcURL.startsWith("mp:external") ? true : false;
              if (httpsURL) {
                srcURL = srcURL.replace(
                  /.*mp:external/g,
                  "https://media.discordapp.net/external"
                );
              } else {
                srcURL = `https://cdn.discordapp.com/app-assets/${val?.application_id}/${val?.assets.large_image}.png`;
              }

              return (
                <div className={boxStyle} key={index}>
                  <div className="self-center">
                    <img
                      src={srcURL}
                      className="rounded-md max-w-xs"
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
            }

            if (val?.name.toLocaleLowerCase() === "spotify") {
              return (
                <div className={boxStyle} key={index}>
                  <div className="self-center">
                    <img
                      src={`${data?.spotify?.album_art_url}`}
                      className="rounded-md"
                      width={76}
                      height={76}
                    />
                  </div>
                  <div className="flex flex-col items-start justify-center ml-4 min-w-0">
                    <a
                      href={`https://open.spotify.com/track/${data?.spotify?.track_id}`}
                      target={"_blank"}
                      rel="noreferrer"
                      className="text-[#68fd9c] md:hover:text-[#1DB954] md:text-white transition-all duration-150 ease-in"
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

            if (val?.name.toLocaleLowerCase() === "skyblock") {
              return (
                <div className={boxStyle} key={index}>
                  <div className="self-center">
                    <img
                      src={`https://cdn.discordapp.com/app-assets/${val?.application_id}/${val?.assets?.large_image}.png`}
                      className="rounded-md max-w-xs"
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
            }

            return (
              <div className={boxStyle} key={index}>
                <div className="self-center">
                  <img
                    src={`${val?.assets?.large_image.replace(
                      /.*https/g,
                      "https:/"
                    )}`}
                    className="rounded-md max-w-xs"
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

import React, { useEffect, useState } from "react";
import Container from "../components/Container";
import { useLanyardWs } from "use-lanyard";
import { padTo2Digits } from "../utils/padTo2Digits";
import { getHMS } from "../utils/getHMS";
import { BiLinkExternal } from "react-icons/bi";
import { motion } from "framer-motion";

export default function Discord() {
  const boxStyle =
    "flex flex-row w-auto bg-zinc-800/50 m-4 rounded-lg overflow-hidden md:w-1/2";
  const data = useLanyardWs("401390393746259978");
  const [time, setTime] = useState(0);
  const [count, setCount] = useState<number>(0);
  useEffect(() => {
    setInterval(() => {
      setTime(new Date().getTime());
    }, 1000);

    return () => {
      clearInterval();
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setCount(data?.activities?.length!);
    }, 2 * 1000);
  }, []);

  const duration = 0.5;
  const childDelay = 0.1;

  return (
    <Container>
      <div className="text-center p-4 mt-4 flex justify-center gap-0 flex-col">
        <h1 className="font-extrabold text-4xl bg-gradient-to-r from-[#cabdff] via-[#ffbc99] to-[#cabdff] bg-clip-text text-transparent bg-grad-anim">
          Discord Presences
        </h1>
        {data?.activities.length == 0 ? null : (
          <span className="text-sm font-bold">
            {count! == 0 ? (
              "Loading..."
            ) : (
              <>{data?.activities.length} presence</>
            )}
          </span>
        )}
      </div>
      <motion.section className="flex justify-center flex-col mx-auto md:items-center md:flex-row md:min-w-screen xl:w-[70rem] md:flex-wrap md:flex-grow">
        {data?.activities.length == 0 && (
          <div className="text-slate-300 text-center mx-auto w-64 md:w-auto md:text-xl">
            Sajnálattal kell közölnöm, hogy{" "}
            <span className="font-extrabold text-orange-400">Zsolt</span>{" "}
            {data?.discord_status == "offline"
              ? "offline"
              : "nem foglalkozik semmivel"}
            .
          </div>
        )}
        {data?.activities?.map((app, index) => {
          if (app?.name.includes("HBO")) return;
          const appTimeStart = app?.timestamps?.start!;
          const eHours = padTo2Digits(getHMS(time - appTimeStart).hours);
          const eMins = padTo2Digits(getHMS(time - appTimeStart).mins);
          const eSecs = padTo2Digits(getHMS(time - appTimeStart).secs);
          const appTimeEnd = app?.timestamps?.end!;
          const lHours = padTo2Digits(getHMS(time - appTimeEnd).hours * -1 - 1);
          const lMins = padTo2Digits(getHMS(time - appTimeEnd).mins * -1 - 1);
          const lSecs = padTo2Digits(getHMS(time - appTimeEnd).secs * -1);
          const typeOfActivity = app?.type;

          switch (typeOfActivity) {
            case 0:
              return (
                <motion.div
                  className={boxStyle}
                  key={index}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: duration,
                    delay: index * childDelay,
                  }}
                >
                  <div className="w-24 flex items-center h-auto">
                    <img
                      src={
                        app?.assets?.large_image.startsWith("mp:external/")
                          ? app?.assets?.large_image!.replace(
                              /.*mp:external/g,
                              "https://media.discordapp.net/external"
                            )
                          : `https://cdn.discordapp.com/app-assets/${app?.application_id}/${app?.assets?.large_image}.png`
                      }
                      alt={app.name}
                      className="text-center h-24 object-cover"
                    />
                  </div>
                  <div className="flex flex-col self-center ml-3">
                    <h3 className="text-normal font-semibold">
                      {app?.name}{" "}
                      <span className="text-[.7rem] md:text-[.8rem]">
                        {app?.timestamps != undefined
                          ? app?.timestamps?.end
                            ? lHours > 0
                              ? `${lHours}:${lMins}:${lSecs} left`
                              : `${lMins}:${lSecs} left`
                            : eHours > 0
                            ? `${eHours}:${eMins}:${eSecs} elapsed`
                            : `${eMins}:${eSecs} elapsed`
                          : "Paused"}
                      </span>
                    </h3>
                    <p className="text-[.8rem] md:text-[.9rem]">
                      {app?.details}
                      <br /> {app?.state ? app?.state : ""}
                    </p>
                  </div>
                </motion.div>
              );

            case 2:
              if (app?.name.match("Spotify")) {
                return (
                  <motion.div
                    className={boxStyle}
                    key={index}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: duration,
                      delay: index * childDelay,
                    }}
                  >
                    <div className="w-24 flex items-center h-auto">
                      <img
                        src={data?.spotify?.album_art_url}
                        alt={app.name}
                        className="w-full text-center h-full"
                      />
                    </div>
                    <div className="flex flex-col p-2 self-center ml-1 md:ml-2">
                      <a
                        href={`https://open.spotify.com/track/${data?.spotify?.track_id}`}
                        rel="noreferrer"
                        className="text-[#1ed760] md:text-white md:hover:text-[#1ed760] transition-colors duration-150 ease-in-out"
                        target={"_blank"}
                      >
                        <p className="flex items-center">
                          <span className="text-normal font-semibold mr-1">
                            {app?.name}
                          </span>
                          <BiLinkExternal size={18} />
                          <span className="text-[.7rem] md:text-[.8rem] text-white ml-1">
                            {app?.timestamps ? (
                              eHours > 0 ? (
                                `${lHours}:${lMins}:${lSecs} left`
                              ) : (
                                `${lMins}:${lSecs} left`
                              )
                            ) : (
                              <span>Paused</span>
                            )}
                          </span>
                        </p>
                      </a>
                      <p className="text-[.8rem] md:text-[.9rem]">
                        {data?.spotify?.song.length! > 20 ||
                        data?.spotify?.artist.length! > 20 ? (
                          <>Listening {data?.spotify?.song}</>
                        ) : (
                          <>
                            by {data?.spotify?.artist}
                            <br />
                            on {data?.spotify?.song}
                          </>
                        )}
                      </p>
                    </div>
                  </motion.div>
                );
              }

            case 4:
              return (
                <motion.div
                  className={boxStyle}
                  key={index}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: duration,
                    delay: index * childDelay,
                  }}
                >
                  <img
                    src={`https://cdn.discordapp.com/emojis/${app?.emoji?.id}${
                      app?.emoji?.animated ? ".gif" : ".webp"
                    }?size=64&quality=lossless`}
                    alt={app?.emoji?.name}
                    className="h-[64px] self-end mx-4"
                  />
                  <p className="p-1 self-center text-sm">{app?.state}</p>
                </motion.div>
              );

            default:
              return;
          }
        })}
      </motion.section>
    </Container>
  );
}

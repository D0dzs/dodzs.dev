import React, { useEffect, useState } from "react";
import Container from "../components/Container";
import { CgExternal } from "react-icons/cg";
import { useLanyardWs } from "use-lanyard";
import { motion } from "framer-motion";

export default function Discord() {
  const [time, setTime] = useState(0);
  const data = useLanyardWs("401390393746259978");
  const boxStyle =
    "flex flex-row bg-white/5 backdrop-blur-sm shadow-xl rounded-xl w-96 min-w-0 md:hover:bg-white/10 md:transition-all";
  const imgWH = 100;
  const duration = 0.4;
  const childDelay = 0.2;

  useEffect(() => {
    setInterval(() => {
      setTime(new Date().getTime());
    }, 1000);
  });

  return (
    <Container>
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="my-8 font-semibold text-3xl font-mono text-[#7c85e9] flex flex-col">
          <span className="first-letter:text-[#5865F2]">Discord Presences</span>
          <span
            className={`text-sm text-slate-400 self-center min-w-0 ${
              data?.activities.length == 0 ? "hidden" : "block"
            }`}
          >
            Aktív:{" "}
            {data?.activities.length == 0 ? "N/A" : data?.activities.length}
          </span>
        </h1>
        <motion.section className="flex flex-col gap-8 select-none m-8 md:flex-row flex-wrap md:min-w-screen flex-auto justify-center lg:w-full">
          {data?.activities.length == 0 ? (
            <div className="font-mono text-xl text-center text-gray-300">
              Sajnos{" "}
              <span className="bg-gradient-to-r from-orange-400 to-red-500 text-transparent bg-clip-text min-w-min font-extrabold">
                {data?.discord_user.username}
              </span>{" "}
              nem elérhető vagy épp semmit nem csinál.
            </div>
          ) : null}

          {data?.activities.map((val, index) => {
            const startTimestampGlobal = val?.timestamps?.start;
            const hours =
              new Date(time - startTimestampGlobal!).getUTCHours() == 0
                ? null
                : `${new Date(time - startTimestampGlobal!).getUTCHours()}:`;
            const minutes =
              new Date(time - startTimestampGlobal!).getUTCMinutes() > 9
                ? `${new Date(time - startTimestampGlobal!).getUTCMinutes()}`
                : `0${new Date(time - startTimestampGlobal!).getUTCMinutes()}`;
            const seconds =
              new Date(time - startTimestampGlobal!).getUTCSeconds() > 9
                ? `${new Date(time - startTimestampGlobal!).getUTCSeconds()}`
                : `0${new Date(time - startTimestampGlobal!).getUTCSeconds()}`;

            if (val?.assets?.large_text.match("PreMiD")) {
              let srcURL = val?.assets?.large_image;
              let httpsURL = srcURL.startsWith("mp:external/") ? true : false;

              if (httpsURL) {
                srcURL = srcURL.replace(
                  /.*mp:external/g,
                  "https://media.discordapp.net/external"
                );
              } else {
                srcURL = `https://cdn.discordapp.com/app-assets/${val?.application_id}/${val?.assets.large_image}.png`;
              }

              if (val?.name.match("Twitch")) {
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
                    <div className="self-center">
                      <img
                        src={srcURL}
                        className="rounded-md h-full"
                        width={imgWH}
                        height={imgWH}
                        alt={val?.name}
                      />
                    </div>
                    <div className="flex flex-col items-start justify-center ml-4 min-w-0">
                      <a
                        href={`https://twitch.tv/${val?.state}`}
                        target={"_blank"}
                        rel="noreferrer"
                        className="text-[#9971e4] md:hover:text-[#815fc0] md:text-white transition-all duration-150 ease-in"
                      >
                        <p className="font-semibold self-left flex">
                          {val?.name}{" "}
                          <span>
                            <CgExternal size={24} />
                          </span>
                        </p>
                      </a>
                      <p className="text-xs">
                        Watching: <strong>{val?.state}</strong>
                      </p>
                      <p className="text-[0.7rem]">
                        {hours}
                        {minutes}:{seconds} elapsed
                      </p>
                    </div>
                  </motion.div>
                );
              }

              if (isNaN(val?.timestamps?.start!)) {
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
                    <div className="self-center">
                      <img
                        src={srcURL}
                        className="rounded-md h-full"
                        width={imgWH}
                        height={imgWH}
                        alt={val?.name}
                      />
                    </div>
                    <div className="flex flex-col items-start justify-center ml-4">
                      <p className="font-semibold self-left">{val?.name}</p>
                      <p className="text-xs">{val?.details}</p>
                      <p className="text-xs">{val?.state}</p>
                    </div>
                  </motion.div>
                );
              }

              return (
                <motion.div
                  className={boxStyle}
                  key={index}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: duration, delay: index * childDelay }}
                >
                  <div className="self-center">
                    <img
                      src={srcURL}
                      className="rounded-md h-full"
                      width={imgWH}
                      height={imgWH}
                      alt={val?.name}
                    />
                  </div>
                  <div className="flex flex-col items-start justify-center ml-4">
                    <p className="font-semibold self-left">{val?.name}</p>
                    <p className="text-xs">{val?.details}</p>
                    <p className="text-xs">{val?.state}</p>
                    <p className="text-[0.7rem] mt-1">
                      {hours}
                      {minutes}:{seconds} elapsed
                    </p>
                  </div>
                </motion.div>
              );
            }

            if (val?.name.match("Spotify")) {
              const startTimestamp = data?.spotify?.timestamps.start;
              const shours =
                new Date(time - startTimestamp!).getUTCHours() == 0
                  ? null
                  : `${new Date(time - startTimestamp!).getUTCHours()}:`;
              const sminutes =
                new Date(time - startTimestamp!).getUTCMinutes() > 9
                  ? `${new Date(time - startTimestamp!).getUTCMinutes()}`
                  : `0${new Date(time - startTimestamp!).getUTCMinutes()}`;
              const sseconds =
                new Date(time - startTimestamp!).getUTCSeconds() > 9
                  ? `${new Date(time - startTimestamp!).getUTCSeconds()}`
                  : `0${new Date(time - startTimestamp!).getUTCSeconds()}`;

              return (
                <motion.div
                  className={boxStyle}
                  key={index}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: duration, delay: index * childDelay }}
                >
                  <div className="self-center">
                    <img
                      src={`${data?.spotify?.album_art_url}`}
                      className="rounded-md h-full"
                      width={imgWH}
                      height={imgWH}
                      alt={val?.name}
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
                    <p className="text-xs">by {data?.spotify?.artist}</p>
                    <p className="text-xs">on {data?.spotify?.album}</p>
                    <p className="text-[0.7rem] mt-1">
                      {shours}
                      {sminutes}:{sseconds}/
                      {new Date(
                        data?.spotify?.timestamps.end! - startTimestamp!
                      ).getUTCMinutes()}
                      :
                      {new Date(
                        data?.spotify?.timestamps.end! - startTimestamp!
                      ).getUTCSeconds()}
                    </p>
                  </div>
                </motion.div>
              );
            }

            if (val?.name.match("Skyblock")) {
              const url = isNaN(parseInt(val?.assets?.large_image!))
                ? "https://cdn.discordapp.com/app-assets/653443797182578707/722248663555899515.png"
                : `https://cdn.discordapp.com/app-assets/${val?.application_id}/${val?.assets?.large_image}.png`;
              return (
                <motion.div
                  className={boxStyle}
                  key={index}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: duration, delay: index * childDelay }}
                >
                  <div className="self-center h-full">
                    <img
                      src={url}
                      className="rounded-md"
                      width={imgWH}
                      height={imgWH}
                      alt={val?.name}
                    />
                  </div>
                  <div className="flex flex-col items-start justify-center ml-4">
                    <p className="font-semibold self-left">{val?.name}</p>
                    <p className="text-xs">{val?.details}</p>
                    <p className="text-xs">{val?.state}</p>
                    <p className="text-[0.7rem] mt-1">
                      {hours}
                      {minutes}:{seconds} elapsed
                    </p>
                  </div>
                </motion.div>
              );
            }

            return (
              <motion.div
                className={boxStyle}
                key={index}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: duration, delay: index * childDelay }}
              >
                <div className="self-center">
                  <img
                    src={`${val?.assets?.large_image.replace(
                      /.*https/g,
                      "https:/"
                    )}`}
                    className="rounded-md h-full"
                    width={imgWH}
                    height={imgWH}
                    alt={val?.name}
                  />
                </div>
                <div className="flex flex-col items-start justify-center ml-4">
                  <p className="font-semibold self-left">{val?.name}</p>
                  <p className="text-xs">{val?.details}</p>
                  <p className="text-xs">{val?.state}</p>
                  <p className="text-[0.7rem] mt-1">
                    {isNaN(val?.timestamps?.start!) ? null : hours}
                    {minutes}:{seconds} elapsed
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.section>
      </div>
    </Container>
  );
}

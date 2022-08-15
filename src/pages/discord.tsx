import React, { useEffect, useState } from "react";
import Container from "../components/Container";
import { useLanyardWs } from "use-lanyard";
import { padTo2Digits } from "../utils/padTo2Digits";
import { getHMS } from "../utils/getHMS";
import { httpsRegEx } from "../utils/httpsRegEx";
import { BiLinkExternal } from "react-icons/bi";
import { motion } from "framer-motion";

export default function Discord() {
  const boxStyle =
    "flex flex-row w-auto bg-zinc-800/50 m-4 rounded-2xl overflow-hidden md:w-1/2";
  const data = useLanyardWs("401390393746259978");
  const [time, setTime] = useState(0);
  useEffect(() => {
    setInterval(() => {
      setTime(new Date().getTime());
    }, 1000);

    return () => {
      clearInterval();
    };
  }, []);

  const duration = 0.5;
  const childDelay = 0.1;

  return (
    <Container>
      <div className="text-center font-extrabold p-4 mt-4 flex justify-center gap-0 flex-col">
        <h1 className="text-4xl first-letter:text-[#6976ff] text-[#7883ff]">
          Discord Presences
          <br />
        </h1>
        <motion.span className="text-sm">
          Aktív: {data?.activities.length}
        </motion.span>
      </div>
      <motion.section className="flex justify-center flex-col mx-auto md:items-center md:flex-row md:w-[70rem] md:flex-wrap md:flex-grow">
        {data?.activities.map((app, index) => {
          if (app?.name.match("HBO Max")) return null;
          const appTimeStart = app?.timestamps?.start!;
          const eHours = padTo2Digits(getHMS(time - appTimeStart).hours);
          const eMins = padTo2Digits(getHMS(time - appTimeStart).mins);
          const eSecs = padTo2Digits(getHMS(time - appTimeStart).secs);
          const appTimeEnd = app?.timestamps?.end!;
          const lHours = padTo2Digits(getHMS(time - appTimeEnd).hours * -1 - 1);
          const lMins = padTo2Digits(getHMS(time - appTimeEnd).mins * -1 - 1);
          const lSecs = padTo2Digits(getHMS(time - appTimeEnd).secs * -1);

          if (app?.timestamps?.end) {
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
                      </p>
                    </a>
                    <p className="text-[.8rem] md:text-[.9rem]">
                      Listening {data?.spotify?.song}
                    </p>
                    <p className="text-[.7rem] md:text-[.8rem]">
                      {app?.timestamps ? (
                        eHours > 0 ? (
                          `${lHours}:${lMins}:${lSecs} left`
                        ) : (
                          `${lMins}:${lSecs} left`
                        )
                      ) : (
                        <span>Paused</span>
                      )}
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
                transition={{
                  duration: duration,
                  delay: index * childDelay,
                }}
              >
                <div className="w-24 flex items-center h-auto">
                  <img
                    src={httpsRegEx(app?.assets?.large_image!)}
                    alt={app.name}
                    className="w-full text-center h-full"
                  />
                </div>
                <div className="flex flex-col p-2 self-center ml-1 md:ml-2">
                  <h3 className="text-normal font-semibold">{app?.name}</h3>
                  <p className="text-[.8rem] md:text-[.9rem]">
                    {app?.name.match("Netflix")
                      ? `${app?.details} ${app.state}`
                      : app.details}
                  </p>
                  <p className="text-[.7rem] md:text-[.8rem]">
                    {app?.timestamps ? (
                      eHours > 0 ? (
                        `${lHours}:${lMins}:${lSecs} left`
                      ) : (
                        `${lMins}:${lSecs} left`
                      )
                    ) : (
                      <span>Paused</span>
                    )}
                  </p>
                </div>
              </motion.div>
            );
          } else {
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
                      httpsRegEx(app?.assets?.large_image!).includes(
                        "app-assets"
                      )
                        ? `${httpsRegEx(app?.assets?.large_image!)}${
                            app?.application_id
                          }/${app?.assets?.large_image}`
                        : httpsRegEx(app?.assets?.large_image!)
                    }
                    alt={app.name}
                    className="w-full text-center h-full"
                  />
                </div>
                <div className="flex flex-col p-2 self-center ml-1 md:ml-2">
                  <h3 className="text-normal font-semibold">{app?.name}</h3>
                  <p className="text-[.8rem] md:text-[.9rem]">
                    {app?.name.match("Netflix")
                      ? `${app?.details} ${app.state}`
                      : app.details}
                  </p>
                  <p className="text-[.7rem] md:text-[.8rem]">
                    {app?.timestamps ? (
                      eHours > 0 ? (
                        `${eHours}:${eMins}:${eSecs} elapsed`
                      ) : (
                        `${eMins}:${eSecs} elapsed`
                      )
                    ) : (
                      <span>Paused</span>
                    )}
                  </p>
                </div>
              </motion.div>
            );
          }
        })}
      </motion.section>
    </Container>
  );
}

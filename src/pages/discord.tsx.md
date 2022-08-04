import React from "react";
import Container from "../components/Container";
import getDiscordData from "../utils/getDiscordData";

export default function Discord() {
  const data = getDiscordData();
  return (
    <Container>
      <div className="flex justify-center items-center flex-row gap-4">
        {data.user.username}#{data.user.discriminator}
        <a
          href={`https://cdn.discordapp.com/avatars/${data.user.user_id}/${data.user.avatar}?size=1024&quality=lossless`}
          target="_blank"
          rel="noreferrer"
        >
          avatar
        </a>
      </div>
    </Container>
  );
}

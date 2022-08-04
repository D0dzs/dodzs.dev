import { useLanyard } from "use-lanyard";

export default function getDiscordData() {
  const { data: user } = useLanyard("401390393746259978");
  return {
    user: {
      username: user?.discord_user.username,
      avatar: user?.discord_user.avatar,
      user_id: user?.discord_user.id,
      discriminator: user?.discord_user.discriminator,
    },
  };
}

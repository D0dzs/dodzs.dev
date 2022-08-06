import { useLanyardWs } from "use-lanyard";

export default function discordData(id: string) {
  const user = useLanyardWs(id);
  //   console.log(user);
  if (!user) return console.log("No user found.");
  return user;
}

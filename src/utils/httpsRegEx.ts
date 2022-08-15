export function httpsRegEx(url: string) {
  let httpsURL = url.startsWith("mp:external/") ? true : false;

  if (httpsURL) {
    url = url.replace(
      /.*mp:external/g,
      "https://media.discordapp.net/external"
    );
  } else {
    url = `https://cdn.discordapp.com/app-assets/`;
  }

  return url;
}

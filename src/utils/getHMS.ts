export function getHMS(milliseconds: number) {
  let secs = Math.floor(milliseconds / 1000);
  let mins = Math.floor(secs / 60);
  let hours = Math.floor(mins / 60);

  secs %= 60;
  mins %= 60;
  hours %= 24;
  return { hours, mins, secs };
}

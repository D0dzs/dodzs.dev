export function padTo2Digits(n: number) {
  return n < 10 ? `0${n}` : n;
}

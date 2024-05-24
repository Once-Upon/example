export function truncateMiddle(s: string) {
  if (s.length <= 10) return s;
  return `${s.substring(0, 5)}...${s.substring(s.length - 5, s.length)}`;
}

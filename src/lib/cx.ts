/** Tiny class joiner. Avoids pulling in clsx + tailwind-merge for one use. */
export function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

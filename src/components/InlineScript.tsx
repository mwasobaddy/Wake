/**
 * Inline script that runs during HTML parsing, before the first paint.
 * Follows the Next.js guide "Preventing flash before hydration": the server
 * emits an executable script, the client emits an inert one (it has already
 * run by then), and suppressHydrationWarning accepts the DOM the script
 * mutated rather than the server's payload.
 */
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useRef,
  type ReactElement,
  type ReactNode,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WORD_CLASS = "float-word";

let refreshQueued = false;

/**
 * ScrollTrigger measures on creation, so anything that shifts layout after
 * mount (late fonts, the 3D stage settling, the catalogue filter) leaves every
 * trigger pointing at the wrong offset. Coalesce all of those into one refresh
 * on the next frame instead of letting thirty components each schedule their own.
 */
export function refreshFloats() {
  if (refreshQueued) return;
  refreshQueued = true;
  requestAnimationFrame(() => {
    refreshQueued = false;
    ScrollTrigger.refresh();
  });
}

function splitText(text: string, split: "word" | "char"): ReactNode[] {
  if (split === "char") {
    return text.split("").map((char, index) =>
      char === " " ? (
        " "
      ) : (
        <span className={WORD_CLASS} key={`${char}-${index}`}>
          {char}
        </span>
      ),
    );
  }
  return text
    .split(/(\s+)/)
    .filter(Boolean)
    .map((part, index) =>
      /^\s+$/.test(part) ? (
        part
      ) : (
        <span className={WORD_CLASS} key={`${part}-${index}`}>
          {part}
        </span>
      ),
    );
}

function hasRiseClass(className: unknown): boolean {
  if (typeof className !== "string") return false;
  return className.split(/\s+/).includes("rise");
}

/**
 * Walks the tree and wraps every run of text in word spans while leaving the
 * surrounding markup intact, so links and emphasis survive intact. A `rise`
 * span is passed through whole and animated as one unit: its gradient is painted
 * with background-clip, which fragments across nested inline boxes.
 */
function wrap(children: ReactNode, split: "word" | "char"): ReactNode {
  return Children.map(children, (child) => {
    if (child === null || child === undefined || typeof child === "boolean") {
      return null;
    }
    if (typeof child === "string" || typeof child === "number") {
      return splitText(String(child), split);
    }
    if (isValidElement(child)) {
      const element = child as ReactElement<{
        children?: ReactNode;
        className?: string;
      }>;
      if (element.props.children === undefined) return child;
      if (hasRiseClass(element.props.className)) {
        return cloneElement(element, {
          className: `${element.props.className} ${WORD_CLASS}`,
        });
      }
      return cloneElement(element, {}, wrap(element.props.children, split));
    }
    return child;
  });
}

type FloatTag =
  | "div"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "p"
  | "span"
  | "li";

interface FloatTextProps {
  children: ReactNode;
  as?: FloatTag;
  className?: string;
  split?: "word" | "char";
  /** Travel distance in px each word starts away from its resting place. */
  y?: number;
  stagger?: number;
  /**
   * Both ends are anchored so that every block can always reach them: a block
   * reveals as its top edge enters the viewport and finishes once it has risen
   * by its own height. A viewport-line start like "top 88%" is unreachable for
   * copy in the last screen, which has no scroll runway left, and would leave
   * that text invisible for good.
   */
  start?: string;
  end?: string;
  once?: boolean;
}

export default function FloatText({
  children,
  as: Tag = "div",
  className = "",
  split = "word",
  y = 20,
  stagger,
  start = "top bottom",
  end = "bottom bottom",
  once = true,
}: FloatTextProps) {
  const holder = useRef<HTMLElement | null>(null);
  // A callback ref is assignable to every host element's ref, which is what lets
  // one implementation render as an h2 here and a p there.
  const ref = useCallback((node: HTMLElement | null) => {
    holder.current = node;
  }, []);

  useEffect(() => {
    const el = holder.current;
    if (!el) return;

    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    let context: gsap.Context | undefined;

    const build = () => {
      context?.revert();
      context = undefined;
      if (query.matches) return;

      // Inside a flex container every word becomes a flex item and the
      // whitespace between them stops separating anything, so words would run
      // together. Refuse those outright instead of shipping glued text.
      if (getComputedStyle(el).display.includes("flex")) return;

      const words = el.querySelectorAll<HTMLElement>(`.${WORD_CLASS}`);
      if (words.length === 0) return;

      const count = words.length;
      context = gsap.context(() => {
        // Set the start state explicitly rather than leaning on fromTo's
        // immediateRender: that only writes the from values to the first target
        // when the tween is created before its siblings exist, which left every
        // block after the first character stuck at full opacity.
        gsap.set(words, { opacity: 0, y, willChange: "opacity, transform" });
        gsap.to(words, {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          stagger: stagger ?? Math.min(0.06, 1.2 / count),
          clearProps: "willChange",
          scrollTrigger: {
            trigger: el,
            start,
            end,
            scrub: true,
            once,
          },
        });
      }, el);
      refreshFloats();
    };

    build();

    const onPreferenceChange = () => build();
    query.addEventListener("change", onPreferenceChange);
    window.addEventListener("load", refreshFloats, { once: true });

    return () => {
      query.removeEventListener("change", onPreferenceChange);
      window.removeEventListener("load", refreshFloats);
      context?.revert();
    };
  }, [y, stagger, start, end, once]);

  return (
    <Tag ref={ref} className={className}>
      {wrap(children, split)}
    </Tag>
  );
}
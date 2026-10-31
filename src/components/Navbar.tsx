import { useEffect, useRef, useState } from "react";

const items = [
  ["Explore", "#sheet"],
  ["Characters", "#crew"],
  ["Story", "#cubbie-story"],
  ["About", "#about"],
];

export default function Navbar() {
const [hideLinks, setHideLinks] = useState(false);
const hiddenRef = useRef(false);

  useEffect(() => {
    let last = window.scrollY;
    let lockUntil = 0;
    const onScroll = () => {
      const y = window.scrollY;
      if (performance.now() < lockUntil) {
        last = y;
        return;
      }
      if (Math.abs(y - last) < 12) return;
      const hide = y > last && y > 120;
      last = y;
      if (hide !== hiddenRef.current) {
        hiddenRef.current = hide;
        lockUntil = performance.now() + 450;
        setHideLinks(hide);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-bg/85 backdrop-blur">
      <nav className="mx-auto flex max-w-[90rem] items-center justify-between gap-4 px-5 py-4 md:px-10">
        <a href="#top" className="display text-2xl leading-none">
          Cub<span className="text-acc">bie</span>
        </a>
        <div className="hidden gap-10 md:flex">
          {items.map(([n, h], i) => (
            <a key={n} href={h} className="kicker text-ink/70 transition hover:text-acc">
              <span className="mr-2 text-acc/70">0{i + 1}</span>
              {n}
            </a>
          ))}
        </div>
        <a
          href="#universe"
          className="kicker inline-flex min-h-11 items-center border border-acc bg-acc px-4 text-bg transition hover:bg-transparent hover:text-acc"
        >
          Enter Universe
        </a>
      </nav>

      <div
        aria-hidden={hideLinks}
        className={`grid transition-[grid-template-rows] duration-300 motion-reduce:transition-none md:hidden ${
          hideLinks ? "grid-rows-[0fr]" : "grid-rows-[1fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="no-bar flex gap-6 overflow-x-auto px-5">
            {items.map(([n, h]) => (
              <a
                key={n}
                href={h}
                tabIndex={hideLinks ? -1 : undefined}
                className="kicker inline-flex min-h-11 shrink-0 items-center text-dim"
              >
                {n}
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

import { useState } from "react";
import CubbieViewer from "./CubbieViewer";

const base = import.meta.env.BASE_URL;

const fade = {
  background:
    "linear-gradient(to bottom, #090A09 0%, rgba(9,10,9,0) 14%, rgba(9,10,9,0) 55%, #090A09 100%)",
};

export default function Hero() {
  const [ready, setReady] = useState(false);

  return (
    <section
      id="top"
      className="relative isolate flex flex-col overflow-hidden lg:min-h-[calc(100svh-4.5rem)] lg:justify-end"
    >
      <div className="relative h-[62svh] overflow-hidden lg:absolute lg:inset-0 lg:-z-10 lg:h-auto">
        
     <img
     src={`${base}images/characters/hero-bg.webp`}
     alt=""
     aria-hidden="true"
     width={1376}
     height={768}
     className="absolute inset-0 h-full w-full object-cover opacity-40"
     />
    <div
     className={`pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_72%_55%,rgba(196,245,106,0.12),transparent_60%)] transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
     />
    <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-bg via-bg/30 to-transparent lg:block" />
          
        <CubbieViewer
          src={`${base}models/cubbie.glb`}
          onReady={() => setReady(true)}
          className="absolute inset-0 translate-x-[13%] translate-y-[14%] lg:translate-x-0 lg:translate-y-[25%] lg:scale-[1.6] lg:left-[42%]"
        />
        <div className="pointer-events-none absolute inset-0" style={fade} />
      </div>

      <div className="pointer-events-none relative z-10 mx-auto -mt-2 w-full max-w-[90rem] px-5 pb-10 md:px-10 lg:mt-0 lg:pb-14">
        <p className="kicker rise text-acc" style={{ animationDelay: "0.05s" }}>
          Cubbie World · Character Universe
        </p>
        <h1
          className="display rise mt-5 text-[clamp(2.4rem,11vw,4rem)] lg:text-[clamp(2.7rem,min(6.4vw,12svh),7rem)]"
          style={{ animationDelay: "0.15s" }}
        >
          <span className="block">A little</span>
          <span className="block">character.</span>
          <span className="mt-1 block text-acc">A bigger</span>
          <span className="block text-acc">universe.</span>
        </h1>

        <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="rise pointer-events-auto" style={{ animationDelay: "0.3s" }}>
            <p className="max-w-xs text-lg text-dim">Collect your vibe. Build your Cubbie.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#crew"
                className="kicker bg-acc px-6 py-4 text-bg transition hover:bg-ink"
              >
                Meet the Cubbies →
              </a>
              <a
                href="#sheet"
                className="kicker border border-white/30 px-6 py-4 transition hover:border-acc hover:text-acc"
              >
                Explore the world
              </a>
            </div>
          </div>
          <a
            href="#sheet"
            className="kicker pointer-events-auto hidden items-center gap-3 text-dim transition hover:text-acc lg:flex"
          >
            Scroll <span className="nudge inline-block">↓</span>
          </a>
        </div>
      </div>
    </section>
  );
}

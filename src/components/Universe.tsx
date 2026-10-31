import { projects } from "../data/projects";

const base = import.meta.env.BASE_URL;

const notes = [
  "Browse and collect Cubbie NFTs.",
  "A research workspace for Web3 projects.",
  "Follow airdrop campaigns and tasks in one place.",
];

export default function Universe() {
  return (
    <section id="universe" className="relative isolate overflow-hidden">
      <img
        src={`${base}images/characters/universe.jpg`}
        alt="A small Cubbie explorer looks at a glowing green portal in a world of black monoliths"
        width={1376}
        height={768}
        loading="lazy"
        className="plx absolute inset-0 -z-20 h-full w-full object-cover object-[62%_center]"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-bg via-bg/60 to-bg" />
      <div className="absolute inset-0 -z-10 hidden bg-gradient-to-r from-bg/80 via-bg/20 to-transparent lg:block" />
      <div className="absolute inset-x-0 top-0 -z-10 h-32 bg-gradient-to-b from-bg to-transparent" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-bg to-transparent" />
      <div className="mx-auto flex min-h-[90svh] max-w-[90rem] flex-col justify-between gap-16 px-5 py-20 md:px-10 lg:py-28">
        <div>
          <p className="kicker text-acc">Beyond the character</p>
          <h2 className="display mt-5 text-[clamp(2.4rem,6.4vw,6.5rem)]">
            <span className="block">Cubbie</span>
            <span className="block">Universe</span>
          </h2>
          <p className="mt-6 max-w-md text-ink">
            Beyond the character is a whole world. Step through a portal to explore what is being built around Cubbie.
          </p>
        </div>

        <ul className="border-t border-white/25 lg:ml-auto lg:w-5/12">
          {projects.map((p, i) => (
            <li key={p.name} className="rv border-b border-white/25 bg-bg/70">
              <a
                href={p.url}
                target="_blank"
                rel="noreferrer"
                className="group grid grid-cols-[1fr_auto] items-center gap-x-5 px-4 py-5 transition hover:bg-bg/90"
              >
                <div>
                  <p className="kicker text-acc/80">Portal {String(i + 1).padStart(2, "0")}</p>
                  <h3 className={`font-d mt-2 font-bold uppercase ${i === 0 ? "text-2xl" : "text-lg"}`}>{p.name}</h3>
                  <p className="mt-1 text-sm text-dim">{notes[i]}</p>
                </div>
                <span className="kicker text-acc transition group-hover:translate-x-1">Enter →</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

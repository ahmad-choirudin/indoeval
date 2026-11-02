const src = `${import.meta.env.BASE_URL}images/characters/abstract.webp`;

const parts = [
  ["Circuit lines", "Lime paths that guide the way through the dark."],
  ["Glowing runes", "Old symbols that still hold a signal."],
  ["Floating bridges", "Platforms that link one world to the next."],
];

export default function AbstractAsset() {
  return (
    <section id="shapes" className="relative isolate scroll-mt-20 overflow-hidden">
      <img
        src={src}
        alt="Dark stone ruins with glowing lime circuit lines and runes, surrounded by green fog"
        width={1376}
        height={768}
        loading="lazy"
        className="plx absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-bg via-bg/65 to-bg" />
      <div className="absolute inset-0 -z-10 hidden bg-gradient-to-r from-bg/90 via-bg/30 to-transparent lg:block" />
      <div className="absolute inset-x-0 top-0 -z-10 h-32 bg-gradient-to-b from-bg to-transparent" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-bg to-transparent" />

      <div className="mx-auto flex min-h-[90svh] max-w-[90rem] flex-col justify-between gap-16 px-5 py-20 md:px-10 lg:py-28">
        <div className="rv">
          <p className="kicker text-acc">Ancient circuits</p>
          <h2 className="display mt-5 text-[clamp(2rem,5vw,4.5rem)]">
            <span className="block">The world runs</span>
            <span className="block">on light.</span>
          </h2>
          <p className="mt-6 max-w-md text-ink">
            Stone, fog and glowing lines: the ruins that Cubbie's world is built on.
          </p>
        </div>

        <div className="lg:ml-auto lg:w-5/12">
          <ul className="border-t border-white/25">
            {parts.map(([n, d], i) => (
              <li key={n} className="rv grid grid-cols-[2rem_1fr] gap-x-3 border-b border-white/25 bg-bg/70 py-4 pl-3">
                <span className="kicker pt-1 text-acc/70">0{i + 1}</span>
                <div>
                  <p className="font-d font-bold uppercase">{n}</p>
                  <p className="mt-1 text-sm text-dim">{d}</p>
                </div>
              </li>
            ))}
          </ul>

          <a
            href={src}
            download="cubbie-ancient-circuits.webp"
            className="kicker mt-8 inline-block border border-white/30 bg-bg/70 px-6 py-4 transition hover:border-acc hover:text-acc active:border-acc"
          >
            Save the asset ↓
          </a>
        </div>
      </div>
    </section>
  );
}

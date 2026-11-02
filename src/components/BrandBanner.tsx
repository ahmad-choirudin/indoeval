import { projects, socials } from "../data/projects";

const src = `${import.meta.env.BASE_URL}images/characters/banner.webp`;

export default function BrandBanner() {
  return (
    <section id="brand" className="relative isolate scroll-mt-20 overflow-hidden">
      <div className="relative h-72 overflow-hidden sm:h-96 lg:absolute lg:inset-0 lg:-z-10 lg:h-auto">
        <img
          src={src}
          alt="A Cubbie in a black tech jacket stands in a dark corridor of angular shapes lit by lime lines"
          width={1584}
          height={672}
          loading="lazy"
          className="plx h-full w-full object-cover object-[78%_center]"
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-bg to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-bg to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-3/5 bg-gradient-to-r from-bg via-bg/60 to-transparent lg:block" />
      </div>

      <div className="relative z-10 mx-auto max-w-[90rem] px-5 pb-24 pt-4 md:px-10 lg:flex lg:min-h-[80svh] lg:flex-col lg:justify-end lg:pb-24 lg:pt-40">
        <div className="lg:max-w-[46%]">
          <p className="kicker text-acc">Cubbie World</p>
          <h2 className="display mt-4 text-[clamp(3.6rem,15vw,5.5rem)] lg:text-[clamp(4.5rem,8.6vw,8.5rem)]">
            Cub<span className="text-acc">bie</span>
          </h2>
          <p className="mt-5 max-w-sm text-lg text-ink/80">Same soul. Different styles. Always Cubbie.</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={projects[0].url}
              target="_blank"
              rel="noreferrer"
              className="kicker bg-acc px-6 py-4 text-bg transition hover:bg-ink active:bg-ink"
            >
              {projects[0].name} →
            </a>
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="kicker border border-white/30 px-5 py-4 transition hover:border-acc hover:text-acc active:border-acc"
              >
                {s.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

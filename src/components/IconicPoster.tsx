import { characters } from "../data/characters";

const poster = characters.find((c) => c.id === "poster")!;

export default function IconicPoster() {
  return (
    <section
      id="poster"
      className="mx-auto max-w-[90rem] scroll-mt-20 px-5 py-24 md:px-10 lg:py-32"
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="rv mx-auto w-full max-w-md lg:order-2 lg:col-span-5 lg:col-start-7 lg:mx-0 lg:max-w-none">
          <div className="relative before:absolute before:inset-0 before:translate-x-3 before:translate-y-3 before:border before:border-acc/50 before:content-['']">
            <img
              src={poster.image}
              alt="A Cubbie in a varsity jacket sitting on a faceted throne, framed by a glowing ring"
              width={928}
              height={1152}
              loading="lazy"
              className="relative aspect-[4/5] w-full object-cover"
            />
          </div>
        </div>

        <div className="lg:order-1 lg:col-span-5 lg:col-start-1 lg:self-end lg:pb-12">
          <p className="kicker text-acc">{poster.label}</p>
          <h2 className="display mt-5 text-[clamp(2.6rem,6vw,5.5rem)]">
            <span className="block">Iconic</span>
            <span className="block">Poster</span>
          </h2>
          <p className="mt-6 max-w-md text-dim">{poster.description}</p>
          <p className="mt-3 max-w-md text-sm text-dim">
            One pose that sums up Cubbie: calm, sharp and a little bit legendary.
          </p>
          <a
            href={poster.image}
            download="cubbie-iconic-poster.webp"
            className="kicker mt-10 inline-block bg-acc px-6 py-4 text-bg transition hover:bg-ink"
          >
            Save the poster ↓
          </a>
        </div>
      </div>
    </section>
  );
}

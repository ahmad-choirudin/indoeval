const base = import.meta.env.BASE_URL;

const chapters = [
  {
    no: "01",
    title: "The Beginning",
    image: `${base}images/characters/story-1.webp`,
    alt: "A small Cubbie in a long coat stands in a corridor of black monoliths lit by green light",
    quote: "Every universe starts somewhere.",
    text: [
      "Cubbie did not wake up knowing where it came from. It simply opened its eyes in a world that had forgotten its name.",
      "Somewhere beyond the darkness, a strange light was calling.",
    ],
  },
];

export default function CubbieStory() {
  return (
    <section
      id="cubbie-story"
      className="mx-auto max-w-[90rem] scroll-mt-20 px-5 py-24 md:px-10 lg:py-32"
    >
      <p className="kicker text-acc">Editorial</p>
      <h2 className="display mt-5 text-[clamp(2.4rem,6vw,5.5rem)]">Cubbie Story</h2>
      <div className="mt-14 grid gap-24">
        {chapters.map((c, i) => (
          <article key={c.no} className="grid items-end gap-8 md:grid-cols-12">
            <figure className={`rv md:col-span-8 ${i % 2 ? "md:order-2" : ""}`}>
              <div className="bg-coal p-2 ring-1 ring-edge">
                <img
                  src={c.image}
                  alt={c.alt}
                  loading="lazy"
                  className="aspect-video w-full object-cover"
                />
              </div>
              <figcaption className="kicker mt-3 text-dim">Fig. {c.no}</figcaption>
            </figure>
            <div className={`rv md:col-span-4 ${i % 2 ? "md:order-1" : ""}`}>
              <p className="kicker text-acc">Chapter {c.no}</p>
              <h3 className="display mt-3 text-[clamp(1.6rem,2.6vw,2.4rem)]">{c.title}</h3>
              <blockquote className="mt-6 border-l-2 border-acc pl-4 font-d text-xl leading-snug">
                “{c.quote}”
              </blockquote>
              {c.text.map((p) => (
                <p key={p} className="mt-4 text-dim">{p}</p>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

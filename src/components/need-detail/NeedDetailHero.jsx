import Link from "next/link";
import Container from "@/components/landing/Container";

export default function NeedDetailHero({ detail }) {
  const { hero } = detail;

  return (
    <>
      <div className="pt-6">
        <Container>
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-[13px] uppercase tracking-[0.15em] text-mute transition-colors hover:text-ink"
          >
            <span aria-hidden="true">{"<-"}</span>
            All missionary needs
          </Link>
        </Container>
      </div>

      <section className="py-8 md:py-10">
        <Container>
          <p className="mb-6 font-mono text-[13px] uppercase tracking-[0.16em] text-mute">
            {hero.meta}
          </p>

          <h1 className="max-w-[18ch] font-fraunces text-5xl font-light leading-none tracking-[-0.03em] md:text-7xl xl:text-[96px]">
            {hero.titleBefore ? (
              <>
                {hero.titleBefore}{" "}
                <em className="not-italic text-terra">{hero.titleHighlight}</em>
                {hero.titleAfter ? ` ${hero.titleAfter}` : "."}
              </>
            ) : (
              <em className="italic">{hero.title}</em>
            )}
          </h1>

          <p className="mt-7 max-w-[54ch] text-[21px] font-light leading-[1.5] text-ink-2">
            {hero.lead}
          </p>
        </Container>
      </section>

      <Container>
        <div
          className="aspect-[21/9] rounded-[18px] bg-hair bg-cover bg-center"
          role="img"
          aria-label={hero.imageAlt}
          style={{ backgroundImage: `url('${hero.imageUrl}')` }}
        />
      </Container>
    </>
  );
}

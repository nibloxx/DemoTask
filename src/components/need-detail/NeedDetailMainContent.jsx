import Link from "next/link";
import { formatCurrency } from "@/lib/missionary-need-detail";

function SectionWrap({ eyebrow, title, children }) {
  return (
    <section className="border-t border-hair pt-[60px] first:border-t-0 first:pt-0">
      <p className="mb-5 font-mono text-[13px] uppercase tracking-[0.16em] text-mute">
        {eyebrow}
      </p>
      {title ? (
        <h2 className="mb-6 max-w-[22ch] font-fraunces text-[32px] font-light leading-[1.1] tracking-[-0.02em] md:text-5xl">
          {title}
        </h2>
      ) : null}
      {children}
    </section>
  );
}

function BudgetList({ budget, totalAmount }) {
  return (
    <div className="mt-7">
      {budget.items.map((item, index) => (
        <div
          key={`${item.name}-${index}`}
          className="grid grid-cols-1 gap-4 border-b border-hair-soft py-[18px] md:grid-cols-[1fr_auto] md:items-baseline"
        >
          <div>
            <div className="font-fraunces text-[19px] text-ink">{item.name}</div>
            {item.note ? (
              <small className="mt-1 block text-[14.5px] text-mute">{item.note}</small>
            ) : null}
          </div>
          <div className="text-right font-fraunces text-[19px] text-ink">
            {formatCurrency(item.amount)}
          </div>
        </div>
      ))}

      <div className="grid grid-cols-1 gap-4 border-t-[1.5px] border-ink py-6 md:grid-cols-[1fr_auto] md:items-baseline">
        <div className="font-fraunces text-[21px] italic text-ink">Total</div>
        <div className="text-right font-fraunces text-[26px] italic text-terra">
          {formatCurrency(totalAmount)}
        </div>
      </div>
    </div>
  );
}

function Timeline({ items }) {
  return (
    <div className="relative mt-7">
      <div className="absolute bottom-2 left-[7px] top-2 w-px bg-hair" />

      {items.map((item) => (
        <div key={`${item.date}-${item.title}`} className="relative pb-7 pl-9 last:pb-0">
          <div
            className={`absolute left-0 top-[7px] h-[14px] w-[14px] rounded-full border ${
              item.status === "done"
                ? "border-moss bg-moss"
                : item.status === "current"
                  ? "border-terra bg-terra shadow-[0_0_0_4px_rgba(177,74,44,0.18)]"
                  : "border-hair bg-paper"
            }`}
          />
          <div className="mb-1.5 font-mono text-[13px] uppercase tracking-[0.1em] text-mute">
            {item.date}
          </div>
          <div className="mb-1.5 font-fraunces text-xl text-ink">{item.title}</div>
          <p className="max-w-[50ch] text-base leading-[1.6] text-ink-2">{item.description}</p>
        </div>
      ))}
    </div>
  );
}

function Updates({ items }) {
  return (
    <div className="mt-7">
      {items.map((update, index) => (
        <article
          key={`${update.date}-${update.title}`}
          className={`py-7 ${index < items.length - 1 ? "border-b border-hair-soft" : ""}`}
        >
          <div className="mb-3 font-mono text-[13px] uppercase tracking-[0.1em] text-mute">
            {update.date}
          </div>
          <h3 className="mb-3.5 font-fraunces text-[23px] leading-[1.25] text-ink">
            {update.title}
          </h3>
          {update.body.map((paragraph) => (
            <p key={paragraph} className="mb-3.5 max-w-[60ch] text-[17px] leading-[1.6] text-ink-2">
              {paragraph}
            </p>
          ))}
          {update.photoUrl ? (
            <div
              className="my-4 aspect-[16/9] rounded-[10px] bg-hair bg-cover bg-center"
              role="img"
              aria-label={update.title}
              style={{ backgroundImage: `url('${update.photoUrl}')` }}
            />
          ) : null}
          <div className="mt-4 text-[14.5px] text-mute">
            - <strong className="font-medium text-ink">{update.author}</strong>
          </div>
        </article>
      ))}

      <Link
        href="#"
        className="mt-6 inline-block font-mono text-[13px] uppercase tracking-[0.15em] text-terra transition-colors hover:text-terra-deep"
      >
        All updates -&gt;
      </Link>
    </div>
  );
}

function HospitalCard({ hospital }) {
  return (
    <div className="mt-7 grid grid-cols-1 gap-6 rounded-[14px] border border-hair bg-bone p-6 md:grid-cols-[140px_1fr] md:items-center">
      <div
        className="aspect-[16/9] rounded-[10px] bg-hair bg-cover bg-center md:aspect-square"
        role="img"
        aria-label={hospital.name}
        style={{ backgroundImage: `url('${hospital.imageUrl}')` }}
      />

      <div>
        <h3 className="mb-1 font-fraunces text-[22px] text-ink">{hospital.name}</h3>
        <p className="mb-2.5 font-mono text-[13px] uppercase tracking-[0.12em] text-mute">
          {hospital.location}
        </p>
        <p className="max-w-none text-base leading-[1.55] text-ink-2">{hospital.description}</p>
        <Link
          href="#"
          className="mt-3 inline-block font-mono text-[13px] uppercase tracking-[0.15em] text-terra transition-colors hover:text-terra-deep"
        >
          Tour the hospital -&gt;
        </Link>
      </div>
    </div>
  );
}

export default function NeedDetailMainContent({ detail }) {
  return (
    <div className="space-y-[60px]">
      <SectionWrap eyebrow="Why this">
        <p className="mb-7 max-w-[48ch] font-fraunces text-2xl font-light italic leading-[1.4] text-ink">
          {detail.why.lede}
        </p>
        {detail.why.paragraphs.map((paragraph) => (
          <p key={paragraph} className="mb-[18px] max-w-[62ch] text-lg leading-[1.7] text-ink-2">
            {paragraph}
          </p>
        ))}
      </SectionWrap>

      <SectionWrap eyebrow="Where the money goes" title="Every line.">
        <p className="max-w-[62ch] text-lg leading-[1.7] text-ink-2">{detail.budget.description}</p>
        <BudgetList budget={detail.budget} totalAmount={detail.need.goal} />
      </SectionWrap>

      <SectionWrap eyebrow="How it ships" title="Funds release on milestones.">
        <p className="max-w-[62ch] text-lg leading-[1.7] text-ink-2">
          Each milestone has a deliverable that triggers the next disbursement.
        </p>
        <Timeline items={detail.timeline} />
      </SectionWrap>

      <SectionWrap eyebrow="Updates from the field" title="What the hospital is telling us.">
        <Updates items={detail.updates} />
      </SectionWrap>

      <SectionWrap eyebrow="The hospital" title={`${detail.hospital.name}.`}>
        <HospitalCard hospital={detail.hospital} />
      </SectionWrap>
    </div>
  );
}

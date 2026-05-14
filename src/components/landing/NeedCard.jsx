import Link from "next/link";

function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function NeedCard({ need }) {
  const progress = Math.min(Math.round((need.raised / need.goal) * 100), 100);
  const isUrgent = Boolean(need.urgentLabel);

  return (
    <Link href={`/needs/${need.id}`} className="group block h-full">
      <article className="flex h-full flex-col rounded-[20px] p-3 transition-all duration-500 hover:-translate-y-2 hover:bg-bone/70 hover:shadow-[0_22px_50px_rgba(67,57,46,0.10)]">
        <div className="overflow-hidden rounded-[14px]">
          <div
            className="relative mb-[18px] aspect-[4/3] overflow-hidden rounded-[14px] bg-hair bg-cover bg-center transition duration-500 ease-out group-hover:scale-[1.04] group-hover:brightness-[0.98]"
            style={{ backgroundImage: `url('${need.imageUrl}')` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-ink/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            {need.urgentLabel ? (
              <span className="absolute left-3.5 top-3.5 rounded-full bg-paper px-3 py-1.5 font-mono text-[13px] uppercase tracking-[0.12em] text-terra transition-transform duration-500 group-hover:-translate-y-0.5">
                {need.urgentLabel}
              </span>
            ) : null}
          </div>
        </div>

        <p className="mb-2.5 font-mono text-[13px] uppercase tracking-[0.1em] text-mute transition-colors duration-300 group-hover:text-ink-2">
          {need.hospital} / {need.country}
        </p>

        <h3 className="mb-2.5 overflow-hidden font-fraunces text-[25px] font-normal leading-[1.18] tracking-[-0.01em] transition-transform duration-500 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] group-hover:translate-x-1">
          {need.title}
        </h3>

        <p className="mb-[22px] overflow-hidden text-[16.5px] leading-[1.55] text-ink-2 transition-colors duration-300 group-hover:text-ink [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3]">
          {need.description}
        </p>

        <div className="mt-auto mb-2 flex items-baseline justify-between gap-4 text-[14.5px] text-ink-2">
          <span className="transition-transform duration-500 group-hover:translate-x-1">
            <strong className="font-medium text-ink">{formatCurrency(need.raised)}</strong> of{" "}
            {formatCurrency(need.goal)}
          </span>
          <span
            className={`font-mono text-[13px] transition-transform duration-500 group-hover:-translate-x-0.5 ${
              isUrgent ? "text-terra" : "text-moss"
            }`}
          >
            {progress}%
          </span>
        </div>

        <div className="h-[3px] overflow-hidden rounded-full bg-hair">
          <div
            className={`h-full rounded-full transition-all duration-500 group-hover:w-full ${
              isUrgent ? "bg-terra" : "bg-moss"
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </article>
    </Link>
  );
}

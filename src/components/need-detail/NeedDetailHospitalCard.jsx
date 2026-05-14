import Image from "next/image";
import Link from "next/link";

export default function NeedDetailHospitalCard({ hospital }) {
  return (
    <div className="mt-7 grid grid-cols-1 gap-6 rounded-[14px] border border-hair bg-bone p-6 md:grid-cols-[140px_1fr] md:items-center">
      <div className="relative aspect-[16/9] overflow-hidden rounded-[10px] bg-hair md:aspect-square">
        <Image
          src={hospital.imageUrl}
          alt={hospital.name}
          fill
          sizes="(min-width: 768px) 140px, 100vw"
          className="object-cover"
        />
      </div>

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
          Tour the hospital
        </Link>
      </div>
    </div>
  );
}

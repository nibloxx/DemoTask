import { totalActiveNeeds } from "@/lib/missionary-needs";
import Container from "./Container";
import NeedCard from "./NeedCard";

export default function NeedsGridSection({ needs }) {
  return (
    <section>
      <Container className="grid grid-cols-1 gap-y-6 py-14 md:grid-cols-2 md:gap-x-8 xl:grid-cols-3">
        <p className="text-[14.5px] text-mute md:col-span-2 xl:col-span-3">
          Showing {needs.length} of {totalActiveNeeds} needs
        </p>

        {needs.map((need) => (
          <NeedCard key={need.id} need={need} />
        ))}
      </Container>
    </section>
  );
}

import { notFound } from "next/navigation";
import NeedDetailPage from "@/components/need-detail/NeedDetailPage";
import { getMissionaryNeedById } from "@/lib/missionary-needs";

export function generateMetadata({ params }) {
  const need = getMissionaryNeedById(params.id);

  if (!need) {
    return {
      title: "Missionary Need | MissionaryDoctors",
    };
  }

  return {
    title: `${need.title} | MissionaryDoctors`,
    description: need.description,
  };
}

export default function NeedDetailRoute({ params }) {
  const need = getMissionaryNeedById(params.id);

  if (!need) {
    notFound();
  }

  return <NeedDetailPage need={need} />;
}

import { notFound } from "next/navigation";
import NeedDetailPage from "@/components/need-detail/NeedDetailPage";
import {
  getMissionaryNeedById,
  getMissionaryNeedDetail,
} from "@/lib/missionary-need-detail";

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
  const detail = getMissionaryNeedDetail(params.id);

  if (!detail) {
    notFound();
  }

  return <NeedDetailPage detail={detail} />;
}

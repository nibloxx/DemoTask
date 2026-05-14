"use client";

import { useMemo, useState } from "react";
import { missionaryNeeds } from "@/lib/missionary-needs";
import FilterBar from "./FilterBar";
import HeroSection from "./HeroSection";
import NeedsGridSection from "./NeedsGridSection";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";

function getSortedNeeds(needs, sortBy) {
  const sortedNeeds = [...needs];

  switch (sortBy) {
    case "almost-funded":
      return sortedNeeds.sort((firstNeed, secondNeed) => {
        const firstProgress = firstNeed.raised / firstNeed.goal;
        const secondProgress = secondNeed.raised / secondNeed.goal;

        return secondProgress - firstProgress;
      });
    case "recently-listed":
      return sortedNeeds.sort(
        (firstNeed, secondNeed) =>
          new Date(secondNeed.listedAt).getTime() - new Date(firstNeed.listedAt).getTime()
      );
    case "largest-goal":
      return sortedNeeds.sort((firstNeed, secondNeed) => secondNeed.goal - firstNeed.goal);
    case "most-urgent":
    default:
      return sortedNeeds.sort((firstNeed, secondNeed) => {
        if (firstNeed.urgentLabel && !secondNeed.urgentLabel) {
          return -1;
        }

        if (!firstNeed.urgentLabel && secondNeed.urgentLabel) {
          return 1;
        }

        return (firstNeed.daysLeft ?? Number.MAX_SAFE_INTEGER) -
          (secondNeed.daysLeft ?? Number.MAX_SAFE_INTEGER);
      });
  }
}

export default function MissionNeedsMainPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("most-urgent");

  const visibleNeeds = useMemo(() => {
    const filteredNeeds =
      activeCategory === "all"
        ? missionaryNeeds
        : missionaryNeeds.filter((need) =>
            activeCategory === "urgent"
              ? Boolean(need.urgentLabel)
              : need.category === activeCategory
          );

    return getSortedNeeds(filteredNeeds, sortBy);
  }, [activeCategory, sortBy]);

  return (
    <main>
      <Header />
      <HeroSection />
      <FilterBar
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />
      <NeedsGridSection needs={visibleNeeds} />
      <Footer />
    </main>
  );
}

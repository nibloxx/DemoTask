"use client";

import { useMemo, useState } from "react";
import {
  formatCurrency,
  getNeedProgress,
} from "@/lib/missionary-need-detail";

const PRESET_AMOUNTS = [25, 50, 100, 250, 500, 1000];
const DEFAULT_AMOUNT = 100;
const DONATION_PROMISES = [
  {
    strong: "100% to the project.",
    text: "No fees skimmed.",
  },
  {
    strong: "Tax-deductible",
    text: "through Giving Tree Projects, 501(c)(3).",
  },
  {
    strong: "Funds release on milestones,",
    text: "not in one block.",
  },
  {
    strong: "You'll see it through.",
    text: "Reports at every stage.",
  },
];

function getEstimatedClose(progress) {
  if (progress >= 85) {
    return "~5d";
  }

  if (progress >= 65) {
    return "~12d";
  }

  if (progress >= 45) {
    return "~21d";
  }

  return "~35d";
}

export default function NeedDetailDonateCard({ detail }) {
  const { need } = detail;
  const progress = getNeedProgress(need);
  const donorCount = Math.max(24, Math.round(need.raised / 229));
  const estimatedClose = getEstimatedClose(progress);
  const [selectedAmount, setSelectedAmount] = useState(DEFAULT_AMOUNT);
  const [customAmount, setCustomAmount] = useState("");

  const donateButtonLabel = useMemo(() => {
    const parsedCustomAmount = Number(customAmount);

    if (customAmount && Number.isFinite(parsedCustomAmount) && parsedCustomAmount > 0) {
      return `Give ${formatCurrency(parsedCustomAmount)}`;
    }

    return `Give ${formatCurrency(selectedAmount)}`;
  }, [customAmount, selectedAmount]);

  return (
    <aside className="lg:sticky lg:top-6 lg:self-start">
      <div className="rounded-[18px] border border-hair bg-bone p-[30px]">
        <div className="mb-2 font-fraunces text-5xl font-light italic leading-none tracking-[-0.02em] text-ink">
          <span className="not-italic text-terra">{formatCurrency(need.raised)}</span>
        </div>

        <div className="mb-[18px] text-[15.5px] text-mute">
          raised of{" "}
          <strong className="font-fraunces text-[17px] font-medium text-ink">
            {formatCurrency(need.goal)}
          </strong>
        </div>

        <div className="mb-[14px] h-[5px] overflow-hidden rounded-full bg-hair">
          <div
            className="h-full rounded-full bg-moss"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mb-[22px] flex gap-[22px] border-b border-hair pb-[22px] text-[13.5px] text-mute">
          <div>
            <strong className="mb-0.5 block text-base font-medium text-ink">{progress}%</strong>
            funded
          </div>
          <div>
            <strong className="mb-0.5 block text-base font-medium text-ink">
              {donorCount}
            </strong>
            donors
          </div>
          <div>
            <strong className="mb-0.5 block text-base font-medium text-ink">
              {estimatedClose}
            </strong>
            est. close
          </div>
        </div>

        <div className="mb-2.5 text-[14.5px] font-medium text-ink">Choose an amount</div>

        <div className="mb-2 grid grid-cols-3 gap-1.5">
          {PRESET_AMOUNTS.map((amount) => {
            const isActive = selectedAmount === amount && !customAmount;

            return (
              <button
                key={amount}
                type="button"
                onClick={() => {
                  setSelectedAmount(amount);
                  setCustomAmount("");
                }}
                className={`rounded-[10px] border px-1 py-[14px] font-fraunces text-[19px] transition-colors ${
                  isActive
                    ? "border-ink bg-ink text-paper"
                    : "border-hair bg-paper text-ink hover:border-ink"
                }`}
              >
                {formatCurrency(amount)}
              </button>
            );
          })}
        </div>

        <div className="mb-[14px] flex items-center overflow-hidden rounded-[10px] border border-hair bg-paper">
          <span className="px-[14px] font-fraunces text-[19px] text-mute">$</span>
          <input
            type="text"
            inputMode="numeric"
            value={customAmount}
            onChange={(event) => setCustomAmount(event.target.value.replace(/[^\d]/g, ""))}
            placeholder="Other amount"
            className="flex-1 bg-transparent py-[13px] pr-4 font-fraunces text-[19px] outline-none"
          />
        </div>

        <button
          type="button"
          className="block w-full rounded-[10px] bg-terra px-4 py-[17px] text-[15.5px] font-medium tracking-[-0.01em] text-bone transition-colors hover:bg-terra-deep"
        >
          {donateButtonLabel}
        </button>

        <div className="mt-5 border-t border-hair pt-5">
          {DONATION_PROMISES.map((promise) => (
            <div
              key={promise.strong}
              className="flex items-start gap-2.5 py-1.5 text-sm leading-[1.45] text-ink-2"
            >
              <span
                className="mt-[3px] h-[14px] w-[14px] shrink-0 bg-contain bg-no-repeat"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 14 14' fill='none'%3E%3Ccircle cx='7' cy='7' r='6.5' stroke='%233F5E48' stroke-width='1'/%3E%3Cpath d='M4 7l2.2 2.2L10 5.5' stroke='%233F5E48' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
                }}
              />
              <span>
                <strong className="font-medium text-ink">{promise.strong}</strong>{" "}
                {promise.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}

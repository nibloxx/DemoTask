"use client";

import { useState } from "react";

const FAQ_ITEMS = [
  {
    question: "What if it does not reach goal?",
    answer:
      "If a need times out without full funding, donors are given options to redirect their gift, support the hospital's general fund, or request a refund.",
    open: true,
  },
  {
    question: "What if it overshoots?",
    answer:
      "Anything raised beyond goal can be directed to the hospital's general fund with donor consent, or redirected elsewhere according to the giving flow.",
  },
  {
    question: "When is my gift tax-deductible?",
    answer:
      "At the moment you give. Donors receive a receipt from the sponsoring 501(c)(3) for the full amount of the gift.",
  },
  {
    question: "How do I know it actually got there?",
    answer:
      "Each disbursement triggers updates, documentation, and a final reconciliation so donors can track progress through project completion.",
  },
];

export default function NeedDetailFaq() {
  const [openItems, setOpenItems] = useState(
    FAQ_ITEMS.map((item, index) => (item.open ? index : null)).filter((value) => value !== null)
  );

  function toggleItem(index) {
    setOpenItems((currentItems) =>
      currentItems.includes(index)
        ? currentItems.filter((itemIndex) => itemIndex !== index)
        : [...currentItems, index]
    );
  }

  return (
    <section className="border-t border-hair pt-[60px]">
      <p className="mb-5 font-mono text-[13px] uppercase tracking-[0.16em] text-mute">
        Common questions
      </p>
      <h2 className="mb-6 max-w-[22ch] font-fraunces text-[32px] font-light leading-[1.1] tracking-[-0.02em] md:text-5xl">
        Things worth asking.
      </h2>

      <div className="mt-7">
        {FAQ_ITEMS.map((item, index) => {
          const isOpen = openItems.includes(index);

          return (
            <div
              key={item.question}
              className={`border-t border-hair-soft ${index === FAQ_ITEMS.length - 1 ? "border-b" : ""}`}
            >
              <button
                type="button"
                onClick={() => toggleItem(index)}
                className="flex w-full items-center justify-between gap-6 py-6 text-left font-fraunces text-[21px] text-ink"
              >
                <span>{item.question}</span>
                <span className="relative h-[18px] w-[18px] shrink-0">
                  <span className="absolute inset-x-0 top-1/2 h-[1.5px] -translate-y-1/2 bg-ink" />
                  <span
                    className={`absolute inset-y-0 left-1/2 w-[1.5px] -translate-x-1/2 bg-ink transition-transform duration-300 ${
                      isOpen ? "scale-y-0" : "scale-y-100"
                    }`}
                  />
                </span>
              </button>

              <div
                className={`grid transition-all duration-300 ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="pb-[22px] text-[17px] leading-[1.65] text-ink-2">{item.answer}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

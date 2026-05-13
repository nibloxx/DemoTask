import { missionaryNeeds } from "./missionary-needs";

export function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function getNeedProgress(need) {
  return Math.min(Math.round((need.raised / need.goal) * 100), 100);
}

function getPrimaryCategoryLabel(need) {
  const primaryCategory = need.categories[0] ?? "need";

  return primaryCategory.charAt(0).toUpperCase() + primaryCategory.slice(1);
}

function distributeGoal(goal, items) {
  let allocated = 0;

  return items.map((item, index) => {
    if (index === items.length - 1) {
      return {
        ...item,
        amount: goal - allocated,
      };
    }

    const amount = Math.round((goal * item.percent) / 100 / 100) * 100;
    allocated += amount;

    return {
      ...item,
      amount,
    };
  });
}

function buildBudgetItems(need) {
  const category = need.categories[0];

  const templates = {
    construction: [
      { name: "Core materials", note: "Primary build materials and fixtures", percent: 56 },
      { name: "Site labor", note: "Local contractor team and supervision", percent: 17 },
      { name: "Electrical and systems", note: "Panels, wiring, and commissioning", percent: 12 },
      { name: "Freight and logistics", note: "Regional transport and customs handling", percent: 7 },
      { name: "Training and handoff", note: "Staff onboarding and maintenance notes", percent: 4 },
      { name: "Contingency", note: "Reserved for cost movement and site surprises", percent: 4 },
    ],
    equipment: [
      { name: "Equipment procurement", note: "Quoted unit cost from approved vendor", percent: 61 },
      { name: "Shipping and customs", note: "Regional freight, taxes, and clearance", percent: 12 },
      { name: "Installation", note: "Biomedical setup and calibration", percent: 12 },
      { name: "Consumables", note: "Starter kits, accessories, and spares", percent: 7 },
      { name: "Training", note: "Operator training and service orientation", percent: 4 },
      { name: "Contingency", note: "Reserved for rate or freight movement", percent: 4 },
    ],
    training: [
      { name: "Tuition and placement", note: "Program fees and academic support", percent: 45 },
      { name: "Travel and lodging", note: "Required travel, housing, and meals", percent: 20 },
      { name: "Clinical supervision", note: "Rotation oversight and mentoring", percent: 16 },
      { name: "Materials and licensing", note: "Books, exams, and certification", percent: 9 },
      { name: "Admin support", note: "Coordination and reporting costs", percent: 5 },
      { name: "Contingency", note: "Reserved for schedule or fare changes", percent: 5 },
    ],
    urgent: [
      { name: "Critical supplies", note: "Immediate treatment and ward essentials", percent: 48 },
      { name: "Emergency staffing", note: "Short-term surge support", percent: 18 },
      { name: "Transport and delivery", note: "Rapid shipping and local movement", percent: 14 },
      { name: "Monitoring and reporting", note: "Field oversight and reconciliation", percent: 8 },
      { name: "Partner coordination", note: "Hospital logistics and procurement support", percent: 7 },
      { name: "Contingency", note: "Reserved for urgent market changes", percent: 5 },
    ],
  };

  return distributeGoal(goalRound(need.goal), templates[category] ?? templates.equipment);
}

function goalRound(goal) {
  return Math.round(goal);
}

function buildGenericTimeline(need) {
  const progress = getNeedProgress(need);

  return [
    {
      date: "Submitted / vetted / listed",
      title: "Proposal reviewed",
      description: `${need.hospital} submitted this project with pricing, scope, and implementation notes.`,
      status: "done",
    },
    {
      date: `Now / ${progress}% funded`,
      title: "Funding",
      description: `${formatCurrency(need.raised)} of ${formatCurrency(need.goal)} has been raised so far for ${need.title.toLowerCase()}.`,
      status: "current",
    },
    {
      date: "After full funding",
      title: "Equipment or materials ordered",
      description: "The first release is made when the quote is locked and purchasing is confirmed.",
      status: "upcoming",
    },
    {
      date: "On delivery",
      title: "On-site confirmation",
      description: "The next release follows delivery confirmation, photos, and implementation updates.",
      status: "upcoming",
    },
    {
      date: "Project close",
      title: "Final report",
      description: "A closeout update compares planned versus actual spend and summarizes outcomes.",
      status: "upcoming",
    },
  ];
}

function buildGenericUpdates(need) {
  const progress = getNeedProgress(need);

  return [
    {
      date: "Recent update",
      title: `${progress}% funded and moving forward`,
      body: [
        `${need.hospital} has reconfirmed the current scope and pricing for ${need.title.toLowerCase()}.`,
        "The hospital team is preparing documentation and local logistics so the project can move quickly once funding is complete.",
      ],
      author: "Project coordination team",
    },
    {
      date: "Earlier update",
      title: "Preparation work underway",
      body: [
        "Early preparation steps that do not require full disbursement are already being mapped and scheduled.",
      ],
      photoUrl: need.imageUrl,
      author: `${need.hospital} field team`,
    },
  ];
}

function buildGenericHospital(need) {
  return {
    name: need.hospital,
    location: `${need.country} / Mission hospital partner`,
    description: `${need.hospital} serves patients in ${need.country} and identified ${need.title.toLowerCase()} as a priority need for the coming year.`,
    imageUrl: need.imageUrl,
  };
}

const solarDetailOverride = {
  hero: {
    meta: "A missionary need / Construction / Loma de Luz / Honduras",
    titleBefore: "Solar power for the",
    titleHighlight: "maternity ward",
    lead: "A battery bank that holds the surgical and maternity wards through monthly grid outages.",
    imageUrl:
      "https://images.unsplash.com/photo-1503444200347-fa86187a2797?q=80&w=1400&auto=format&fit=crop",
  },
  why: {
    lede: "In April 2025, a fourteen-minute outage during a complicated delivery led to a near-miss.",
    paragraphs: [
      "Hospital Loma de Luz sits on the north coast of Honduras, where the grid loses power three or four times a month. The diesel generator takes ninety seconds to come online, and the maternity ward / neonatal warmers / fetal monitors / the OR next door cannot tolerate a ninety-second gap.",
      "The fix is a 96 kWh battery bank with smart inverters, sized for eighteen hours of uninterrupted draw across maternity, an adjacent OR, and pediatric ICU. Switchover is sub-second. Equipment does not reset.",
    ],
  },
  budget: {
    description:
      "Quotes are attached for each line item. Any contingency left over rolls into the hospital's general fund with donor consent.",
    items: [
      {
        name: "Battery bank, 96 kWh",
        note: "Four LFP modules with management system",
        amount: 48000,
      },
      {
        name: "Smart inverters and switchover",
        note: "Two hybrid inverters with auto-transfer",
        amount: 12800,
      },
      {
        name: "Installation and commissioning",
        note: "Three weeks / Soluciones Solares HN",
        amount: 11200,
      },
      {
        name: "Freight and customs",
        note: "Door-to-door from US distributor",
        amount: 5800,
      },
      {
        name: "Electrical panel upgrades",
        note: "Two sub-panels for ward circuits",
        amount: 2400,
      },
      {
        name: "Training and service",
        note: "One year remote monitoring",
        amount: 1600,
      },
      {
        name: "Contingency",
        note: "Three percent reserve",
        amount: 2200,
      },
    ],
  },
  timeline: [
      {
        date: "Jan 28, 2026 / Done",
        title: "Submitted, vetted, listed",
        description:
          "Hospital proposal received with quotes. Network team reviewed scope, pricing, and partner credentials.",
        status: "done",
      },
      {
        date: "Now / 85% funded",
        title: "Funding",
        description:
          "$71,400 of $84,000 raised across 312 donors. Fully funded within five days at current pace.",
        status: "current",
      },
      {
        date: "Est. May 25",
        title: "Equipment ordered / 40% releases",
        description:
          "First disbursement on full funding. Quote locked and equipment ordered.",
        status: "upcoming",
      },
      {
        date: "Est. July 28",
        title: "Equipment on site / 40% releases",
        description:
          "Second disbursement on customs clearance and on-site delivery. Photos posted.",
        status: "upcoming",
      },
      {
        date: "Est. Aug 22",
        title: "Commissioned / final 20% releases",
        description:
          "Third disbursement on commissioning and first successful grid-outage test.",
        status: "upcoming",
      },
      {
        date: "Aug 22, 2027",
        title: "One-year report",
        description:
          "Outcomes / uptime data / diesel savings / lessons. Posted publicly.",
        status: "upcoming",
      },
    ],
  updates: [
      {
        date: "May 2, 2026",
        title: "85% funded / equipment quote re-confirmed",
        body: [
          "Reconfirmed pricing with our vendor in Tegucigalpa given recent currency movement. Quote held. Install partner confirmed availability for August.",
          "Yesterday we lost grid power for two hours during an OB triage. Generator handled it, but a cesarean had to wait until power was stabilized - exactly the situation this need addresses.",
        ],
        author: "Dr. Andres Velasquez / Medical Director",
      },
      {
        date: "Apr 14, 2026",
        title: "Site preparation underway",
        body: [
          "While funding continues, preparation that does not require equipment has already started. The room next to the existing solar inverter house has been cleared and ward circuits were mapped this week.",
        ],
        photoUrl:
          "https://images.unsplash.com/photo-1605098293559-d6e0afaf21d4?w=1200&q=80&auto=format&fit=crop",
        author: "Mateo Ortiz / Hospital Engineer",
      },
    ],
  hospital: {
    name: "Hospital Loma de Luz",
    location: "Balfate, Honduras / Founded 1999 / 60 beds",
    description:
      "A mission hospital on the north coast of Honduras serving a region with limited rural healthcare. Operated by Cornerstone Foundation.",
    imageUrl:
      "https://images.unsplash.com/photo-1503444200347-fa86187a2797?q=80&w=900&auto=format&fit=crop",
  },
};

function buildBaseDetail(need) {
  const budgetItems = buildBudgetItems(need);

  return {
    hero: {
      meta: `A missionary need / ${getPrimaryCategoryLabel(need)} / ${need.hospital} / ${need.country}`,
      title: need.title,
      lead: need.description,
      imageUrl: need.imageUrl,
      imageAlt: `${need.title} / ${need.hospital} / ${need.country}`,
    },
    why: {
      lede: `${need.hospital} identified ${need.title.toLowerCase()} as one of its most immediate needs.`,
      paragraphs: [
        `${need.hospital} serves patients across ${need.country}, and this project will directly support care delivery where reliability, capacity, or access is currently constrained.`,
        `This need is listed with a clear project scope, milestone-based funding, and public updates so donors can follow the work from purchase through implementation.`,
      ],
    },
    budget: {
      description:
        "This estimate is broken into line items so donors can see how the full project cost is allocated.",
      items: budgetItems,
    },
    timeline: buildGenericTimeline(need),
    updates: buildGenericUpdates(need),
    hospital: buildGenericHospital(need),
  };
}

export function getMissionaryNeedById(id) {
  return missionaryNeeds.find((need) => need.id === id) ?? null;
}

export function getMissionaryNeedDetail(id) {
  const need = getMissionaryNeedById(id);

  if (!need) {
    return null;
  }

  const baseDetail = buildBaseDetail(need);
  const overrides = id === "solar-maternity-ward" ? solarDetailOverride : {};

  return {
    need,
    ...baseDetail,
    ...overrides,
    hero: {
      ...baseDetail.hero,
      ...overrides.hero,
    },
    why: {
      ...baseDetail.why,
      ...overrides.why,
    },
    budget: {
      ...baseDetail.budget,
      ...overrides.budget,
    },
    timeline: overrides.timeline ?? baseDetail.timeline,
    updates: overrides.updates ?? baseDetail.updates,
    hospital: {
      ...baseDetail.hospital,
      ...overrides.hospital,
    },
  };
}

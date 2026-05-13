"use client";

import Link from "next/link";
import { useState } from "react";
import { navigationLinks } from "@/lib/missionary-needs";
import Container from "../landing/Container";

function getInitialActiveLabel(links) {
  return links.find((link) => link.current)?.label ?? links[0]?.label ?? "Give";
}

function MenuToggleButton({ isOpen, onClick }) {
  return (
    <button
      type="button"
      aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
      aria-expanded={isOpen}
      onClick={onClick}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-hair bg-bone text-ink transition-colors hover:border-ink md:hidden"
    >
      <span className="relative block h-3.5 w-5">
        <span
          className={`absolute left-0 top-0 block h-[1.5px] w-5 bg-current transition-transform duration-200 ${
            isOpen ? "translate-y-[6px] rotate-45" : ""
          }`}
        />
        <span
          className={`absolute left-0 top-1.5 block h-[1.5px] w-5 bg-current transition-opacity duration-200 ${
            isOpen ? "opacity-0" : "opacity-100"
          }`}
        />
        <span
          className={`absolute left-0 top-3 block h-[1.5px] w-5 bg-current transition-transform duration-200 ${
            isOpen ? "-translate-y-[6px] -rotate-45" : ""
          }`}
        />
      </span>
    </button>
  );
}

function DesktopNavLink({ link, isActive, onClick }) {
  return (
    <Link
      href={link.href}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      className="group relative inline-flex items-center px-4 py-2.5 text-[15px] text-ink transition-all duration-300 hover:-translate-y-px"
    >
      <span>{link.label}</span>
      <span
        className={`pointer-events-none absolute bottom-0 left-1/2 h-[2px] w-[calc(100%-2rem)] -translate-x-1/2 overflow-hidden rounded-full transition-opacity duration-300 ${
          isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
      >
        <span
          className={`block h-full w-full rounded-full bg-terra transition-transform duration-300 ${
            isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
          }`}
        />
      </span>
    </Link>
  );
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuLinks = [...navigationLinks, { label: "Give", href: "#" }];
  const [activeLabel, setActiveLabel] = useState(() => getInitialActiveLabel(menuLinks));

  return (
    <header className="border-b border-hair bg-paper sticky top-0 z-30">
      <Container className="py-4 md:py-7">
        <div className="flex items-center justify-between gap-6">
          <Link
            href="/"
            className="font-fraunces text-[22px] font-normal leading-none tracking-[-0.01em] text-ink sm:text-2xl md:text-[28px]"
          >
            MissionaryDoctors
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {menuLinks.map((link) => (
              <DesktopNavLink
                key={link.label}
                link={link}
                isActive={activeLabel === link.label}
                onClick={() => setActiveLabel(link.label)}
              />
            ))}
          </nav>

          <MenuToggleButton
            isOpen={isMenuOpen}
            onClick={() => setIsMenuOpen((currentValue) => !currentValue)}
          />
        </div>

        <div
          className={`grid overflow-hidden transition-all duration-300 md:hidden ${
            isMenuOpen
              ? "mt-4 grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="min-h-0">
            <div className="rounded-[22px] border border-hair bg-bone p-4 shadow-sm">
              <nav className="flex flex-col gap-2">
                {menuLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => {
                      setActiveLabel(link.label);
                      setIsMenuOpen(false);
                    }}
                    aria-current={activeLabel === link.label ? "page" : undefined}
                    className={`rounded-full px-4 py-3 text-[15px] transition-colors ${
                      activeLabel === link.label
                        ? "bg-paper text-ink"
                        : "text-ink-2 hover:bg-paper hover:text-ink"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}

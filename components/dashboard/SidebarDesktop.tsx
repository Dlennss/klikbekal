import { ChevronDown, LogOut } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { BrandLogo } from "./BrandLogo";
import { NavItem } from "./NavItem";
import { type NavSection } from "./nav";

type Props = {
  sections: NavSection[];
  onLogout: () => void;
  contextLabel?: string;
};

export function SidebarDesktop({ sections, onLogout, contextLabel = "Control Center" }: Props) {
  const pathname = usePathname();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  return (
    <aside className="relative z-10 hidden w-72 shrink-0 self-start border-r border-white/10 bg-[linear-gradient(180deg,#071210_0%,#10211d_54%,#3a1734_140%)] shadow-[6px_0_30px_rgba(7,18,16,0.28)] md:sticky md:top-0 md:flex md:h-dvh md:flex-col">
      <div className="border-b border-white/10 px-5 py-5">
        <div className="flex justify-center">
          <BrandLogo variant="dark" />
        </div>
        <p className="mt-3 text-center text-[11px] font-bold uppercase tracking-[0.16em] text-[#ffc857]/80">
          {contextLabel}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-5">
        {sections.map((section, idx) => {
          const key = section.title || `section-${idx}`;
          const active = section.items.some((item) => pathname === item.href || pathname.startsWith(item.href + "/"));
          const isOpen = section.title ? openSections[key] ?? active : true;

          return (
            <div key={key} className={idx === 0 ? "space-y-1" : "mt-5 border-t border-white/10 pt-4"}>
              {section.title ? (
                <button
                  type="button"
                  className={`mb-3 flex w-full items-center justify-between rounded-lg border px-3 py-3 text-left text-[13px] font-bold tracking-normal outline-none transition focus-visible:ring-4 focus-visible:ring-[#ff7a1a]/25 ${
                    active
                      ? "border-[#ff7a1a]/55 bg-white text-[#3a1734] shadow-[0_12px_28px_rgba(255,122,26,0.16)]"
                      : "border-white/12 bg-white/8 text-white/82 shadow-[0_8px_20px_rgba(0,0,0,0.12)] hover:border-[#ff7a1a]/35 hover:bg-white/14 hover:text-white"
                  }`}
                  aria-expanded={isOpen}
                  onClick={() => setOpenSections((prev) => ({ ...prev, [key]: !isOpen }))}
                >
                  <span>{section.title}</span>
                  <ChevronDown className={`h-4 w-4 transition ${isOpen ? "rotate-180 text-[#ff7a1a]" : "text-white/58"}`} />
                </button>
              ) : null}
              {isOpen ? (
                <div className="space-y-1.5">
                  {section.items.map((item) => (
                    <NavItem key={item.href} href={item.href} label={item.label} variant="dark" />
                  ))}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      <div className="relative border-t border-white/10 p-4 shadow-[0_-5px_18px_rgba(0,0,0,0.12)]">
        <button
          type="button"
          onClick={onLogout}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-[#ff7a1a]/35 bg-[#ff7a1a] px-3 py-2.5 text-sm font-black text-white shadow-[0_12px_26px_rgba(255,122,26,0.20)] transition hover:bg-[#ff583f] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#ff7a1a]/25"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}

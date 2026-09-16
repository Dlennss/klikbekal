import { BrandLogo } from "./BrandLogo";
import { Menu } from "lucide-react";

type Props = {
  onOpenMenu: () => void;
};

export function HeaderMobile({ onOpenMenu }: Props) {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-[#071210]/96 px-4 py-3 shadow-[0_12px_28px_rgba(7,18,16,0.22)] backdrop-blur md:hidden">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <BrandLogo variant="dark" />
        </div>
        <button
          type="button"
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-white/12 bg-white/10 text-white shadow-sm"
          onClick={onOpenMenu}
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}


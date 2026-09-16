import { KlikBekalBrandLogo } from "@/components/shared/KlikBekalBrandLogo";

type BrandLogoProps = {
  variant?: "light" | "dark";
};

export function BrandLogo({ variant = "light" }: BrandLogoProps) {
  const isDark = variant === "dark";
  return (
    <div
      className={`inline-flex max-w-full items-center justify-center rounded-[14px] ${
        isDark
          ? "bg-white/8 px-3 py-2 shadow-[0_14px_30px_rgba(0,0,0,0.16)] ring-1 ring-white/12"
          : "px-1 py-1"
      }`}
      aria-label="KlikBekal"
    >
      <KlikBekalBrandLogo
        markClassName="h-9 w-9 shrink-0 rounded-[12px]"
        wordmarkClassName="text-xl"
        tone="light"
      />
    </div>
  );
}


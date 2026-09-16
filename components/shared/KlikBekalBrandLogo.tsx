type KlikBekalBrandLogoProps = {
  wordmarkClassName?: string;
  markClassName?: string;
  showWordmark?: boolean;
  tone?: "light" | "dark";
};

export function KlikBekalLogoMark({ className = "" }: { className?: string }) {
  return (
    <span className={`relative grid place-items-center overflow-hidden rounded-[18px] bg-[#17212b] shadow-[0_18px_44px_rgba(23,33,43,0.24)] ${className}`}>
      <span className="absolute inset-0 bg-[radial-gradient(circle_at_24%_18%,rgba(255,255,255,0.16),transparent_28%),linear-gradient(135deg,rgba(22,138,242,0.20),transparent_42%,rgba(255,88,63,0.28))]" />
      <svg viewBox="0 0 64 64" aria-hidden="true" className="relative h-[76%] w-[76%]">
        <path
          d="M13 23.5C13 17.7 17.7 13 23.5 13h17.2c5.8 0 10.5 4.7 10.5 10.5v17.2c0 5.8-4.7 10.5-10.5 10.5H23.5C17.7 51.2 13 46.5 13 40.7V23.5Z"
          fill="white"
          opacity=".10"
        />
        <path
          d="M16 18.5c0-3 2.4-5.5 5.5-5.5h22.8c3 0 5.5 2.4 5.5 5.5v2.8H16v-2.8Z"
          fill="#168AF2"
        />
        <path
          d="M16 21.3h33.8v22.2c0 4.1-3.3 7.5-7.5 7.5H23.5C19.4 51 16 47.7 16 43.5V21.3Z"
          fill="white"
        />
        <path
          d="M23 42.5v-22h7.2v8.1l8.6-8.1h9.1L36.9 30.8 49 42.5h-9.6l-9.2-9.1v9.1H23Z"
          fill="#17212b"
        />
        <path
          d="M45.1 12 41.7 22.1l9.1-1.9-12 22.2 2.9-12.2-7.4 1.8L45.1 12Z"
          fill="#FF9F1C"
        />
        <path
          d="M20.5 17.8h16.8"
          stroke="white"
          strokeOpacity=".78"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

export function KlikBekalBrandLogo({
  wordmarkClassName = "",
  markClassName = "h-12 w-12",
  showWordmark = true,
  tone = "light",
}: KlikBekalBrandLogoProps) {
  return (
    <span className="inline-flex items-center gap-3">
      <KlikBekalLogoMark className={markClassName} />
      {showWordmark ? (
        <span className={`font-black tracking-normal ${tone === "light" ? "text-white" : "text-[#17212b]"} ${wordmarkClassName}`}>
          KlikBekal
        </span>
      ) : null}
    </span>
  );
}

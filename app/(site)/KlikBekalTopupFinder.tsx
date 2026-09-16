"use client";

import { FormEvent, useMemo, useRef, useState } from "react";
import { Search, ShieldCheck, Smartphone, Zap } from "lucide-react";

type OperatorKey = "telkomsel" | "indosat" | "xl" | "axis" | "tri" | "smartfren";

type Operator = {
  key: OperatorKey;
  name: string;
  prefixes: string[];
  color: string;
};

type Product = {
  name: string;
  quota: string;
  price: string;
  tag: string;
};

const operators: Operator[] = [
  { key: "telkomsel", name: "Telkomsel", prefixes: ["0811", "0812", "0813", "0821", "0822", "0823", "0852", "0853"], color: "#e94134" },
  { key: "indosat", name: "Indosat", prefixes: ["0814", "0815", "0816", "0855", "0856", "0857", "0858"], color: "#f6bd16" },
  { key: "xl", name: "XL", prefixes: ["0817", "0818", "0819", "0859", "0877", "0878"], color: "#2454d8" },
  { key: "axis", name: "Axis", prefixes: ["0831", "0832", "0833", "0838"], color: "#7d2bd1" },
  { key: "tri", name: "Tri", prefixes: ["0895", "0896", "0897", "0898", "0899"], color: "#f05a28" },
  { key: "smartfren", name: "Smartfren", prefixes: ["0881", "0882", "0883", "0884", "0885", "0886", "0887", "0888", "0889"], color: "#d91f5c" },
];

const productMap: Record<OperatorKey, Product[]> = {
  telkomsel: [
    { name: "Pulsa Telkomsel 10K", quota: "Reguler", price: "Rp 11.250", tag: "Cepat" },
    { name: "Data Telkomsel 5GB", quota: "30 Hari", price: "Rp 42.500", tag: "Favorit" },
    { name: "Combo Sakti Mini", quota: "6GB + Nelpon", price: "Rp 53.000", tag: "Promo" },
  ],
  indosat: [
    { name: "Pulsa Indosat 25K", quota: "Reguler", price: "Rp 26.350", tag: "Cepat" },
    { name: "Freedom 8GB", quota: "30 Hari", price: "Rp 36.000", tag: "Hemat" },
    { name: "Yellow 1GB", quota: "3 Hari", price: "Rp 6.500", tag: "Mini" },
  ],
  xl: [
    { name: "Pulsa XL 50K", quota: "Reguler", price: "Rp 51.300", tag: "Cepat" },
    { name: "Xtra Combo 10GB", quota: "30 Hari", price: "Rp 59.000", tag: "Favorit" },
    { name: "Akrab Mini", quota: "Sharing", price: "Rp 28.500", tag: "Baru" },
  ],
  axis: [
    { name: "Pulsa Axis 15K", quota: "Reguler", price: "Rp 16.200", tag: "Cepat" },
    { name: "Bronet 6GB", quota: "30 Hari", price: "Rp 31.500", tag: "Hemat" },
    { name: "Owsem 12GB", quota: "30 Hari", price: "Rp 48.000", tag: "Promo" },
  ],
  tri: [
    { name: "Pulsa Tri 20K", quota: "Reguler", price: "Rp 21.100", tag: "Cepat" },
    { name: "Happy 9GB", quota: "30 Hari", price: "Rp 39.000", tag: "Favorit" },
    { name: "AlwaysOn 6GB", quota: "Masa aktif panjang", price: "Rp 46.500", tag: "AON" },
  ],
  smartfren: [
    { name: "Pulsa Smartfren 25K", quota: "Reguler", price: "Rp 26.250", tag: "Cepat" },
    { name: "Unlimited Lite", quota: "28 Hari", price: "Rp 55.000", tag: "Populer" },
    { name: "Kuota 16GB", quota: "30 Hari", price: "Rp 44.500", tag: "Hemat" },
  ],
};

function normalizePhone(value: string) {
  const digits = value.replace(/\D/g, "");
  if (digits.startsWith("62")) return `0${digits.slice(2)}`;
  return digits;
}

function detectOperator(value: string): Operator | null {
  const normalized = normalizePhone(value);
  if (normalized.length < 4) return null;
  return operators.find((operator) => operator.prefixes.some((prefix) => normalized.startsWith(prefix))) ?? null;
}

export function KlikBekalTopupFinder() {
  const [phone, setPhone] = useState("");
  const [selectedOperatorKey, setSelectedOperatorKey] = useState<OperatorKey>("telkomsel");
  const resultRef = useRef<HTMLDivElement | null>(null);

  const detectedOperator = useMemo(() => detectOperator(phone), [phone]);
  const activeOperator = detectedOperator ?? operators.find((operator) => operator.key === selectedOperatorKey) ?? operators[0];
  const activeProducts = productMap[activeOperator.key];

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (detectedOperator) {
      setSelectedOperatorKey(detectedOperator.key);
    }
    resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section id="topup" className="bg-white px-4 py-16">
      <div className="mx-auto w-[min(1160px,100%)]">
        <div className="mb-7 max-w-2xl">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#ff583f]">Cari cepat</p>
          <h2 className="mt-3 text-4xl font-black tracking-normal text-[#17212b] md:text-5xl">Cek produk dari nomor tujuan.</h2>
          <p className="mt-4 text-base font-semibold leading-7 text-[#647384]">
            Masukkan nomor HP, lalu KlikBekal menampilkan pilihan operator yang paling relevan.
          </p>
        </div>

      <div className="grid overflow-hidden rounded-[8px] border border-[#e6edf5] bg-white shadow-[0_24px_70px_rgba(23,33,43,0.07)] lg:grid-cols-[0.42fr_1fr]">
        <aside className="relative overflow-hidden bg-[#fff4ec] p-8 text-[#17212b] md:p-10">
          <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#ff583f,#ff9f1c,#168af2,#20a66a)]" />
          <div className="absolute -bottom-24 -right-16 h-52 w-52 rotate-12 rounded-[8px] bg-[#ff583f]/8" />
          <div className="absolute right-8 top-8 grid h-14 w-14 place-items-center rounded-[8px] bg-[#17212b] text-[#ffd166]">
            <Zap className="h-7 w-7" />
          </div>
          <div className="relative">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#ff583f]">Produk operator</p>
            <h3 className="mt-5 max-w-xs text-4xl font-black leading-[1.04] tracking-normal">
              Pilih lebih cepat, bayar lebih yakin.
            </h3>
            <p className="mt-5 max-w-xs text-base font-semibold leading-7 text-[#6f5a51]">
              Prefix nomor membantu menampilkan produk operator tanpa harus mencari manual dari awal.
            </p>

            <div className="mt-11 flex items-start gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[8px] bg-white text-[#ff583f] shadow-[0_10px_24px_rgba(23,33,43,0.06)]">
                <ShieldCheck className="h-5 w-5" />
              </span>
              <div>
                <p className="font-black">Lebih minim salah pilih</p>
                <p className="mt-1 text-sm font-semibold text-[#6f5a51]">Pilihan produk dibuat langsung mengarah ke operator aktif.</p>
              </div>
            </div>
          </div>
        </aside>

        <div className="p-6 md:p-11">
          <form onSubmit={handleSubmit}>
            <label htmlFor="phone-number" className="text-sm font-black text-[#17212b]">
              Nomor ponsel
            </label>
            <div className="mt-3 flex flex-col gap-3 rounded-[8px] border border-[#d8e5ef] bg-[#f8fafc] p-2 sm:flex-row sm:items-center">
              <div className="flex h-12 shrink-0 items-center gap-2 rounded-[8px] px-3 text-[#168af2] sm:border-r sm:border-[#d8e5ef]">
                <Smartphone className="h-5 w-5" />
                <span className="font-black text-[#17212b]">+62</span>
              </div>
              <input
                id="phone-number"
                inputMode="numeric"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="08xx xxxx xxxx"
                className="h-12 min-w-0 flex-1 bg-transparent px-3 text-lg font-black text-[#17212b] outline-none placeholder:text-[#94a3b8]"
              />
              <button
                type="submit"
                className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-[8px] bg-[#ff583f] px-6 text-base font-black text-white shadow-[0_14px_28px_rgba(255,88,63,0.20)] transition hover:bg-[#e34831]"
              >
                <Search className="h-5 w-5" />
                Cari produk
              </button>
            </div>
          </form>

          <div className="mt-4 flex flex-wrap gap-2">
            {operators.map((operator) => {
              const active = activeOperator.key === operator.key;
              return (
                <button
                  key={operator.key}
                  type="button"
                  onClick={() => {
                    setSelectedOperatorKey(operator.key);
                    resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  className={`rounded-full border px-4 py-2 text-xs font-black transition ${
                    active ? "border-[#17212b] bg-[#17212b] text-white" : "border-[#d8e5ef] bg-white text-[#526071] hover:border-[#ffb29b]"
                  }`}
                >
                  {operator.name}
                </button>
              );
            })}
          </div>

          <div ref={resultRef} className="mt-8 scroll-mt-28">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ff583f]">Produk terarah</p>
                <h3 className="mt-2 text-3xl font-black tracking-normal text-[#17212b]">
                  {detectedOperator ? `Nomor ini terdeteksi ${activeOperator.name}` : `Produk ${activeOperator.name}`}
                </h3>
              </div>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {activeProducts.map((product) => (
                <article key={product.name} className="rounded-[8px] border border-[#e6edf5] bg-[#fbfcff] p-4 transition hover:border-[#ffb39c] hover:bg-white">
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full px-3 py-1 text-xs font-black text-white" style={{ backgroundColor: activeOperator.color }}>
                      {product.tag}
                    </span>
                    <span className="text-xs font-black text-[#6a7886]">{activeOperator.name}</span>
                  </div>
                  <h4 className="mt-4 text-lg font-black text-[#17212b]">{product.name}</h4>
                  <p className="mt-1 text-sm font-semibold text-[#6a7886]">{product.quota}</p>
                  <p className="mt-5 text-2xl font-black text-[#17212b]">{product.price}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}

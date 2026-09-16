import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Clock3,
  Gamepad2,
  Lightbulb,
  ReceiptText,
  ShieldCheck,
  Smartphone,
  UserRound,
  WalletCards,
  Wifi,
  Zap,
} from "lucide-react";
import { KlikBekalTopupFinder } from "./KlikBekalTopupFinder";
import { KlikBekalBrandLogo } from "@/components/shared/KlikBekalBrandLogo";

const siteTitle = "KlikBekal | Pulsa & Pembayaran Digital";
const siteDescription =
  "KlikBekal adalah website transaksi digital untuk isi pulsa, paket data, e-wallet, token listrik, game, dan pembayaran harian dengan alur cepat dan tampilan modern.";

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  keywords: [
    "KlikBekal",
    "website isi pulsa",
    "top up pulsa online",
    "paket data",
    "e-wallet",
    "token listrik",
    "pembayaran digital",
    "PPOB",
  ],
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    siteName: "KlikBekal",
    type: "website",
    images: [
      {
        url: "/klikbekal-assets/hero-topup-3d.png",
        width: 1340,
        height: 1024,
        alt: "Ilustrasi layanan digital KlikBekal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/klikbekal-assets/hero-topup-3d.png"],
  },
};

const serviceTiles = [
  { label: "Pulsa", icon: Smartphone, tone: "bg-[#fff0ea] text-[#e64b30]" },
  { label: "Paket Data", icon: Wifi, tone: "bg-[#e9f6ff] text-[#1677c8]" },
  { label: "E-Wallet", icon: WalletCards, tone: "bg-[#ecf9f0] text-[#1f8b4c]" },
  { label: "Token PLN", icon: Lightbulb, tone: "bg-[#fff7dc] text-[#b87300]" },
  { label: "Game", icon: Gamepad2, tone: "bg-[#f3edff] text-[#6a3fc2]" },
  { label: "Tagihan", icon: ReceiptText, tone: "bg-[#eef2ff] text-[#4158bd]" },
];

const steps = [
  {
    title: "Cari kebutuhan",
    copy: "Mulai dari nomor HP, ID pelanggan, atau kategori produk yang ingin dibayar.",
    icon: Smartphone,
  },
  {
    title: "Pilih nominal",
    copy: "Produk tampil jelas dengan harga, masa aktif, dan operator yang sesuai.",
    icon: ReceiptText,
  },
  {
    title: "Pantau status",
    copy: "Transaksi pending, sukses, gagal, dan refund lebih mudah dibaca.",
    icon: BadgeCheck,
  },
];

const benefits = [
  "Tampilan lebih segar untuk pembeli retail",
  "Cocok untuk konter, agen, reseller, dan website top up",
  "Katalog produk langsung terlihat tanpa banyak distraksi",
  "Status transaksi dibuat tegas dan mudah dicek ulang",
];

const recentTransactions = [
  { name: "Pulsa Telkomsel 50K", status: "Sukses", amount: "Rp 51.300" },
  { name: "Token PLN 100K", status: "Diproses", amount: "Rp 102.500" },
  { name: "Top Up DANA 75K", status: "Sukses", amount: "Rp 76.000" },
];

export default function KlikBekalHomePage() {
  return (
    <main className="min-h-screen bg-[#fbfcff] text-[#17212b]">
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[#fbfcff]" />
        <div className="absolute inset-x-0 top-0 -z-10 h-[520px] bg-[linear-gradient(180deg,#fff4ec_0%,#fbfcff_100%)]" />

        <header className="mx-auto w-[min(1160px,calc(100%-32px))] py-4">
          <div className="flex min-h-16 items-center justify-between gap-3 rounded-[8px] border border-[#eadfd8] bg-white/94 px-3 shadow-[0_16px_40px_rgba(23,33,43,0.06)] backdrop-blur md:px-5">
            <Link href="/" aria-label="KlikBekal" className="flex min-w-0 items-center gap-3 rounded-[8px] px-1 py-2">
              <KlikBekalBrandLogo tone="dark" markClassName="h-10 w-10 shrink-0 rounded-[12px]" wordmarkClassName="truncate text-lg sm:text-xl" />
            </Link>

            <nav className="hidden items-center gap-1 rounded-full bg-[#f8fafc] p-1 text-sm font-black text-[#607080] md:flex">
              <a href="#topup" className="rounded-full px-4 py-2 transition hover:bg-white hover:text-[#ff583f]">Produk</a>
              <a href="#alur" className="rounded-full px-4 py-2 transition hover:bg-white hover:text-[#ff583f]">Alur</a>
              <a href="#keunggulan" className="rounded-full px-4 py-2 transition hover:bg-white hover:text-[#ff583f]">Keunggulan</a>
              <Link href="/transaksi" className="rounded-full px-4 py-2 transition hover:bg-white hover:text-[#ff583f]">Transaksi</Link>
            </nav>

            <div className="flex shrink-0 items-center gap-2">
              <Link
                href="/login"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-[8px] bg-[#ff583f] px-4 text-sm font-black text-white shadow-[0_12px_26px_rgba(255,88,63,0.22)] transition hover:bg-[#e44831]"
              >
                <UserRound className="h-4 w-4" />
                Masuk
              </Link>
              <Link
                href="/register"
                className="hidden h-11 items-center justify-center rounded-[8px] border border-[#dce6f0] bg-white px-4 text-sm font-black text-[#17212b] transition hover:border-[#ffb39c] sm:inline-flex"
              >
                Daftar
              </Link>
            </div>
          </div>
        </header>

        <div className="mx-auto grid w-[min(1160px,calc(100%-32px))] gap-10 pb-14 pt-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:pb-20 lg:pt-12">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#ffd9c8] bg-white px-4 py-2 text-sm font-black text-[#91402d] shadow-[0_10px_28px_rgba(255,88,63,0.08)]">
              <Zap className="h-4 w-4 text-[#ff583f]" />
              Pulsa, paket data, e-wallet, PLN, game, dan tagihan
            </div>

            <h1 className="mt-6 max-w-3xl text-5xl font-black leading-[1.01] tracking-normal text-[#17212b] sm:text-6xl lg:text-7xl">
              Transaksi digital yang terasa cepat dan rapi.
            </h1>
            <p className="mt-6 max-w-2xl text-base font-semibold leading-8 text-[#647384] md:text-lg">
              KlikBekal dibuat seperti loket pembayaran modern: pilih produk, isi tujuan, bayar, lalu cek status dalam alur yang singkat dan mudah dipahami.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#topup"
                className="inline-flex h-13 items-center justify-center gap-2 rounded-[8px] bg-[#ff583f] px-7 text-base font-black text-white shadow-[0_18px_40px_rgba(255,88,63,0.22)] transition hover:bg-[#e44831]"
              >
                Mulai top up
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/transaksi"
                className="inline-flex h-13 items-center justify-center gap-2 rounded-[8px] border border-[#dce6f0] bg-white px-7 text-base font-black text-[#17212b] transition hover:border-[#ffb39c]"
              >
                Cek transaksi
              </Link>
            </div>

            <div className="mt-9 grid gap-3 sm:grid-cols-3">
              {[
                ["250+", "Produk aktif"],
                ["Real-time", "Status transaksi"],
                ["3 langkah", "Alur pembayaran"],
              ].map(([value, label]) => (
                <div key={label} className="border-l-4 border-[#ff9f1c] bg-white px-4 py-3 shadow-[0_10px_30px_rgba(23,33,43,0.05)]">
                  <p className="text-2xl font-black text-[#17212b]">{value}</p>
                  <p className="mt-1 text-sm font-bold text-[#718095]">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[540px]">
            <div className="absolute inset-y-8 right-0 w-[72%] overflow-hidden rounded-[8px] bg-[#eaf5ff]">
              <Image
                src="/klikbekal-assets/hero-topup-3d.png"
                alt="Ilustrasi transaksi digital KlikBekal"
                fill
                priority
                sizes="(min-width: 1024px) 520px, 100vw"
                className="object-cover object-center"
              />
            </div>

            <div className="relative ml-0 mt-4 w-[min(380px,92vw)] rounded-[28px] border border-[#dbe6f0] bg-[#17212b] p-3 shadow-[0_30px_80px_rgba(23,33,43,0.22)]">
              <div className="rounded-[22px] bg-white p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-[#168af2]">KlikBekal Wallet</p>
                    <p className="mt-2 text-3xl font-black text-[#17212b]">Rp 2.450.000</p>
                  </div>
                  <span className="grid h-12 w-12 place-items-center rounded-[14px] bg-[#fff0ea] text-[#ff583f]">
                    <WalletCards className="h-6 w-6" />
                  </span>
                </div>

                <div className="mt-5 grid grid-cols-3 gap-2">
                  {serviceTiles.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.label} className="grid min-h-20 place-items-center rounded-[8px] bg-[#f7f9fc] p-2 text-center">
                        <span className={`grid h-9 w-9 place-items-center rounded-[10px] ${item.tone}`}>
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="mt-2 text-[11px] font-black leading-tight text-[#344252]">{item.label}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-5 space-y-2">
                  {recentTransactions.map((item) => (
                    <div key={item.name} className="flex items-center justify-between gap-3 rounded-[8px] border border-[#edf2f7] bg-white px-3 py-2.5">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-black text-[#17212b]">{item.name}</p>
                        <p className="mt-0.5 text-xs font-bold text-[#7a8796]">{item.amount}</p>
                      </div>
                      <span className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-black ${item.status === "Sukses" ? "bg-[#e9fff2] text-[#16834d]" : "bg-[#fff7dc] text-[#986700]"}`}>
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#e6edf5] bg-white py-5">
        <div className="mx-auto grid w-[min(1160px,calc(100%-32px))] gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {serviceTiles.map((item) => {
            const Icon = item.icon;
            return (
              <a key={item.label} href="#topup" className="flex min-h-20 items-center gap-3 rounded-[8px] border border-[#e6edf5] bg-white p-3 transition hover:border-[#ffb39c] hover:shadow-[0_14px_30px_rgba(23,33,43,0.06)]">
                <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-[8px] ${item.tone}`}>
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-sm font-black text-[#17212b]">{item.label}</span>
              </a>
            );
          })}
        </div>
      </section>

      <KlikBekalTopupFinder />

      <section id="alur" className="bg-[#fbfcff] py-16">
        <div className="mx-auto w-[min(1160px,calc(100%-32px))]">
          <div className="max-w-2xl">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#168af2]">Alur transaksi</p>
            <h2 className="mt-3 text-4xl font-black tracking-normal text-[#17212b] md:text-5xl">
              Dibuat pendek supaya pembeli tidak ragu.
            </h2>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <article key={step.title} className="rounded-[8px] border border-[#e6edf5] bg-white p-5 shadow-[0_14px_34px_rgba(23,33,43,0.05)]">
                  <div className="flex items-center justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-[8px] bg-[#17212b] text-[#ffd166]">
                      <Icon className="h-6 w-6" />
                    </span>
                    <span className="text-sm font-black text-[#ff583f]">0{index + 1}</span>
                  </div>
                  <h3 className="mt-5 text-2xl font-black text-[#17212b]">{step.title}</h3>
                  <p className="mt-3 text-sm font-semibold leading-6 text-[#647384]">{step.copy}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="keunggulan" className="bg-[#17212b] py-16 text-white">
        <div className="mx-auto grid w-[min(1160px,calc(100%-32px))] gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#ffd166]">Keunggulan</p>
            <h2 className="mt-3 text-4xl font-black tracking-normal md:text-5xl">Lebih siap untuk jualan harian.</h2>
            <p className="mt-5 text-base font-semibold leading-7 text-white/70">
              Konsep baru ini menempatkan produk, saldo, dan status transaksi sebagai pusat tampilan.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {benefits.map((benefit) => (
              <div key={benefit} className="flex items-start gap-3 rounded-[8px] border border-white/10 bg-white/7 p-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#8bd450]" />
                <p className="text-sm font-bold leading-6 text-white/76">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto flex w-[min(1160px,calc(100%-32px))] flex-col items-start justify-between gap-5 rounded-[8px] border border-[#e6edf5] bg-[#fff4ec] px-6 py-7 text-[#17212b] shadow-[0_18px_45px_rgba(23,33,43,0.06)] md:flex-row md:items-center md:px-8">
          <div>
            <h2 className="text-3xl font-black tracking-normal">KlikBekal siap jadi pusat transaksi digital.</h2>
            <p className="mt-2 max-w-2xl text-sm font-bold leading-6 text-[#7a5847]">
              Pulsa, paket data, e-wallet, token listrik, game, dan pembayaran harian tampil dalam konsep yang lebih fokus.
            </p>
          </div>
          <Link
            href="/register"
            className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-[8px] bg-[#17212b] px-6 text-sm font-black text-white transition hover:bg-[#ff583f]"
          >
            Daftar sekarang
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, CheckCircle2, Eye, EyeOff, LockKeyhole, Mail, Phone, ShieldCheck, UserRound } from "lucide-react";
import { KlikBekalBrandLogo } from "@/components/shared/KlikBekalBrandLogo";

type RegisterResp = {
  ok?: boolean;
  member_id?: number;
  role?: string;
  error?: string;
};

function cn(...v: Array<string | false | null | undefined>) {
  return v.filter(Boolean).join(" ");
}

function cleanPhoneInput(value: string) {
  return value.replace(/[^\d+]/g, "").slice(0, 16);
}

function normalizePhone(value: string) {
  const cleaned = cleanPhoneInput(value.trim());
  if (cleaned.startsWith("+62")) return `0${cleaned.slice(3)}`;
  if (cleaned.startsWith("62")) return `0${cleaned.slice(2)}`;
  return cleaned;
}

export function RegisterCard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [shake, setShake] = useState(false);

  const refundInvoiceId = (searchParams.get("refund_invoice_id") || "").trim();
  const guestEmail = (searchParams.get("guest_email") || "").trim();
  const guestPhone = (searchParams.get("guest_phone") || "").trim();
  const hasRefundContext = Boolean(refundInvoiceId && guestEmail && guestPhone);

  useEffect(() => {
    if (!err) return;
    setShake(true);
    const timer = setTimeout(() => setShake(false), 520);
    return () => clearTimeout(timer);
  }, [err]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");

    const cleanNama = nama.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPhone = normalizePhone(phone);
    const cleanPassword = password.trim();
    const cleanConfirm = confirmPassword.trim();

    if (!cleanNama || !cleanEmail || !cleanPhone || !cleanPassword || !cleanConfirm) {
      setErr("Lengkapi nama, email, nomor ponsel, dan password.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setErr("Gunakan email yang valid.");
      return;
    }
    if (!/^08\d{8,12}$/.test(cleanPhone)) {
      setErr("Nomor ponsel gunakan format 08 dan 10-14 digit.");
      return;
    }
    if (cleanPassword.length < 8) {
      setErr("Password minimal 8 karakter.");
      return;
    }
    if (cleanPassword !== cleanConfirm) {
      setErr("Konfirmasi password tidak sama.");
      return;
    }

    setLoading(true);
    try {
      const registerResponse = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nama: cleanNama,
          email: cleanEmail,
          phone: cleanPhone,
          password: cleanPassword,
          refund_invoice_id: refundInvoiceId,
          guest_email: guestEmail,
          guest_phone: guestPhone,
        }),
        cache: "no-store",
      });
      const registerBody = (await registerResponse.json().catch(() => ({}))) as RegisterResp;
      if (!registerResponse.ok || !registerBody.ok) {
        setErr(registerBody.error || "Registrasi gagal. Coba lagi sebentar.");
        return;
      }

      const loginResponse = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: cleanEmail, password: cleanPassword, turnstileToken: "dev-bypass" }),
        cache: "no-store",
      });
      const loginBody = (await loginResponse.json().catch(() => ({}))) as { ok?: boolean; token?: string };
      if (!loginResponse.ok || !loginBody.ok || !loginBody.token) {
        router.replace("/login?registered=1");
        return;
      }

      localStorage.setItem("auth_token", loginBody.token);
      localStorage.setItem("auth_source", "password");
      router.replace(hasRefundContext ? "/user?registered=1&refund=1" : "/user?registered=1");
    } catch {
      setErr("Koneksi registrasi gagal. Periksa jaringan lalu coba lagi.");
    } finally {
      setLoading(false);
    }
  }

  const fieldShell = "mt-2 flex min-h-[58px] items-center gap-3 rounded-[16px] border border-[#ead8cf] bg-[#fffaf6] px-4 transition focus-within:border-[#ff7a1a] focus-within:ring-4 focus-within:ring-[#ff7a1a]/12";
  const inputClass = "h-10 w-full min-w-0 bg-transparent text-base font-bold text-[#3a1734] outline-none placeholder:text-sm placeholder:font-bold placeholder:text-[#8f7d83]";

  return (
    <section className={cn("min-h-svh overflow-hidden bg-[#fff7f1] text-[#32172d]", shake && "auth-shake")}>
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_9%_12%,rgba(255,88,63,0.16),transparent_30%),radial-gradient(circle_at_88%_12%,rgba(255,200,87,0.32),transparent_28%),linear-gradient(120deg,#fff7f1_0%,#fffaf6_54%,#f8fff8_100%)]" />

      <div className="relative mx-auto grid min-h-svh w-[min(1180px,calc(100%-32px))] gap-8 py-6 lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.92fr)] lg:items-center lg:py-10">
        <div className="flex min-h-0 flex-col justify-between py-4 lg:min-h-[560px]">
          <Link href="/" className="inline-flex w-fit items-center gap-3" aria-label="KlikBekal">
            <KlikBekalBrandLogo tone="dark" wordmarkClassName="text-2xl" />
          </Link>

          <div className="max-w-[640px] py-8 lg:py-10">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[#ff583f]">Satu akun, banyak kemudahan</p>
            <h1 className="mt-6 text-[clamp(2.8rem,8vw,5.2rem)] font-black leading-[1.04] tracking-normal text-[#3a1734]">
              Buat akun dalam hitungan detik.
            </h1>
            <p className="mt-7 max-w-xl text-base font-semibold leading-8 text-[#876579]">
              Akunmu langsung aktif sebagai pengguna KlikBekal untuk cek pesanan, transaksi digital, dan menyimpan riwayat top up.
            </p>

            <div className="mt-9 grid gap-4 text-sm font-semibold text-[#876579]">
              {["Akun pengguna KlikBekal", "Riwayat transaksi tersimpan", "Pembayaran saldo dan produk digital"].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-[#ff583f]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="hidden text-xs font-bold uppercase tracking-[0.22em] text-[#b99baa] lg:block">KlikBekal digital transaction website</p>
        </div>

        <div className="relative min-w-0">
          <div className="absolute -inset-4 rounded-[44px] bg-white/42 blur-2xl" />
          <div className="relative rounded-[28px] border border-[#f1dcd2] bg-white/88 p-5 shadow-[0_30px_90px_rgba(58,23,52,0.12)] backdrop-blur sm:rounded-[34px] md:p-8 lg:p-10">
            <div className="flex items-start gap-4">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-[16px] bg-[#ff7a1a] text-white shadow-[0_16px_34px_rgba(255,122,26,0.26)]">
                <LockKeyhole className="h-7 w-7" />
              </span>
              <div>
                <h2 className="text-4xl font-black leading-none tracking-normal text-[#3a1734] sm:text-5xl">Daftar akun</h2>
                <p className="mt-3 text-sm font-semibold text-[#876579]">Tidak dipungut biaya pendaftaran.</p>
              </div>
            </div>

            {err && (
              <div className="mt-7 flex items-start gap-3 rounded-[18px] border border-[#ffc8b9] bg-[#fff1ea] px-4 py-3">
                <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#ff583f]" />
                <p className="text-sm font-semibold text-[#8e2d23]">{err}</p>
              </div>
            )}

            <form onSubmit={onSubmit} className="mt-8 space-y-5">
              <div>
                <label className="text-sm font-black text-[#3a1734]">Nama / Username</label>
                <div className={fieldShell}>
                  <UserRound className="h-5 w-5 shrink-0 text-[#ff583f]" />
                  <input className={inputClass} value={nama} onChange={(e) => setNama(e.target.value)} placeholder="contoh: budi123" autoComplete="name" />
                </div>
                <p className="mt-2 text-xs font-semibold text-[#876579]">Gunakan nama yang mudah dikenali.</p>
              </div>

              <div>
                <label className="text-sm font-black text-[#3a1734]">Email</label>
                <div className={fieldShell}>
                  <Mail className="h-5 w-5 shrink-0 text-[#ff583f]" />
                  <input className={inputClass} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="contoh: user@gmail.com" autoComplete="email" type="email" />
                </div>
              </div>

              <div>
                <label className="text-sm font-black text-[#3a1734]">Nomor ponsel</label>
                <div className={fieldShell}>
                  <Phone className="h-5 w-5 shrink-0 text-[#ff583f]" />
                  <input
                    className={inputClass}
                    value={phone}
                    onChange={(e) => setPhone(cleanPhoneInput(e.target.value))}
                    placeholder="08xx xxxx xxxx"
                    autoComplete="tel"
                    inputMode="tel"
                    type="tel"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-black text-[#3a1734]">Password</label>
                <div className={`relative ${fieldShell}`}>
                  <LockKeyhole className="h-5 w-5 shrink-0 text-[#ff583f]" />
                  <input className={`${inputClass} pr-10`} type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Minimal 8 karakter" autoComplete="new-password" />
                  <button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute right-4 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-[#876579] transition hover:bg-[#fff0e4] hover:text-[#3a1734]" tabIndex={-1} aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}>
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-sm font-black text-[#3a1734]">Ulangi password</label>
                <div className={`relative ${fieldShell}`}>
                  <ShieldCheck className="h-5 w-5 shrink-0 text-[#ff583f]" />
                  <input className={`${inputClass} pr-10`} type={showConfirmPassword ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Ketik ulang password" autoComplete="new-password" />
                  <button type="button" onClick={() => setShowConfirmPassword((v) => !v)} className="absolute right-4 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-[#876579] transition hover:bg-[#fff0e4] hover:text-[#3a1734]" tabIndex={-1} aria-label={showConfirmPassword ? "Sembunyikan password" : "Tampilkan password"}>
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <button
                className="group flex h-[56px] w-full items-center justify-center gap-3 rounded-full bg-[linear-gradient(90deg,#ff583f_0%,#ff7a1a_58%,#ff9f1c_100%)] text-base font-black text-white shadow-[0_18px_42px_rgba(255,122,26,0.28)] transition hover:brightness-105 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                disabled={loading}
                type="submit"
              >
                {loading ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    <span>Memproses...</span>
                  </>
                ) : (
                  <>
                    <span>Buat akun saya</span>
                    <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
                  </>
                )}
              </button>

              <p className="text-center text-sm font-semibold text-[#876579]">
                Sudah punya akun?{" "}
                <Link href="/login" className="font-black text-[#ff583f] hover:underline">
                  Masuk
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

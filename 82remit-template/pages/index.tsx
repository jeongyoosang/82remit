import Layout from "../components/Layout";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../lib/firebase";
import Link from "next/link";
import { useState } from "react";

export default function HomePage() {
  const [busy, setBusy] = useState(false);

  async function handleGoogleLogin() {
    try {
      setBusy(true);
      await signInWithPopup(auth, googleProvider);
      window.location.href = "/dashboard";
    } catch (e: any) {
      alert(e?.message ?? "로그인 실패");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs mb-4 bg-white/70 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
            TRON 네트워크 기반 • 초간편 송금
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            전화번호로 <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-emerald-600">USDT</span>를 보낸다
          </h1>
          <p className="mt-4 md:text-lg text-slate-600">
            지갑 주소 없이도, 전화번호만으로 빠르고 안전하게 송금하세요.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleGoogleLogin}
              disabled={busy}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 font-medium hover:bg-slate-50 active:scale-[0.99]"
            >
              <img src="/google.svg" alt="Google" className="h-5 w-5" />
              {busy ? "로그인 중..." : "Google로 로그인"}
            </button>

            <Link
              href="/dashboard"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-black text-white px-5 py-3 font-medium hover:opacity-90"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" className="opacity-90">
                <path d="M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" fill="currentColor" />
              </svg>
              Web3 지갑 연결
            </Link>
          </div>

          <div className="mt-5 text-xs text-slate-500">
            로그인 후 대시보드에서 Web3 지갑(Web3Auth) 연결
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="pb-24">
        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          <Card
            icon={
              <svg viewBox="0 0 24 24" className="h-6 w-6">
                <path
                  fill="currentColor"
                  d="M12 2a5 5 0 015 5v2h1a3 3 0 013 3v5a3 3 0 01-3 3H6a3 3 0 01-3-3v-5a3 3 0 013-3h1V7a5 5 0 015-5zm-3 7h6V7a3 3 0 10-6 0v2z"
                />
              </svg>
            }
            title="전화번호 기반"
            desc="복잡한 지갑 주소 대신 전화번호만으로 간편 송금"
          />
          <Card
            icon={
              <svg viewBox="0 0 24 24" className="h-6 w-6">
                <path
                  fill="currentColor"
                  d="M2 11h8V3h4v8h8v4h-8v8h-4v-8H2z"
                />
              </svg>
            }
            title="빠른 전송"
            desc="TRON 네트워크로 지연 없이 USDT 전송"
          />
          <Card
            icon={
              <svg viewBox="0 0 24 24" className="h-6 w-6">
                <path
                  fill="currentColor"
                  d="M5 4h14v2H5V4zm0 4h14v12H5V8zm2 2v8h10v-8H7z"
                />
              </svg>
            }
            title="거래 내역"
            desc="모든 송금 내역을 실시간으로 확인"
          />
        </div>
      </section>

      {/* CTA strip */}
      <section className="pb-20">
        <div className="rounded-2xl border bg-white/70 backdrop-blur p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg md:text-xl font-semibold">
              지금 바로 82Remit을 시작해 보세요
            </h3>
            <p className="text-slate-600 text-sm md:text-base">
              테스트넷으로 먼저 체험하고, 준비되면 메인넷으로 전환합니다.
            </p>
          </div>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-xl bg-black text-white px-5 py-3 font-medium hover:opacity-90"
          >
            대시보드로 이동
            <svg width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M13 5l7 7-7 7v-4H4v-6h9V5z"/></svg>
          </Link>
        </div>
      </section>
    </Layout>
  );
}

function Card({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-2xl border bg-white/60 backdrop-blur p-6">
      <div className="h-10 w-10 rounded-lg bg-slate-900 text-white flex items-center justify-center">
        {icon}
      </div>
      <h3 className="mt-4 font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-slate-600">{desc}</p>
    </div>
  );
}


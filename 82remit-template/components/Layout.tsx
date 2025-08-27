// Common layout wrapper
import Head from "next/head";
import Link from "next/link";
import { ReactNode } from "react";

export default function Layout({
  children,
  title = "82Remit — 전화번호 기반 USDT 간편송금",
}: {
  children: ReactNode;
  title?: string;
}) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="전화번호만으로 TRON 네트워크로 빠르고 안전하게 USDT를 송금하세요."
        />
        <meta property="og:title" content="82Remit" />
        <meta
          property="og:description"
          content="전화번호 기반 USDT 간편송금 — TRON 네트워크로 빠르게."
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
        <header className="sticky top-0 z-20 backdrop-blur bg-white/70 border-b">
          <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <img src="/logo.svg" alt="82Remit" className="h-6 w-6" />
              <span className="font-semibold">82Remit</span>
            </Link>
            <nav className="text-sm">
              <Link href="/send" className="px-3 py-1 rounded hover:bg-slate-100">
                송금
              </Link>
              <Link href="/history" className="px-3 py-1 rounded hover:bg-slate-100">
                내역
              </Link>
              <Link
                href="/dashboard"
                className="ml-2 px-3 py-1.5 rounded bg-black text-white hover:opacity-90"
              >
                대시보드
              </Link>
            </nav>
          </div>
        </header>

        <main className="mx-auto max-w-5xl px-4">{children}</main>

        <footer className="mx-auto max-w-5xl px-4 py-10 text-slate-500 text-sm">
          © {new Date().getFullYear()} GORAE Universe · 안전한 디지털 자산 송금
        </footer>
      </div>
    </>
  );
}

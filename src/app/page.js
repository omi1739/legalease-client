import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section className="bg-gradient-to-r from-slate-900/40 to-transparent">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:py-32">
        <div className="flex flex-col-reverse items-center gap-12 lg:flex-row">
          <div className="max-w-xl text-center lg:text-left">
            <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl" style={{ color: "var(--brand-accent)" }}>
              Find & Hire Expert Legal Counsel
            </h1>
            <p className="mt-4 text-lg text-slate-300">
              LegalEase helps you discover vetted lawyers, schedule consultations, and manage hiring securely — all in one place.
            </p>

            <div className="mt-8 flex items-center justify-center gap-3 lg:justify-start">
              <Link
                href="/browse"
                className="rounded-full px-6 py-3 text-sm font-semibold"
                style={{ backgroundColor: "var(--brand-accent)", color: "var(--brand-accent-contrast)" }}
              >
                Browse Lawyers
              </Link>

              <Link
                href="#how"
                className="rounded-full px-5 py-3 text-sm font-medium border"
                style={{ borderColor: "var(--brand-primary)", color: "var(--brand-accent-contrast)" }}
              >
                How it works
              </Link>
            </div>
          </div>

          <div className="w-full max-w-md">
            <div className="relative mx-auto h-64 w-64 sm:h-80 sm:w-80">
              <Image src="/assets/logo.png" alt="Legal illustration" fill className="object-contain" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

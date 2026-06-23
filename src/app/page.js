import Image from "next/image";
import Link from "next/link";

const practiceAreas = [
  {
    title: "Corporate Law",
    description: "Mergers, acquisitions, compliance, and corporate governance for businesses of all sizes.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-8 w-8 fill-none stroke-current" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18" /><path d="M5 21V7l8-4v18" /><path d="M11 3v18" /><path d="M17 21V11l-4-2" /><path d="M21 21V13l-4-2" />
      </svg>
    ),
  },
  {
    title: "Family Law",
    description: "Divorce, custody, adoption, and family dispute resolution with compassion.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-8 w-8 fill-none stroke-current" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
      </svg>
    ),
  },
  {
    title: "Criminal Defense",
    description: "Expert legal representation for criminal cases from misdemeanors to serious charges.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-8 w-8 fill-none stroke-current" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: "Property Law",
    description: "Real estate transactions, title disputes, landlord-tenant matters, and property rights.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-8 w-8 fill-none stroke-current" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
];

const steps = [
  {
    step: "01",
    title: "Search & Browse",
    description: "Find the right lawyer by practice area, experience, location, and client reviews.",
  },
  {
    step: "02",
    title: "Compare & Connect",
    description: "Review profiles, compare consultation fees, and send a direct hiring request.",
  },
  {
    step: "03",
    title: "Hire & Manage",
    description: "Securely hire, manage case milestones, and communicate inside your dashboard.",
  },
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Startup Founder",
    content: "LegalEase helped me find a corporate lawyer within 24 hours. The entire process was seamless and professional.",
    rating: 5,
  },
  {
    name: "James Rodriguez",
    role: "Small Business Owner",
    content: "I needed a property law expert urgently. LegalEase connected me with someone who resolved my case in days, not weeks.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "Family Client",
    content: "The compassion and expertise I found through LegalEase made a difficult family matter much easier to navigate.",
    rating: 5,
  },
];

function StarRating({ rating }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: rating }, (_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-5 w-5 fill-[var(--brand-accent)]" aria-hidden="true">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#041927] py-20 sm:py-28">
        <div className="absolute inset-x-0 top-0 h-72" style={{ background: "radial-gradient(circle at top, rgba(217,154,30,0.18), transparent 40%)" }} />
        <div className="mx-auto grid max-w-7xl gap-16 px-4 sm:px-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="relative flex flex-col justify-center rounded-4xl border border-white/10 bg-slate-950/80 p-10 shadow-[0_40px_120px_-48px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:p-14">
            <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.35em] text-slate-300 shadow-sm shadow-cyan-500/10">
              Trusted legal marketplace
            </span>
            <h1 className="mt-8 text-5xl font-semibold tracking-tight text-white sm:text-6xl">
              Find expert legal counsel for every case.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              LegalEase helps you connect with vetted lawyers, manage hiring, and keep legal support within reach—fast, secure, and professional.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/browse"
                className="inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-semibold shadow-[0_18px_60px_-28px_rgba(217,154,30,0.7)] transition hover:bg-[#f8c232]"
                style={{ backgroundColor: "var(--brand-accent)", color: "var(--brand-accent-contrast)" }}
              >
                Browse Lawyers
              </Link>
              <Link
                href="#how"
                className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-7 py-3 text-sm font-medium text-slate-200 transition hover:text-white"
                style={{ borderColor: "var(--brand-accent)" }}
              >
                How it works
              </Link>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl bg-white/5 p-5">
                <p className="text-3xl font-semibold text-white">20+</p>
                <p className="mt-3 text-sm text-slate-400">Trusted lawyers</p>
              </div>
              <div className="rounded-3xl bg-white/5 p-5">
                <p className="text-3xl font-semibold text-white">99.9%</p>
                <p className="mt-3 text-sm text-slate-400">Client satisfaction</p>
              </div>
              <div className="rounded-3xl bg-white/5 p-5">
                <p className="text-3xl font-semibold text-white">Fast</p>
                <p className="mt-3 text-sm text-slate-400">Verified hiring flow</p>
              </div>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="absolute -right-14 top-10 h-52 w-52 rounded-full" style={{ backgroundColor: "rgba(217,154,30,0.10)" }} />
            <div className="relative max-w-md overflow-hidden rounded-4xl border border-white/10 bg-slate-950/80 p-6 shadow-2xl shadow-slate-950/20">
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 overflow-hidden rounded-3xl bg-slate-900/80">
                  <Image src="/assets/logo.png" alt="Advocate Priya" fill className="object-cover" />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Featured lawyer</p>
                  <p className="mt-1 text-xl font-semibold text-white">Advocate Priya</p>
                </div>
              </div>
              <div className="mt-8 space-y-4">
                <div className="rounded-3xl bg-white/5 p-4">
                  <p className="text-sm text-slate-400">Specialization</p>
                  <p className="mt-1 text-white">Corporate & Contract Law</p>
                </div>
                <div className="rounded-3xl bg-white/5 p-4">
                  <p className="text-sm text-slate-400">Consultation Fee</p>
                  <p className="mt-1 text-white">$75 / hour</p>
                </div>
              </div>
              <div className="mt-8 flex flex-wrap gap-2">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs uppercase tracking-[0.3em] text-slate-300">Corporate</span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs uppercase tracking-[0.3em] text-slate-300">Family</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="how" className="bg-[#04111f] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.35em] text-slate-300">
              Simple process
            </span>
            <h2 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              How it works
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-400">
              Three simple steps to get expert legal support.
            </p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-3">
            {steps.map((item) => (
              <div key={item.step} className="group relative rounded-4xl border border-white/10 bg-slate-950/80 p-8 shadow-[0_25px_60px_-30px_rgba(0,0,0,0.7)] transition duration-300 hover:border-[var(--brand-accent)]/40">
                <span className="text-6xl font-bold tracking-tight text-white/5 transition duration-300 group-hover:text-[var(--brand-accent)]/20">
                  {item.step}
                </span>
                <h3 className="mt-4 text-xl font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#041927] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.35em] text-slate-300">
              Practice areas
            </span>
            <h2 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Areas of expertise
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-400">
              Specialized legal support across every major practice area.
            </p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {practiceAreas.map((area) => (
              <div key={area.title} className="group rounded-4xl border border-white/10 bg-slate-950/80 p-6 shadow-[0_25px_60px_-30px_rgba(0,0,0,0.7)] transition duration-300 hover:border-[var(--brand-accent)]/40">
                <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-white/5 text-slate-300 transition duration-300 group-hover:bg-[var(--brand-accent)]/20 group-hover:text-[var(--brand-accent)]">
                  {area.icon}
                </div>
                <h3 className="mt-6 text-lg font-semibold text-white">{area.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">{area.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#04111f] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.35em] text-slate-300">
              Testimonials
            </span>
            <h2 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              What our clients say
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-400">
              Real stories from people who found the right legal help through LegalEase.
            </p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.name} className="rounded-4xl border border-white/10 bg-slate-950/80 p-8 shadow-[0_25px_60px_-30px_rgba(0,0,0,0.7)]">
                <StarRating rating={t.rating} />
                <p className="mt-5 text-sm leading-7 text-slate-300">&ldquo;{t.content}&rdquo;</p>
                <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-sm font-medium text-slate-300">
                    {t.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-slate-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#041927] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-4xl border border-white/10 bg-slate-950/80 px-8 py-16 shadow-[0_40px_120px_-48px_rgba(0,0,0,0.5)] sm:px-16 sm:py-20">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full" style={{ backgroundColor: "rgba(217,154,30,0.08)" }} />
            <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full" style={{ backgroundColor: "rgba(217,154,30,0.06)" }} />
            <div className="relative mx-auto max-w-2xl text-center">
              <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Ready to find your legal match?
              </h2>
              <p className="mt-6 text-lg leading-8 text-slate-400">
                Join hundreds of clients who have found expert legal counsel through LegalEase.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/browse"
                  className="inline-flex items-center justify-center rounded-full px-8 py-3 text-sm font-semibold shadow-[0_18px_60px_-28px_rgba(217,154,30,0.7)] transition hover:bg-[#f8c232]"
                  style={{ backgroundColor: "var(--brand-accent)", color: "var(--brand-accent-contrast)" }}
                >
                  Browse Lawyers
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-8 py-3 text-sm font-medium text-slate-200 transition hover:border-white/20 hover:text-white"
                >
                  Sign Up Free
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

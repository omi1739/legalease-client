"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const ArrowRight = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const Star = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const Shield = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const Users = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const Briefcase = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

const practiceAreas = [
  {
    title: "Corporate Law",
    description: "Mergers, acquisitions, compliance, and corporate governance for businesses of all sizes.",
    icon: <Briefcase className="h-6 w-6" />,
  },
  {
    title: "Family Law",
    description: "Divorce, custody, adoption, and family dispute resolution with compassion.",
    icon: <Users className="h-6 w-6" />,
  },
  {
    title: "Criminal Defense",
    description: "Expert legal representation for criminal cases from misdemeanors to serious charges.",
    icon: <Shield className="h-6 w-6" />,
  },
  {
    title: "Property Law",
    description: "Real estate transactions, title disputes, landlord-tenant matters, and property rights.",
    icon: <ArrowRight className="h-6 w-6" />,
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
        <Star key={i} className="h-4 w-4 fill-[var(--brand-accent)] text-[var(--brand-accent)]" />
      ))}
    </div>
  );
}

export default function Home() {
  const [featuredLawyers, setFeaturedLawyers] = useState([]);
  const [topExperts, setTopExperts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const carouselLawyers = [
    {
      name: "Patricia M. Vance",
      specialization: "Family & Custody Law",
      hourlyRate: 120,
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&h=400&q=80",
      tags: ["Family", "Mediation"],
      icon: "⚖️"
    },
    {
      name: "Marcus A. Thorne",
      specialization: "Corporate Law",
      hourlyRate: 180,
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&h=400&q=80",
      tags: ["M&A", "IP Protection"],
      icon: "💼"
    },
    {
      name: "David L. Vance",
      specialization: "Corporate & Tax Law",
      hourlyRate: 210,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=400&q=80",
      tags: ["Tax", "Structuring"],
      icon: "🛡️"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % carouselLawyers.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Fetch lawyers data on mount
  useEffect(() => {
    const getLawyers = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const res = await fetch(`${apiUrl}/lawyers?limit=12`);
        if (res.ok) {
          const data = await res.json();
          const list = data.lawyers || [];
          
          // Latest 6 for Featured Section
          setFeaturedLawyers(list.slice(0, 6));

          // Sort by hires count descending, take top 3 for Top Experts
          const sortedByHires = [...list].sort((a, b) => b.hires - a.hires);
          setTopExperts(sortedByHires.slice(0, 3));
        }
      } catch (err) {
        console.error("Failed to load lawyers for home page", err);
      } finally {
        setLoading(false);
      }
    };
    getLawyers();
  }, []);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#041927] py-20 sm:py-28">
        <div className="absolute inset-x-0 top-0 h-72" style={{ background: "radial-gradient(circle at top, rgba(217,154,30,0.18), transparent 40%)" }} />
        <div className="mx-auto grid max-w-7xl gap-16 px-4 sm:px-6 lg:grid-cols-[1.2fr_0.8fr]">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="relative flex flex-col justify-center rounded-4xl border border-white/10 bg-slate-950/80 p-10 shadow-[0_40px_120px_-48px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:p-14"
          >
            <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.35em] text-slate-300 shadow-sm shadow-cyan-500/10 self-start">
              Trusted legal marketplace
            </span>
            <h1 className="mt-8 text-5xl font-semibold tracking-tight text-white sm:text-6xl">
              Find & Hire Expert Legal Counsel.
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
                <p className="text-3xl font-semibold text-white">50+</p>
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
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="relative flex items-center justify-center"
          >
            <div className="absolute -right-14 top-10 h-52 w-52 rounded-full" style={{ backgroundColor: "rgba(217,154,30,0.10)" }} />
            
            <motion.div 
              key={carouselIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="relative w-full max-w-md overflow-hidden rounded-4xl border border-white/10 bg-slate-950/80 p-6 shadow-2xl shadow-slate-950/20"
            >
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 overflow-hidden rounded-3xl bg-slate-900/80">
                  <Image 
                    src={carouselLawyers[carouselIndex].image} 
                    alt={carouselLawyers[carouselIndex].name} 
                    fill 
                    sizes="64px" 
                    className="object-cover" 
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{carouselLawyers[carouselIndex].icon}</span>
                    <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Featured Lawyer</p>
                  </div>
                  <p className="mt-1 text-xl font-semibold text-white">{carouselLawyers[carouselIndex].name}</p>
                </div>
              </div>
              
              <div className="mt-8 space-y-4">
                <div className="rounded-3xl bg-white/5 p-4">
                  <p className="text-sm text-slate-400">Specialization</p>
                  <p className="mt-1 text-white">{carouselLawyers[carouselIndex].specialization}</p>
                </div>
                <div className="rounded-3xl bg-white/5 p-4">
                  <p className="text-sm text-slate-400">Consultation Fee</p>
                  <p className="mt-1 text-white">${carouselLawyers[carouselIndex].hourlyRate} / hour</p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {carouselLawyers[carouselIndex].tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[10px] uppercase tracking-[0.3em] text-slate-300">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Slider Dots */}
              <div className="mt-6 flex justify-center gap-2">
                {carouselLawyers.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCarouselIndex(idx)}
                    className={`h-2 w-2 rounded-full transition-all cursor-pointer ${
                      idx === carouselIndex ? "w-6 bg-[var(--brand-accent)]" : "bg-white/20"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How it works */}
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

      {/* Dynamic Featured Lawyers Section */}
      <section className="bg-[#041927] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.35em] text-slate-300">
              Experts Selected For You
            </span>
            <h2 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Featured Lawyers
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-400">
              Meet our latest legal counselors available to take your case.
            </p>
          </div>

          {loading ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="animate-pulse rounded-4xl border border-white/10 bg-slate-950/60 p-6 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-3xl bg-white/5" />
                    <div className="flex-grow space-y-2">
                      <div className="h-4 w-2/3 bg-white/10 rounded-full" />
                      <div className="h-3 w-1/2 bg-white/5 rounded-full" />
                    </div>
                  </div>
                  <div className="h-10 w-full bg-white/10 rounded-full" />
                </div>
              ))}
            </div>
          ) : (
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
            >
              {featuredLawyers.map((lawyer) => (
                <motion.div
                  key={lawyer.name}
                  variants={fadeIn}
                  whileHover={{ scale: 1.02 }}
                  className="group rounded-4xl border border-white/10 bg-slate-950/80 p-6 shadow-xl transition hover:border-[var(--brand-accent)]/30"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative h-16 w-16 overflow-hidden rounded-3xl bg-slate-900/80">
                      <Image src={lawyer.avatar || "/assets/logo.png"} alt={lawyer.name} fill sizes="64px" className="object-cover" />
                    </div>
                    <div>
                      <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-2 py-0.5 text-[10px] font-medium text-slate-400">
                        ★ {lawyer.rating}
                      </span>
                      <h3 className="mt-1 text-lg font-semibold text-white group-hover:text-[var(--brand-accent)] transition">
                        {lawyer.name}
                      </h3>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs uppercase tracking-wider text-slate-400">{lawyer.specialization}</span>
                    <span className="text-sm font-semibold text-white">${lawyer.hourlyRate} / hr</span>
                  </div>
                  <p className="mt-4 text-xs leading-5 text-slate-400 line-clamp-2">{lawyer.bio}</p>
                  <Link
                    href={`/browse/${lawyer.name}`}
                    className="mt-6 flex w-full justify-center rounded-full border border-white/10 bg-white/5 px-6 py-2.5 text-xs font-semibold text-slate-200 transition hover:bg-[var(--brand-accent)] hover:text-[var(--brand-accent-contrast)] hover:border-[var(--brand-accent)]"
                  >
                    View Details
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Extra Section 1: Top Legal Experts */}
      <section className="bg-[#04111f] py-20 sm:py-28 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.35em] text-slate-300">
              Most Hired Specialists
            </span>
            <h2 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Top Legal Experts
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-400">
              Meet our most hired professionals on the platform.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3 max-w-4xl mx-auto">
            {topExperts.map((lawyer) => (
              <div key={lawyer.name} className="flex flex-col items-center rounded-4xl border border-white/5 bg-slate-950/40 p-8 text-center shadow-lg hover:border-white/10 transition duration-300">
                <div className="relative h-24 w-24 overflow-hidden rounded-full ring-2 ring-[var(--brand-accent)] bg-slate-900/80">
                  <Image src={lawyer.avatar || "/assets/logo.png"} alt={lawyer.name} fill sizes="96px" className="object-cover" />
                </div>
                <h3 className="mt-6 text-lg font-semibold text-white">{lawyer.name}</h3>
                <p className="mt-1 text-xs text-slate-400 uppercase tracking-widest">{lawyer.specialization}</p>
                <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[var(--brand-accent)]/10 px-3 py-1 text-xs font-medium text-[var(--brand-accent)]">
                  {lawyer.hires} Hires Completed
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Extra Section 2: Legal Categories */}
      <section className="bg-[#041927] py-20 sm:py-28 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.35em] text-slate-300">
              Explore Practice Areas
            </span>
            <h2 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Legal Categories
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-400">
              Select a specialized category to start filtering legal experts.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {practiceAreas.map((area) => (
              <Link 
                key={area.title} 
                href={`/browse?specialization=${encodeURIComponent(area.title)}`}
                className="group rounded-4xl border border-white/10 bg-slate-950/80 p-6 shadow-md transition duration-300 hover:border-[var(--brand-accent)]/40 hover:-translate-y-1 block"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-white/5 text-slate-300 transition duration-300 group-hover:bg-[var(--brand-accent)]/20 group-hover:text-[var(--brand-accent)]">
                  {area.icon}
                </div>
                <h3 className="mt-6 text-lg font-semibold text-white group-hover:text-[var(--brand-accent)] transition">{area.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">{area.description}</p>
                <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-[var(--brand-accent)] opacity-0 group-hover:opacity-100 transition duration-300">
                  <span>Explore Category</span>
                  <ArrowRight className="h-3 w-3" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
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
    </>
  );
}

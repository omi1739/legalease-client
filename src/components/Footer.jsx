import Image from "next/image";
import Link from "next/link";
// import logo from "@/..public/assets/logo.png";

const Footer = () => {
  return (
    <footer className="border-t border-slate-200/50 bg-slate-950 text-slate-200">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-12 sm:px-6 lg:px-8 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-2xl font-semibold text-white">
            <div
              className="relative h-11 w-11 overflow-hidden rounded-full bg-slate-950/90"
              style={{ borderColor: "var(--brand-primary)", borderWidth: 1 }}
            >
              <Image
                src="/assets/logo.png"
                alt="LegalEase logo"
                fill
                className="object-cover"
              />
            </div>
            <span
              className="text-base font-semibold uppercase tracking-[0.14em]"
              style={{ color: "var(--brand-accent)" }}
            >
              LegalEase
            </span>
          </div>
          <p className="max-w-sm text-sm text-slate-300">
            LegalEase connects clients, lawyers and businesses with trusted
            legal professionals through a clean and modern marketplace.
          </p>
          <div className="flex items-center gap-3 text-slate-400">
            <span>Follow us:</span>
            <Link href="#" className="hover:text-white" aria-label="Twitter">
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 fill-current"
                aria-hidden="true"
              >
                <path d="M22 5.7c-.8.3-1.6.5-2.5.6a4.4 4.4 0 0 0 1.9-2.4 8.8 8.8 0 0 1-2.8 1.1 4.4 4.4 0 0 0-7.5 4 12.5 12.5 0 0 1-9-4.6 4.4 4.4 0 0 0 1.4 5.9 4.4 4.4 0 0 1-2-.5v.1a4.4 4.4 0 0 0 3.5 4.3 4.4 4.4 0 0 1-2 .1 4.4 4.4 0 0 0 4.1 3 8.9 8.9 0 0 1-5.5 1.9A8.8 8.8 0 0 1 2 19.1a12.5 12.5 0 0 0 6.8 2 12.4 12.4 0 0 0 12.5-12.5v-.6A8.8 8.8 0 0 0 22 5.7Z" />
              </svg>
            </Link>
            <Link href="#" className="hover:text-white" aria-label="LinkedIn">
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 fill-current"
                aria-hidden="true"
              >
                <path d="M6.9 21H2.6V8.8h4.3V21Zm-2.1-14.6a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Zm18.3 14.6h-4.3v-5.8c0-1.4 0-3.3-2-3.3-2 0-2.3 1.5-2.3 3.2V21h-4.3V8.8h4.1v1.7h.1c.6-1.2 2.1-2.4 4.4-2.4 4.7 0 5.6 3.1 5.6 7.2V21Z" />
              </svg>
            </Link>
            <Link href="#" className="hover:text-white" aria-label="Facebook">
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 fill-current"
                aria-hidden="true"
              >
                <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.1 3-3.1.9 0 1.9.2 1.9.2v2.1h-1c-1 0-1.4.7-1.4 1.4V12h2.4l-.4 3h-2v7A10 10 0 0 0 22 12Z" />
              </svg>
            </Link>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              <li>
                <Link href="#" className="hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
              Newsletter
            </h3>
            <p className="mt-4 max-w-md text-sm text-slate-300">
              Join the LegalEase community for updates, featured lawyers, and
              hiring tips. This is a frontend-only placeholder.
            </p>
            <form className="mt-5 flex flex-col gap-3 sm:flex-row">
              <label htmlFor="newsletter" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter"
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-full border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
              />
              <button
                type="button"
                className="rounded-full px-4 py-3 text-sm font-semibold"
                style={{
                  backgroundColor: "var(--brand-accent)",
                  color: "var(--brand-accent-contrast)",
                }}
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800 bg-slate-950/95 px-4 py-6 text-center text-sm text-slate-500 sm:px-6">
        <p>© 2026 LegalEase. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

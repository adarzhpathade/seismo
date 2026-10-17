"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/** The step this scene owns. */
const BUSINESS = 13;

/** What a team pays. All prices are assumptions to test with users. */
const PLANS = [
  { name: "Free", price: "₹0", per: "forever", text: "Find every API you use and get told when one changes." },
  { name: "Pro", price: "₹499", per: "per month", text: "Safe fix pull requests, team alerts, up to 10 APIs." },
  { name: "Add-on", price: "+₹49", per: "per extra API", text: "Grows only as you add more APIs." },
];

/**
 * What it costs us each month once deployed for real, rounded. Assumptions from the providers' public pricing,
 * to check before launch. Today every item runs on a free tier, so it costs ₹0. `bar` is the bar width class.
 */
const COSTS = [
  { item: "Database", why: "stores shapes, never values", amount: "₹1,700", bar: "w-[260px]" },
  { item: "Dashboard hosting", why: "the website you log in to", amount: "₹1,700", bar: "w-[260px]" },
  { item: "Backend server", why: "receives shapes, runs detectors", amount: "₹1,500", bar: "w-[230px]" },
  { item: "AI explanations", why: "only when something changes", amount: "₹500", bar: "w-[76px]" },
  { item: "Alerts", why: "WhatsApp, email, Slack", amount: "₹400", bar: "w-[61px]" },
  { item: "Domain and extras", why: "", amount: "₹200", bar: "w-[31px]" },
];

/** Slide 8, one click: what a team pays on the left, what it costs us on the right, and when it pays for itself. */
export default function BusinessScene({ step }: { step: number }) {
  const root = useRef<HTMLDivElement>(null);
  const mounted = useRef(false);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      if (!mounted.current) {
        mounted.current = true;
        gsap.set(q("[data-biz]"), { y: 30, opacity: 0 });
        gsap.set(q("[data-bar]"), { scaleX: 0, transformOrigin: "left" });
      }
      if (step === BUSINESS) {
        gsap.to(q("[data-biz=head]"), { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.3, overwrite: true });
        gsap.to(q("[data-biz=label]"), { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", delay: 0.6, overwrite: true });
        gsap.to(q("[data-biz=plan]"), { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.8, stagger: 0.15, overwrite: true });
        gsap.to(q("[data-biz=today]"), { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: 1, overwrite: true });
        gsap.to(q("[data-biz=cost]"), { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", delay: 1.3, stagger: 0.1, overwrite: true });
        gsap.to(q("[data-bar]"), { scaleX: 1, duration: 0.8, ease: "power3.out", delay: 1.5, stagger: 0.1, overwrite: true });
        gsap.to(q("[data-biz=total], [data-biz=even]"), { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: 2.2, stagger: 0.2, overwrite: true });
        gsap.to(q("[data-biz=note]"), { y: 0, opacity: 1, duration: 0.6, delay: 2.7, overwrite: true });
      } else {
        gsap.to(q("[data-biz]"), { y: -24, opacity: 0, duration: 0.4, ease: "power2.in", overwrite: true });
        gsap.to(q("[data-bar]"), { scaleX: 0, duration: 0.3, overwrite: true });
      }
    },
    { dependencies: [step], scope: root }
  );

  return (
    <div ref={root} className="pointer-events-none absolute inset-0">
      <h2 data-biz="head" className="absolute left-24 top-[100px] whitespace-nowrap font-aeonik text-[82px] leading-none tracking-tight text-text-primary">
        How we earn. <span className="text-accent">What it costs us.</span>
      </h2>

      {/* Left: what a team pays */}
      <div className="absolute left-24 top-[230px] w-[760px]">
        <p data-biz="label" className="font-aeonik-mono text-[22px] uppercase tracking-[0.2em] text-text-primary">What a team pays</p>
        <div className="mt-5 flex flex-col gap-4">
          {PLANS.map((p, i) => (
            <div
              key={p.name}
              data-biz="plan"
              className={
                "flex items-center gap-8 rounded-2xl border-[3px] bg-section px-8 py-4 " +
                (i === 1 ? "border-accent shadow-[8px_8px_0_0_var(--color-accent)]" : "border-text-primary shadow-[8px_8px_0_0_var(--color-text-primary)]")
              }
            >
              <div className="w-[210px] shrink-0">
                <p className="font-aeonik-mono text-[18px] uppercase tracking-[0.2em] text-text-primary/70">{p.name}</p>
                <p className={"mt-1 font-aeonik text-[56px] leading-none tracking-tight " + (i === 1 ? "text-accent" : "text-text-primary")}>{p.price}</p>
                <p className="mt-1 font-aeonik-mono text-[15px] uppercase tracking-[0.12em] text-text-primary/70">{p.per}</p>
              </div>
              <p className="font-aeonik text-[30px] leading-tight tracking-tight text-text-primary">{p.text}</p>
            </div>
          ))}
        </div>
        <p data-biz="even" className="mt-7 font-aeonik text-[30px] leading-snug tracking-tight text-text-primary">
          About <span className="text-accent">13 Pro teams</span> pay for everything. Each new team costs us about ₹40 a month.
        </p>
      </div>

      {/* Right: what it costs us */}
      <div className="absolute right-24 top-[230px] w-[860px]">
        <div data-biz="label" className="flex items-baseline justify-between">
          <p className="font-aeonik-mono text-[22px] uppercase tracking-[0.2em] text-text-primary">What it costs us, per month</p>
        </div>
        <div data-biz="today" className="mt-5 flex items-center justify-between rounded-2xl border-[3px] border-text-primary bg-btn-primary px-8 py-4 text-white">
          <span className="font-aeonik text-[34px] tracking-tight">Today, on free tiers</span>
          <span className="font-aeonik text-[56px] leading-none tracking-tight text-accent">₹0</span>
        </div>
        <p data-biz="cost" className="mt-6 font-aeonik-mono text-[17px] uppercase tracking-[0.15em] text-text-primary/70">Deployed for real customers</p>
        <div className="mt-3 flex flex-col">
          {COSTS.map((c) => (
            <div key={c.item} data-biz="cost" className="grid grid-cols-[1fr_270px_110px] items-center border-b-2 border-text-primary/15 py-[7px]">
              <span className="flex flex-col gap-1.5">
                <span className="font-aeonik text-[28px] leading-none tracking-tight text-text-primary">{c.item}</span>
                {c.why && <span className="font-aeonik-mono text-[15px] uppercase tracking-[0.1em] text-text-primary/60">{c.why}</span>}
              </span>
              <span data-bar className={"h-3 rounded-full bg-text-primary " + c.bar} />
              <span className="text-right font-aeonik-mono text-[24px] text-text-primary">{c.amount}</span>
            </div>
          ))}
        </div>
        <div data-biz="total" className="mt-4 flex items-center justify-between">
          <span className="font-aeonik text-[34px] tracking-tight text-text-primary">Total</span>
          <span className="font-aeonik text-[44px] leading-none tracking-tight text-accent">₹6,000</span>
        </div>
      </div>

      <p data-biz="note" className="absolute inset-x-24 top-[975px] font-aeonik-mono text-[18px] uppercase tracking-[0.12em] text-text-primary">
        All numbers are rounded assumptions from public pricing pages, to check before launch.
      </p>
    </div>
  );
}

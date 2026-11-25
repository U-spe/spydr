import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  Clapperboard,
  Play,
  Sparkles,
  Tv2,
} from 'lucide-react';
import { siteConfig } from '@/configs/site';

const destinations = [
  {
    href: '/movies',
    label: 'Movies',
    detail: 'Feature films and favorites',
    icon: Clapperboard,
  },
  {
    href: '/tv-shows',
    label: 'Series',
    detail: 'Shows worth getting into',
    icon: Tv2,
  },
  {
    href: '/new-and-popular',
    label: 'New & popular',
    detail: 'See what people are watching',
    icon: Sparkles,
  },
];

export default function Index() {
  return (
    <main className="relative isolate min-h-[calc(100svh-4rem)] overflow-hidden bg-[#08090d] text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -left-40 -top-48 h-[34rem] w-[34rem] rounded-full bg-violet-700/20 blur-[130px]" />
        <div className="absolute -bottom-56 right-[-8rem] h-[34rem] w-[34rem] rounded-full bg-indigo-500/15 blur-[140px]" />
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:72px_72px] opacity-30" />
      </div>

      <section className="relative mx-auto grid min-h-[min(760px,calc(100svh-4rem))] max-w-7xl items-center gap-14 px-6 pb-16 pt-16 sm:px-10 lg:grid-cols-[1.04fr_0.96fr] lg:gap-10 lg:px-14 lg:py-20">
        <div className="relative z-10 max-w-2xl">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/65 shadow-lg shadow-black/10">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400 shadow-[0_0_12px_rgba(167,139,250,0.9)]" />
            A little more movie night
          </div>

          <h1 className="max-w-[12ch] font-heading text-5xl leading-[0.98] tracking-[-0.055em] sm:text-6xl md:text-7xl xl:text-[5.6rem]">
            Find your next
            <span className="mt-2 block bg-gradient-to-r from-violet-200 via-white to-indigo-300 bg-clip-text text-transparent">
              favorite story.
            </span>
          </h1>

          <p className="mt-7 max-w-lg text-base leading-7 text-white/55 sm:text-lg sm:leading-8">
            Movies, series, and something new to get into. Pick a lane, explore
            the library, and settle in.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href="/home"
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-[#101016] shadow-[0_8px_32px_rgba(255,255,255,0.12)] transition duration-200 hover:-translate-y-0.5 hover:bg-violet-100"
            >
              <Play className="h-4 w-4 fill-current" />
              Explore Silk+
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/new-and-popular"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.035] px-6 text-sm font-medium text-white/80 transition hover:border-white/30 hover:bg-white/[0.08] hover:text-white"
            >
              What's popular
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-14 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-white/10 pt-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/35">
            <span>Movies</span>
            <span className="h-1 w-1 rounded-full bg-violet-400/70" />
            <span>Series</span>
            <span className="h-1 w-1 rounded-full bg-violet-400/70" />
            <span>Discover</span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[470px] lg:mr-0">
          <div
            aria-hidden="true"
            className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-br from-violet-500/20 via-transparent to-indigo-500/20 blur-2xl"
          />
          <div className="relative aspect-[4/4.7] overflow-hidden rounded-[2rem] border border-white/10 bg-[#15151d] shadow-[0_35px_100px_rgba(0,0,0,0.55)]">
            <Image
              src="/images/hero.jpg"
              alt="Silk+ featured entertainment artwork"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 42vw"
              className="object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#08090d] via-[#08090d]/15 to-[#08090d]/10" />
            <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5 sm:p-7">
              <span className="rounded-full border border-white/15 bg-black/25 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/80 backdrop-blur-md">
                The Silk+ edit
              </span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/25 text-white/80 backdrop-blur-md">
                <Sparkles className="h-4 w-4" />
              </span>
            </div>
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-violet-200/80">
                Your next watch starts here
              </p>
              <h2 className="max-w-[12ch] font-heading text-3xl leading-tight tracking-tight sm:text-4xl">
                Make room for a good story.
              </h2>
              <p className="mt-3 max-w-xs text-sm leading-6 text-white/60">
                Browse by mood, genre, or whatever catches your eye.
              </p>
              <Link
                href="/home"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:text-violet-200"
              >
                Open the library
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="absolute -bottom-6 -left-5 hidden items-center gap-3 rounded-2xl border border-white/10 bg-[#15151d]/90 px-4 py-3 shadow-2xl shadow-black/40 backdrop-blur-xl sm:flex">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-400/15 text-violet-200">
              <Clapperboard className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-xs font-semibold text-white">
                Your watchlist starts here
              </span>
              <span className="mt-1 block text-[11px] text-white/45">
                Find something worth pressing play on
              </span>
            </span>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-6 pb-16 sm:px-10 lg:px-14 lg:pb-24">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-violet-200/65">
              Take your pick
            </p>
            <h2 className="mt-2 font-heading text-2xl tracking-tight text-white sm:text-3xl">
              Where to?
            </h2>
          </div>
          <Link
            href="/home"
            className="hidden items-center gap-2 pb-1 text-xs font-semibold text-white/50 transition hover:text-white sm:inline-flex"
          >
            View everything
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          {destinations.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group flex min-h-[116px] items-center justify-between gap-4 rounded-2xl border border-white/[0.09] bg-white/[0.035] p-5 transition duration-200 hover:-translate-y-1 hover:border-violet-300/30 hover:bg-white/[0.065] sm:p-6"
              >
                <span className="flex items-center gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-violet-300/10 bg-violet-400/10 text-violet-200 transition group-hover:bg-violet-400/20">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-white">
                      {item.label}
                    </span>
                    <span className="mt-1 block text-xs text-white/40">
                      {item.detail}
                    </span>
                  </span>
                </span>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-white/30 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-violet-200" />
              </Link>
            );
          })}
        </div>

        <p className="mt-8 text-center text-[10px] font-medium uppercase tracking-[0.2em] text-white/25">
          {siteConfig.name} <span className="px-2 text-violet-300/60">+</span>{' '}
          Good stories. Easy nights.
        </p>
      </section>
    </main>
  );
}

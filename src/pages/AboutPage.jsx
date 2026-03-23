import React, { useEffect } from 'react';

// ── Data ────────────────────────────────────────────────
const STATS = [
    { value: '2018', label: 'Founded' },
    { value: '340+', label: 'Artisan Partners' },
    { value: '62',   label: 'Countries Shipped To' },
    { value: '4.9★', label: 'Average Review' },
];

const VALUES = [
    {
        icon: '⏳',
        title: 'Slow Design',
        body: 'We reject the fleeting cycle of trends. Every object is designed to endure, crafted from materials that grow more beautiful with time and use.',
    },
    {
        icon: '🤝',
        title: 'Fair Partnerships',
        body: 'We bypass the middlemen, working directly with independent makers. This ensures fair wages, safe conditions, and transparent pricing for you.',
    },
    {
        icon: '🌍',
        title: 'Planet First',
        body: 'From 100% plastic-free packaging to climate-neutral shipping, every decision is weighed against its environmental impact.',
    },
];

const TEAM = [
    { name: 'Lena Kraft', role: 'Founder & Creative Director', emoji: '🧑‍🎨', bg: '#D4C9B8' },
    { name: 'Ryo Tanaka', role: 'Head of Sourcing', emoji: '🕵️‍♂️', bg: '#E8E0D2' },
    { name: 'Amara Osei', role: 'Brand & Community', emoji: '👩‍💻', bg: '#DDD3C4' },
];

const STORY_IMAGES = [
    { emoji: '🏺', bg: '#C9C0B0' },
    { emoji: '🪵', bg: '#D4C9B8' },
    { emoji: '🧣', bg: '#E8E0D2' },
    { emoji: '🪴', bg: '#DDD3C4' },
];

// ── Component ─────────────────────────────────────────────
export default function AboutPage({ setPage }) {

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    return (
        <div className="font-sans">

            {/* ── 1. HERO ─────────────────────────────────── */}
            <section className="bg-[var(--ink)] text-[var(--cream)] py-32 text-center px-6">
                <span className="font-sans text-[11px] tracking-widest uppercase text-[var(--mid)] mb-4 block">
                    Our Story
                </span>
                <h1 className="font-serif text-5xl md:text-7xl mb-6">
                    Made with intention.<br />Built to last.
                </h1>
                <p className="font-sans text-[15px] text-[var(--mid)] leading-relaxed max-w-lg mx-auto">
                    Forma was born from a desire to live with fewer, better things. We travel the globe to
                    partner with artisans who share our dedication to material honesty and enduring craft.
                </p>
            </section>

            {/* ── 2. STATS ────────────────────────────────── */}
            <section className="border-b border-[var(--border)]">
                <div className="grid grid-cols-2 lg:grid-cols-4">
                    {STATS.map((stat, i) => (
                        <div
                            key={stat.label}
                            className={`p-10 flex flex-col items-center justify-center text-center border-r last:border-r-0 border-b lg:border-b-0 border-[var(--border)] ${
                                i === 0 ? 'bg-[var(--ink)]' : 'bg-[var(--cream)]'
                            }`}
                        >
                            <span className={`font-serif text-4xl mb-2 ${
                                i === 0 ? 'text-[var(--accent)]' : 'text-[var(--ink)]'
                            }`}>
                                {stat.value}
                            </span>
                            <span className={`font-sans text-[11px] tracking-widest uppercase ${
                                i === 0 ? 'text-[var(--mid)]' : 'text-[var(--mid)]'
                            }`}>
                                {stat.label}
                            </span>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── 3. STORY ────────────────────────────────── */}
            <section className="max-w-7xl mx-auto px-6 py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Text */}
                    <div className="flex flex-col gap-6">
                        <span className="font-sans text-[11px] tracking-widest uppercase text-[var(--ink)]">
                            The Origin
                        </span>
                        <h2 className="font-serif text-4xl text-[var(--ink)]">
                            A rebellion against fast furniture.
                        </h2>
                        <div className="font-sans text-[15px] text-[var(--mid)] leading-relaxed flex flex-col gap-4">
                            <p>
                                In 2018, we looked around our homes and realized we didn't know where anything came from.
                                We were surrounded by objects built for convenience, destined for landfills. We started Forma
                                to change that narrative.
                            </p>
                            <p>
                                We believe the objects you bring into your space should carry a soul. The irregularities of
                                hand-thrown ceramic, the natural grain of solid oak, the slub of pure linen — these aren't
                                imperfections. They are the signatures of human hands.
                            </p>
                        </div>
                        <button
                            onClick={() => setPage('shop')}
                            className="self-start mt-2 font-sans text-[11px] tracking-widest uppercase border border-[var(--border)] text-[var(--ink)] px-7 py-3.5 hover:border-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--cream)] transition-colors duration-200"
                        >
                            Explore the Collection
                        </button>
                    </div>

                    {/* Right: 2×2 Image Grid */}
                    <div className="grid grid-cols-2 gap-3">
                        {STORY_IMAGES.map((img, i) => (
                            <div
                                key={i}
                                className="flex items-center justify-center text-6xl select-none"
                                style={{ background: img.bg, aspectRatio: '1/1' }}
                            >
                                {img.emoji}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 4. VALUES ───────────────────────────────── */}
            <section style={{ background: '#EDE7DE' }} className="py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="font-sans text-[11px] tracking-widest uppercase text-[var(--mid)] mb-3 block">
                            Our Commitments
                        </span>
                        <h2 className="font-serif text-4xl text-[var(--ink)]">What guides us</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {VALUES.map(({ icon, title, body }) => (
                            <div key={title} className="flex flex-col items-center text-center gap-4">
                                <span className="text-4xl">{icon}</span>
                                <h3 className="font-serif text-[22px] text-[var(--ink)]">{title}</h3>
                                <p className="font-sans text-[14px] text-[var(--mid)] leading-relaxed">
                                    {body}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 5. TEAM ─────────────────────────────────── */}
            <section className="max-w-7xl mx-auto px-6 py-24">
                <div className="flex items-end justify-between mb-12">
                    <div>
                        <span className="font-sans text-[11px] tracking-widest uppercase text-[var(--mid)] mb-2 block">
                            Behind the Scenes
                        </span>
                        <h2 className="font-serif text-4xl text-[var(--ink)]">Meet the Team</h2>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                    {TEAM.map(({ name, role, emoji, bg }) => (
                        <div key={name} className="flex flex-col gap-4">
                            <div
                                className="w-full relative flex items-center justify-center overflow-hidden"
                                style={{ background: bg, aspectRatio: '4/5' }}
                            >
                                <span className="text-8xl select-none">{emoji}</span>
                            </div>
                            <div className="text-center">
                                <h3 className="font-serif text-[22px] text-[var(--ink)]">{name}</h3>
                                <p className="font-sans text-[11px] tracking-widest uppercase text-[var(--mid)] mt-1">
                                    {role}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── 6. CTA BAND ─────────────────────────────── */}
            <section className="bg-[var(--ink)] py-20 px-6 text-center">
                <div className="max-w-2xl mx-auto flex flex-col items-center gap-8">
                    <h2 className="font-serif text-4xl md:text-5xl text-[var(--cream)] leading-snug">
                        Ready to find your<br />forever piece?
                    </h2>
                    <button
                        onClick={() => setPage('shop')}
                        className="font-sans text-[12px] tracking-widest uppercase bg-[var(--accent)] text-white px-8 py-4 hover:bg-[#A34017] transition-colors duration-200"
                    >
                        Shop the Collection →
                    </button>
                </div>
            </section>

        </div>
    );
}

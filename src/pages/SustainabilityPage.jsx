import React, { useEffect } from 'react';
import { Layers, Users, Globe } from 'lucide-react';

export default function SustainabilityPage({ setPage }) {
    useEffect(() => window.scrollTo({ top: 0, behavior: 'smooth' }), []);

    return (
        <div className="font-sans pb-0">
            {/* 1. HERO */}
            <section className="bg-[var(--ink)] text-[var(--cream)] pt-20 pb-32 px-6 relative overflow-hidden">
                <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 50% 100%, rgba(200,200,200,0.05) 0%, transparent 60%)' }}></div>
                <div className="max-w-7xl mx-auto relative z-10 text-center flex flex-col items-center">
                    <nav className="flex items-center gap-2 text-[11px] tracking-widest uppercase text-[var(--mid)] mb-12">
                        <button onClick={() => setPage('home')} className="hover:text-[var(--cream)] transition-colors">Home</button>
                        <span>/</span>
                        <span className="text-[var(--cream)] opacity-50 cursor-default">Company</span>
                        <span>/</span>
                        <span className="text-[var(--cream)]">Sustainability</span>
                    </nav>
                    <span className="font-sans text-[11px] tracking-widest uppercase text-[var(--accent)] mb-4 block border border-[var(--accent)] px-3 py-1 rounded-full">
                        2026 Impact Report
                    </span>
                    <h1 className="font-serif text-5xl md:text-7xl mb-6">Our Commitment to the Planet</h1>
                    <p className="font-sans text-[16px] text-[var(--mid)] max-w-2xl leading-relaxed">
                        Sustainability at Forma isn't a marketing strategy. It's the reason we exist.
                    </p>
                </div>
            </section>

            {/* 2. STATS */}
            <section className="max-w-7xl mx-auto px-6 -mt-16 relative z-20 mb-32">
                <div className="grid grid-cols-2 md:grid-cols-4 bg-[var(--card)] border border-[var(--border)] shadow-xl divide-x divide-y md:divide-y-0 divide-[var(--border)]">
                    {[
                        { num: "100%", text: "Carbon neutral shipping since 2022" },
                        { num: "0", text: "Single-use plastic in our packaging" },
                        { num: "1 tree", text: "Planted for every order placed" },
                        { num: "92%", text: "Of suppliers hold ethical certifications" },
                    ].map((stat, i) => (
                        <div key={i} className="p-8 flex flex-col gap-2 bg-[var(--cream)]">
                            <span className="font-serif text-4xl text-[var(--accent)]">{stat.num}</span>
                            <span className="font-sans text-[12px] text-[var(--mid)] leading-relaxed">{stat.text}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* 3. PILLARS */}
            <section className="max-w-7xl mx-auto px-6 mb-32">
                <div className="text-center mb-16">
                    <h2 className="font-serif text-4xl text-[var(--ink)]">Our Pillars</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            Icon: Layers,
                            title: "Responsibly Sourced Materials",
                            text: "We only work with natural, renewable, or recycled materials. Every fabric is OEKO-TEX certified, every wood FSC certified."
                        },
                        {
                            Icon: Users,
                            title: "Fair for People",
                            text: "All partner artisans earn above living wage. We audit every supplier annually and publish results in our yearly impact report."
                        },
                        {
                            Icon: Globe,
                            title: "Better for the Planet",
                            text: "Carbon offset shipping, plastic-free packaging, and a repair programme that extends the life of every Forma piece."
                        }
                    ].map(({ Icon, title, text }) => (
                        <div key={title} className="bg-[var(--card)] border border-[var(--border)] p-10 flex flex-col items-center text-center gap-5">
                            <Icon size={32} strokeWidth={1.5} className="text-[#BF4E1E]" />
                            <h3 className="font-serif text-[22px] text-[var(--ink)]">{title}</h3>
                            <p className="font-sans text-[14px] text-[var(--mid)] leading-relaxed">{text}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* 4. TIMELINE */}
            <section className="max-w-3xl mx-auto px-6 mb-32">
                <div className="text-center mb-16">
                    <h2 className="font-serif text-4xl text-[var(--ink)]">Commitments Timeline</h2>
                </div>
                <div className="relative border-l border-[var(--border)] ml-4 md:ml-0 pl-8 md:pl-12 flex flex-col gap-10">
                    {[
                        { year: "2018", text: "Founded with a plastic-free packaging mandate" },
                        { year: "2020", text: "Achieved carbon neutral operations" },
                        { year: "2021", text: "Launched the Forma Repair Programme" },
                        { year: "2022", text: "100% renewable energy in all partner studios" },
                        { year: "2023", text: "Joined the 1% for the Planet initiative" },
                        { year: "2024", text: "Eliminated all virgin plastic from supply chain" },
                        { year: "2026", text: "Target: fully circular product range" },
                    ].map(({ year, text }, i) => (
                        <div key={year} className="relative">
                            {/* Dot */}
                            <div className="absolute -left-[37px] md:-left-[53px] top-1.5 w-3 h-3 bg-[var(--accent)] rounded-full outline outline-4 outline-[var(--cream)]" />
                            <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-6">
                                <span className="font-sans text-[18px] font-bold text-[var(--accent)] shrink-0 w-16">{year}</span>
                                <span className="font-serif text-[20px] text-[var(--ink)]">{text}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 5. CTA */}
            <section className="bg-[#EDE7DE] py-24 px-6 text-center">
                <h2 className="font-serif text-3xl md:text-4xl text-[var(--ink)] mb-8">Read our full 2026 Impact Report</h2>
                <div className="flex flex-wrap items-center justify-center gap-4">
                    <button
                        onClick={() => alert("Report downloading...")}
                        className="font-sans text-[12px] tracking-widest uppercase bg-[var(--ink)] text-[var(--cream)] px-8 py-4 hover:bg-[var(--accent)] transition-colors duration-200"
                    >
                        Download Report
                    </button>
                    <button
                        onClick={() => setPage('shop')}
                        className="font-sans text-[12px] tracking-widest uppercase border border-[var(--ink)] text-[var(--ink)] px-8 py-4 hover:bg-[var(--ink)] hover:text-white transition-colors duration-200"
                    >
                        Learn About Our Products
                    </button>
                </div>
            </section>
        </div>
    );
}

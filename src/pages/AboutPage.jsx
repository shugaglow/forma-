import React, { useEffect } from 'react';
import teamImg1 from "../assets/images/team-1.jpg";
import teamImg2 from "../assets/images/team-2.jpg";
import teamImg3 from "../assets/images/team-3.jpg";
import aboutHero from "../assets/images/about-hero.jpg";
import aboutStory1 from "../assets/images/about-story-1.jpg";
import aboutStory2 from "../assets/images/about-story-2.jpg";
import aboutStory3 from "../assets/images/about-story-3.jpg";
import aboutValues from "../assets/images/about-values.jpg";
import valueImg1 from "../assets/images/value-1.jpg";
import valueImg2 from "../assets/images/value-2.jpg";
import valueImg3 from "../assets/images/value-3.jpg";

// ── Data ────────────────────────────────────────────────
const STATS = [
    { value: '2018', label: 'Founded' },
    { value: '340+', label: 'Artisan Partners' },
    { value: '62',   label: 'Countries Shipped To' },
    { value: '4.9★', label: 'Average Review' },
];

const VALUES = [
    {
        img: valueImg1,
        title: 'Slow Design',
        body: 'We reject the fleeting cycle of trends. Every object is designed to endure, crafted from materials that grow more beautiful with time and use.',
    },
    {
        img: valueImg2,
        title: 'Fair Partnerships',
        body: 'We bypass the middlemen, working directly with independent makers. This ensures fair wages, safe conditions, and transparent pricing for you.',
    },
    {
        img: valueImg3,
        title: 'Planet First',
        body: 'From 100% plastic-free packaging to climate-neutral shipping, every decision is weighed against its environmental impact.',
    },
];

const TEAM = [
  { name:"Lena Kraft", role:"Founder & Creative Director", img: teamImg1 },
  { name:"Ryo Tanaka", role:"Head of Sourcing", img: teamImg2 },
  { name:"Amara Osei", role:"Brand & Storytelling", img: teamImg3 },
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
            <section 
                className="relative bg-[var(--ink)] text-[var(--cream)] py-32 text-center px-6"
                style={{ 
                    backgroundImage: `url(${aboutHero})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}
            >
                <div className="absolute inset-0 z-0" style={{ background: "rgba(28,24,20,0.75)" }}></div>
                <div className="relative z-10">
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
                </div>
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

                    {/* Right: Story Images */}
                    <div className="grid grid-cols-2 gap-3 h-full min-h-[400px]">
                        <div className="row-span-2 relative overflow-hidden bg-[var(--border)] rounded-tr-3xl">
                            <img 
                                src={aboutStory1} 
                                alt="Forma studio" 
                                onError={(e) => { e.target.style.display = "none" }}
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </div>
                        <div className="relative overflow-hidden bg-[var(--border)]" style={{ aspectRatio: '1/1' }}>
                            <img 
                                src={aboutStory2} 
                                alt="Forma studio" 
                                onError={(e) => { e.target.style.display = "none" }}
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </div>
                        <div className="relative overflow-hidden bg-[var(--border)]" style={{ aspectRatio: '1/1' }}>
                            <img 
                                src={aboutStory3} 
                                alt="Forma studio" 
                                onError={(e) => { e.target.style.display = "none" }}
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 4. VALUES ───────────────────────────────── */}
            <section className="relative py-24" style={{ 
                backgroundImage: `url(${aboutValues})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}>
                <div className="absolute inset-0 z-0" style={{ background: "rgba(237,231,222,0.92)" }}></div>
                <div className="relative z-10 max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="font-sans text-[11px] tracking-widest uppercase text-[var(--mid)] mb-3 block">
                            Our Commitments
                        </span>
                        <h2 className="font-serif text-4xl text-[var(--ink)]">What guides us</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {VALUES.map(({ img, title, body }) => (
                            <div key={title} className="flex flex-col items-center text-center gap-4">
                                <div className="w-full overflow-hidden mb-2" style={{ aspectRatio: "16/9" }}>
                                    <img
                                        src={img}
                                        alt={title}
                                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                        onError={(e) => { e.target.style.display = "none" }}
                                    />
                                </div>
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
                    {TEAM.map((member) => (
                        <div key={member.name} className="flex flex-col gap-4 group">
                            <div
                                className="w-full relative overflow-hidden bg-[var(--border)]"
                                style={{ aspectRatio: '3/4' }}
                            >
                                <img
                                    src={member.img}
                                    alt={member.name}
                                    onError={(e) => { e.target.style.display = "none" }}
                                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                            <div className="text-center">
                                <h3 className="font-serif text-[22px] text-[var(--ink)]">{member.name}</h3>
                                <p className="font-sans text-[11px] tracking-widest uppercase text-[var(--mid)] mt-1">
                                    {member.role}
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

import React, { useState, useEffect } from 'react';
import { Sun, BookOpen, Heart, MapPin, Clock } from 'lucide-react';

export default function CareersPage({ setPage }) {
    const [speculativeEmail, setSpeculativeEmail] = useState('');
    const [speculativeSent, setSpeculativeSent] = useState(false);
    const [activeApplication, setActiveApplication] = useState(null);

    useEffect(() => window.scrollTo({ top: 0, behavior: 'smooth' }), []);

    const handleSpeculativeSubmit = (e) => {
        e.preventDefault();
        if (speculativeEmail) {
            setSpeculativeSent(true);
            setSpeculativeEmail('');
        }
    };

    const roles = [
        { title: "Senior Product Designer", dept: "Design", loc: "Remote (EU timezone)", type: "Full-time" },
        { title: "Supply Chain Coordinator", dept: "Operations", loc: "Copenhagen or Remote", type: "Full-time" },
        { title: "Brand Copywriter", dept: "Marketing", loc: "Remote", type: "Part-time / Contract" },
        { title: "Customer Experience Lead", dept: "Support", loc: "Remote", type: "Full-time" },
    ];

    return (
        <div className="font-sans pb-0">
            {/* 1. HEADER */}
            <section className="bg-[var(--cream)] pt-20 pb-20 px-6 text-center">
                <div className="max-w-4xl mx-auto flex flex-col items-center">
                    <nav className="flex items-center gap-2 text-[11px] tracking-widest uppercase text-[var(--mid)] mb-12">
                        <button onClick={() => setPage('home')} className="hover:text-[var(--ink)] transition-colors">Home</button>
                        <span>/</span>
                        <span className="text-[var(--mid)] cursor-default">Company</span>
                        <span>/</span>
                        <span className="text-[var(--ink)]">Careers</span>
                    </nav>
                    <h1 className="font-serif text-5xl md:text-7xl text-[var(--ink)] mb-6">Work with Us</h1>
                    <p className="font-sans text-[18px] text-[var(--mid)] leading-relaxed max-w-2xl mb-12">
                        We're a small team building something that lasts. We hire slowly and intentionally.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <span className="bg-white border border-[var(--border)] px-4 py-2 font-sans text-[13px] text-[var(--ink)] flex items-center gap-2 rounded-full">
                            <span>🌍</span> Remote-first
                        </span>
                        <span className="bg-white border border-[var(--border)] px-4 py-2 font-sans text-[13px] text-[var(--ink)] flex items-center gap-2 rounded-full">
                            <span>✦</span> 18 people
                        </span>
                        <span className="bg-white border border-[var(--border)] px-4 py-2 font-sans text-[13px] text-[var(--ink)] flex items-center gap-2 rounded-full">
                            <span>♡</span> 4.9 Glassdoor
                        </span>
                    </div>
                </div>
            </section>

            {/* 2. WHY FORMA */}
            <section className="max-w-7xl mx-auto px-6 mb-32">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-[var(--card)] border border-[var(--border)] p-10 flex flex-col gap-5">
                        <Sun size={28} strokeWidth={1.5} className="text-[#BF4E1E]" />
                        <h3 className="font-serif text-[22px] text-[var(--ink)]">Flexible by default</h3>
                        <p className="font-sans text-[14px] text-[var(--mid)] leading-relaxed">
                            Async-first culture. Work when you're most effective. No meetings before 10am, ever.
                        </p>
                    </div>
                    <div className="bg-[var(--card)] border border-[var(--border)] p-10 flex flex-col gap-5">
                        <BookOpen size={28} strokeWidth={1.5} className="text-[#BF4E1E]" />
                        <h3 className="font-serif text-[22px] text-[var(--ink)]">Learn constantly</h3>
                        <p className="font-sans text-[14px] text-[var(--mid)] leading-relaxed">
                            $2,000 annual learning budget. Monthly team book club. Weekly design critique sessions open to everyone.
                        </p>
                    </div>
                    <div className="bg-[var(--card)] border border-[var(--border)] p-10 flex flex-col gap-5">
                        <Heart size={28} strokeWidth={1.5} className="text-[#BF4E1E]" />
                        <h3 className="font-serif text-[22px] text-[var(--ink)]">Built for the long term</h3>
                        <p className="font-sans text-[14px] text-[var(--mid)] leading-relaxed">
                            Equity for every employee. 6 months parental leave. Healthcare fully covered, globally.
                        </p>
                    </div>
                </div>
            </section>

            {/* 3. OPEN ROLES */}
            <section className="max-w-4xl mx-auto px-6 mb-32">
                <h2 className="font-serif text-3xl text-[var(--ink)] mb-8 text-center">Open Roles</h2>
                <div className="flex flex-col gap-6">
                    {roles.map((role, i) => (
                        <div key={i} className="bg-white border border-[var(--border)] p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-[var(--ink)] transition-colors">
                            <div className="flex flex-col items-start gap-4">
                                <span className="bg-[#EDE7DE] text-[var(--ink)] px-3 py-1 font-sans text-[11px] tracking-widest uppercase">
                                    {role.dept}
                                </span>
                                <h3 className="font-serif text-[24px] text-[var(--ink)]">{role.title}</h3>
                                <div className="flex items-center gap-4 font-sans text-[13px] text-[var(--mid)]">
                                    <span className="flex items-center gap-1.5"><MapPin size={14} /> {role.loc}</span>
                                    <span className="flex items-center gap-1.5"><Clock size={14} /> {role.type}</span>
                                </div>
                            </div>
                            <div className="shrink-0 flex flex-col items-end">
                                {activeApplication === role.title ? (
                                    <p className="bg-[#EDE7DE] text-[var(--ink)] px-5 py-4 font-sans text-[13px] text-left max-w-[280px] border border-[var(--border)]">
                                        Send your CV to careers@forma.com with the role title in the subject line.
                                    </p>
                                ) : (
                                    <button 
                                        onClick={() => setActiveApplication(role.title)}
                                        className="font-sans text-[12px] tracking-widest uppercase bg-[var(--ink)] text-[var(--cream)] px-8 py-4 hover:bg-[var(--accent)] transition-colors duration-200"
                                    >
                                        Apply Now
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 4. NO ROLE FITS */}
            <section className="bg-[var(--ink)] text-[var(--cream)] py-24 px-6 text-center">
                <div className="max-w-2xl mx-auto">
                    <h2 className="font-serif text-3xl md:text-4xl mb-6">Don't see your role?</h2>
                    <p className="font-sans text-[15px] text-[var(--mid)] mb-10">
                        We're always open to extraordinary people. Leave your email and we'll reach out when the right position opens.
                    </p>
                    {speculativeSent ? (
                        <p className="font-sans text-[14px] text-[var(--accent)] bg-white/5 border border-white/10 px-6 py-4 inline-block">
                            Thank you. We'll be in touch if an opportunity arises.
                        </p>
                    ) : (
                        <form onSubmit={handleSpeculativeSubmit} className="flex flex-col sm:flex-row justify-center gap-4">
                            <input 
                                type="email" 
                                placeholder="your@email.com" 
                                required
                                value={speculativeEmail}
                                onChange={e => setSpeculativeEmail(e.target.value)}
                                className="font-sans text-[14px] bg-white/5 border border-white/20 text-[var(--cream)] px-5 py-3.5 focus:outline-none focus:border-white w-full sm:w-72 transition-colors"
                            />
                            <button type="submit" className="font-sans text-[12px] tracking-widest uppercase bg-[var(--cream)] text-[var(--ink)] px-8 py-3.5 hover:bg-[var(--accent)] hover:text-white transition-colors duration-200">
                                Send Speculative CV
                            </button>
                        </form>
                    )}
                </div>
            </section>

            {/* 5. VALUES FOOTER */}
            <section className="py-12 border-t border-[var(--border)] text-center px-6">
                <p className="font-sans text-[13px] text-[var(--mid)] uppercase tracking-widest flex flex-wrap justify-center gap-3">
                    <span>Slow work</span>
                    <span className="opacity-30">·</span>
                    <span>Deep focus</span>
                    <span className="opacity-30">·</span>
                    <span>Radical honesty</span>
                    <span className="opacity-30">·</span>
                    <span>Long-term thinking</span>
                </p>
            </section>
        </div>
    );
}

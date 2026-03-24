import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Clock, Check } from 'lucide-react';

export default function PressPage({ setPage }) {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => window.scrollTo({ top: 0, behavior: 'smooth' }), []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.email.trim()) newErrors.email = "Email is required";
        if (!formData.message.trim()) newErrors.message = "Message is required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        setErrors({});
        setSubmitted(true);
    };

    return (
        <div className="font-sans pb-0">
            {/* 1. HEADER */}
            <section className="pt-20 pb-16 px-6 text-center max-w-3xl mx-auto">
                <nav className="flex items-center justify-center gap-2 text-[11px] tracking-widest uppercase text-[var(--mid)] mb-12">
                    <button onClick={() => setPage('home')} className="hover:text-[var(--ink)] transition-colors">Home</button>
                    <span>/</span>
                    <span className="text-[var(--mid)] cursor-default">Company</span>
                    <span>/</span>
                    <span className="text-[var(--ink)]">Press</span>
                </nav>
                <h1 className="font-serif text-5xl md:text-6xl text-[var(--ink)] mb-6">Press & Media</h1>
                <p className="font-sans text-[16px] text-[var(--mid)] leading-relaxed">
                    For press enquiries, image requests, and interview opportunities.
                </p>
            </section>

            {/* 2. PRESS HIGHLIGHTS */}
            <section className="max-w-7xl mx-auto px-6 mb-32">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { pub: "Wallpaper*", quote: "The most considered homeware brand to launch this decade.", date: "March 2026", tag: "Feature" },
                        { pub: "Monocle", quote: "Forma proves that slow design and commercial success are not mutually exclusive.", date: "January 2026", tag: "Interview" },
                        { pub: "Dezeen", quote: "A masterclass in restraint — every piece earns its place.", date: "November 2025", tag: "Review" }
                    ].map((item, i) => (
                        <div key={i} className="bg-[var(--card)] border border-[var(--border)] p-10 flex flex-col justify-between items-start gap-8">
                            <div className="flex flex-col gap-6 w-full">
                                <h3 className="font-serif italic text-3xl text-[var(--ink)]">{item.pub}</h3>
                                <div className="border-l-2 border-[var(--accent)] pl-5 py-1">
                                    <p className="font-sans text-[15px] text-[var(--ink)] leading-relaxed opacity-90">
                                        "{item.quote}"
                                    </p>
                                </div>
                            </div>
                            <div className="w-full flex flex-col gap-5">
                                <div className="flex items-center justify-between font-sans text-[12px] uppercase tracking-widest text-[var(--mid)] pt-6 border-t border-[var(--border)]">
                                    <span>{item.date}</span>
                                    <span>{item.tag}</span>
                                </div>
                                <button onClick={() => alert("Opening article...")} className="font-sans text-[11px] uppercase tracking-widest text-[var(--ink)] underline underline-offset-4 hover:text-[var(--accent)] transition-colors self-start">
                                    Read Article
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 3. PRESS KIT */}
            <section className="bg-[#EDE7DE] py-20 px-6 mb-32">
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="font-serif text-3xl text-[var(--ink)] mb-6">Download our Press Kit</h2>
                        <p className="font-sans text-[15px] text-[var(--mid)] leading-relaxed mb-8">
                            High-resolution images, brand guidelines, founder bio, and product sheets — all in one place.
                        </p>
                        <button onClick={() => alert("Press kit downloading...")} className="font-sans text-[12px] tracking-widest uppercase bg-[var(--ink)] text-[var(--cream)] px-8 py-4 hover:bg-[var(--accent)] transition-colors duration-200">
                            Download Press Kit
                        </button>
                    </div>
                    <div>
                        <ul className="flex flex-col gap-4 font-sans text-[14px] text-[var(--ink)]">
                            <li className="flex items-center gap-3"><Check size={18} className="text-[var(--accent)]" /> Brand logo files (SVG, PNG)</li>
                            <li className="flex items-center gap-3"><Check size={18} className="text-[var(--accent)]" /> 40+ product photography images</li>
                            <li className="flex items-center gap-3"><Check size={18} className="text-[var(--accent)]" /> Founder biography and headshot</li>
                            <li className="flex items-center gap-3"><Check size={18} className="text-[var(--accent)]" /> Company fact sheet</li>
                            <li className="flex items-center gap-3"><Check size={18} className="text-[var(--accent)]" /> Brand guidelines PDF</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* 4. CONTACT PRESS TEAM */}
            <section className="max-w-6xl mx-auto px-6 mb-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                    {/* LEFT Form */}
                    <div>
                        <h2 className="font-serif text-3xl text-[var(--ink)] mb-8">Get in touch</h2>
                        {submitted ? (
                            <div className="bg-[#EDE7DE] p-10 text-center border border-[var(--border)]">
                                <span className="text-3xl block mb-3">✓</span>
                                <h3 className="font-serif text-[22px] text-[var(--ink)] mb-2">Request Sent</h3>
                                <p className="font-sans text-[14px] text-[var(--mid)]">
                                    Thanks {formData.name}, our press team will be in touch shortly.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                                <div className="flex flex-col gap-2">
                                    <label className="font-sans text-[11px] tracking-widest uppercase text-[var(--mid)]">Name</label>
                                    <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className={`w-full font-sans text-[14px] bg-transparent border ${errors.name ? 'border-red-500' : 'border-[var(--border)]'} text-[var(--ink)] px-4 py-3 focus:outline-none focus:border-[var(--ink)] transition-colors`} />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="font-sans text-[11px] tracking-widest uppercase text-[var(--mid)]">Email</label>
                                    <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className={`w-full font-sans text-[14px] bg-transparent border ${errors.email ? 'border-red-500' : 'border-[var(--border)]'} text-[var(--ink)] px-4 py-3 focus:outline-none focus:border-[var(--ink)] transition-colors`} />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="font-sans text-[11px] tracking-widest uppercase text-[var(--mid)]">Message</label>
                                    <textarea rows="4" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className={`w-full font-sans text-[14px] bg-transparent border ${errors.message ? 'border-red-500' : 'border-[var(--border)]'} text-[var(--ink)] px-4 py-3 focus:outline-none focus:border-[var(--ink)] transition-colors resize-none`} />
                                </div>
                                <button type="submit" className="mt-2 font-sans text-[12px] tracking-widest uppercase bg-[var(--ink)] text-[var(--cream)] py-4 hover:bg-[var(--accent)] transition-colors duration-200">
                                    Send Message
                                </button>
                            </form>
                        )}
                    </div>
                    {/* RIGHT Info */}
                    <div>
                        <h2 className="font-serif text-3xl text-[var(--ink)] mb-8 opacity-0 hidden lg:block">Details</h2>
                        <div className="flex flex-col gap-6">
                            <div className="bg-[var(--card)] border border-[var(--border)] p-6 flex flex-col md:flex-row md:items-center gap-4">
                                <User size={20} strokeWidth={1.5} className="text-[#BF4E1E] shrink-0 md:mr-2" />
                                <div>
                                    <p className="font-sans text-[11px] tracking-widest uppercase text-[var(--mid)] mb-1">Contact</p>
                                    <p className="font-sans text-[14px] text-[var(--ink)]">Sara Lindqvist, PR Director</p>
                                </div>
                            </div>
                            <div className="bg-[var(--card)] border border-[var(--border)] p-6 flex flex-col md:flex-row md:items-center gap-4">
                                <Mail size={20} strokeWidth={1.5} className="text-[#BF4E1E] shrink-0 md:mr-2" />
                                <div>
                                    <p className="font-sans text-[11px] tracking-widest uppercase text-[var(--mid)] mb-1">Email</p>
                                    <p className="font-sans text-[14px] text-[var(--ink)]">press@forma.com</p>
                                </div>
                            </div>
                            <div className="bg-[var(--card)] border border-[var(--border)] p-6 flex flex-col md:flex-row md:items-center gap-4">
                                <Phone size={20} strokeWidth={1.5} className="text-[#BF4E1E] shrink-0 md:mr-2" />
                                <div>
                                    <p className="font-sans text-[11px] tracking-widest uppercase text-[var(--mid)] mb-1">Phone</p>
                                    <p className="font-sans text-[14px] text-[var(--ink)]">+45 33 12 34 57</p>
                                </div>
                            </div>
                            <div className="bg-[var(--card)] border border-[var(--border)] p-6 flex flex-col md:flex-row md:items-center gap-4">
                                <Clock size={20} strokeWidth={1.5} className="text-[#BF4E1E] shrink-0 md:mr-2" />
                                <div>
                                    <p className="font-sans text-[11px] tracking-widest uppercase text-[var(--mid)] mb-1">Response time</p>
                                    <p className="font-sans text-[14px] text-[var(--ink)]">Within 48 hours</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. NOTES AT BOTTOM */}
            <section className="text-center py-10 border-t border-[var(--border)] px-6">
                <p className="font-sans text-[12px] text-[var(--mid)] max-w-xl mx-auto">
                    All Forma imagery is available for editorial use with credit. Commercial use requires written permission.
                </p>
            </section>
        </div>
    );
}

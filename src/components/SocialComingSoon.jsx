import React, { useState, useEffect } from 'react';
import { Camera, BookMarked, Music2, X } from 'lucide-react';

export default function SocialComingSoon({ platform, onClose }) {
    const [mounted, setMounted] = useState(false);
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        // Trigger CSS transition animation on mount
        const frame = requestAnimationFrame(() => setMounted(true));
        return () => cancelAnimationFrame(frame);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email) {
            setSubmitted(true);
            setEmail('');
        }
    };

    const platformIcon = {
        Instagram: Camera,
        Pinterest: BookMarked,
        TikTok: Music2,
    };
    const Icon = platformIcon[platform] || Camera;

    return (
        <div 
            className={`fixed inset-0 z-50 flex items-center justify-center p-6 transition-all duration-300 ${
                mounted ? 'opacity-100' : 'opacity-0'
            }`}
        >
            {/* 1. OVERLAY */}
            <div 
                className="absolute inset-0 bg-[#1C1814]/70 backdrop-blur-md"
                onClick={onClose}
            />

            {/* 2. MODAL CARD */}
            <div 
                className={`relative w-full max-w-[420px] shadow-2xl overflow-hidden transition-transform duration-300 ${
                    mounted ? 'scale-100' : 'scale-95'
                }`}
            >
                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className="absolute top-6 right-6 z-20 text-[var(--mid)] hover:text-[var(--cream)] transition-colors"
                >
                    <X size={24} strokeWidth={1.5} />
                </button>

                {/* Top Section */}
                <div className="relative bg-[var(--ink)] p-12 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(200,200,200,0.08) 0%, transparent 60%)' }} />
                    <div className="relative z-10">
                        <Icon size={40} strokeWidth={1.5} className="text-[#BF4E1E]" />
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="bg-[var(--cream)] p-10 flex flex-col items-center text-center">
                    <span className="font-sans text-[11px] tracking-widest uppercase text-[var(--accent)] border border-[var(--accent)] px-3 py-1 rounded-full mb-6 block">
                        Coming Soon
                    </span>
                    <h3 className="font-serif text-[28px] text-[var(--ink)] mb-4">
                        Forma on {platform}
                    </h3>
                    <p className="font-sans text-[15px] text-[var(--mid)] leading-relaxed mb-8">
                        We're putting the finishing touches on our {platform} presence. Follow along for the first post — we promise it'll be worth the wait.
                    </p>

                    {submitted ? (
                        <p className="font-sans text-[14px] text-[var(--ink)] bg-[#EDE7DE] border border-[var(--border)] px-6 py-4 w-full block">
                            ✓ We'll let you know when we go live on {platform}
                        </p>
                    ) : (
                        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Notify me when you're live"
                                className="w-full font-sans text-[14px] bg-white border border-[var(--border)] text-[var(--ink)] placeholder:text-[var(--mid)] px-4 py-3.5 focus:outline-none focus:border-[var(--ink)] transition-colors text-center"
                            />
                            <button
                                type="submit"
                                className="w-full font-sans text-[12px] tracking-widest uppercase bg-[var(--ink)] text-[var(--cream)] py-4 hover:bg-[var(--accent)] transition-colors duration-200"
                            >
                                Notify Me
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

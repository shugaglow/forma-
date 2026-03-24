import React, { useState } from 'react';
import SocialComingSoon from './SocialComingSoon';

// ── Social Icons ─────────────────────────────────────────
const InstagramIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none"
        viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4.5" />
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
);

const PinterestIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"
        viewBox="0 0 24 24">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.08 3.16 9.44 7.64 11.21-.1-.95-.2-2.41.04-3.45.22-.9 1.47-6.24 1.47-6.24s-.38-.75-.38-1.87c0-1.75 1.02-3.06 2.28-3.06 1.08 0 1.6.81 1.6 1.78 0 1.08-.69 2.7-1.05 4.2-.3 1.26.62 2.29 1.86 2.29 2.23 0 3.73-2.88 3.73-6.29 0-2.6-1.77-4.43-4.3-4.43-2.93 0-4.65 2.2-4.65 4.47 0 .88.34 1.83.76 2.35a.3.3 0 0 1 .07.29c-.08.32-.25 1.02-.29 1.16-.05.19-.17.23-.39.14-1.48-.69-2.4-2.86-2.4-4.6 0-3.74 2.72-7.18 7.84-7.18 4.12 0 7.31 2.93 7.31 6.86 0 4.09-2.58 7.38-6.16 7.38-1.2 0-2.34-.62-2.73-1.36l-.74 2.76c-.27 1.03-1 2.32-1.49 3.1A12 12 0 0 0 12 24c6.63 0 12-5.37 12-12S18.63 0 12 0z"/>
    </svg>
);

const TiktokIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"
        viewBox="0 0 24 24">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.79 1.54V6.79a4.85 4.85 0 0 1-1.02-.1z"/>
    </svg>
);

// ── Link columns data ─────────────────────────────────────
const COLUMNS = [
    {
        heading: 'Company',
        links: [
            { label: 'Our Story', page: 'about' },
            { label: 'Lookbook', page: 'lookbook' },
            { label: 'Sustainability', page: 'sustainability' },
            { label: 'Press', page: 'press' },
            { label: 'Careers', page: 'careers' },
            { label: 'Stockists', page: 'home' },
        ],
    },
    {
        heading: 'Help',
        links: [
            { label: 'FAQ', page: 'shipping' },
            { label: 'Shipping & Returns', page: 'shipping' },
            { label: 'Care Guides', page: 'care' },
            { label: 'Size Guide', page: 'size-guide' },
            { label: 'Contact Us', page: 'contact' },
        ],
    },
];

// ── Component ─────────────────────────────────────────────
export default function Footer({ setPage, goToShop }) {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);
    const [activeSocial, setActiveSocial] = useState(null);

    const shopLinks = [
        { label: "New Arrivals", action: () => goToShop("All", "new") },
        { label: "Ceramics", action: () => goToShop("Ceramics") },
        { label: "Textiles", action: () => goToShop("Textiles") },
        { label: "Lighting", action: () => goToShop("Lighting") },
        { label: "Furniture", action: () => goToShop("Furniture") },
        { label: "Sale", action: () => goToShop("All", "sale") },
    ];

    const ALL_COLUMNS = [
        { heading: 'Shop', links: shopLinks },
        ...COLUMNS
    ];

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email) {
            setSubscribed(true);
            setEmail('');
        }
    };

    return (
        <footer className="bg-[var(--ink)] text-[var(--cream)]">

            {/* ── Main Grid ──────────────────────────────── */}
            <div className="max-w-7xl mx-auto px-6 pt-16 pb-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

                    {/* Brand Column */}
                    <div className="flex flex-col gap-5">
                        <button
                            onClick={() => setPage('home')}
                            className="font-serif text-4xl tracking-wide text-[var(--cream)] hover:opacity-70 transition-opacity text-left leading-none"
                        >
                            Forma
                        </button>
                        <p className="font-sans text-[13px] text-[var(--mid)] leading-relaxed max-w-[200px]">
                            Objects made with intention. Crafted in small batches by independent makers.
                        </p>
                        {/* Social Buttons */}
                        <div className="flex items-center gap-3 mt-1">
                            {[
                                { label: "IG", platform: "Instagram" },
                                { label: "PI", platform: "Pinterest" },
                                { label: "TK", platform: "TikTok" },
                            ].map((social) => (
                                <button
                                    key={social.platform}
                                    aria-label={social.platform}
                                    onClick={() => setActiveSocial(social.platform)}
                                    className="w-9 h-9 border border-[var(--mid)] rounded-full flex items-center justify-center font-sans text-[11px] text-[var(--mid)] hover:border-[var(--cream)] hover:text-[var(--cream)] transition-colors duration-200"
                                >
                                    {social.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Link Columns */}
                    {ALL_COLUMNS.map(({ heading, links }) => (
                        <div key={heading}>
                            <h4 className="font-sans text-[11px] tracking-widest uppercase text-[var(--mid)] mb-5">
                                {heading}
                            </h4>
                            <ul className="flex flex-col gap-3">
                                {links.map((link) => (
                                    <li key={link.label}>
                                        <button
                                            onClick={() => link.action ? link.action() : setPage(link.page)}
                                            className="font-sans text-[13px] text-[var(--cream)] hover:text-[var(--mid)] transition-colors duration-150 text-left"
                                        >
                                            {link.label}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* ── Newsletter ──────────────────────────── */}
                <div className="mt-14 border-t border-white/10 pt-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div>
                        <p className="font-sans text-[11px] tracking-widest uppercase text-[var(--mid)] mb-1">
                            Newsletter
                        </p>
                        <p className="font-sans text-[13px] text-[var(--cream)]">
                            Slow stories and new arrivals, delivered occasionally.
                        </p>
                    </div>
                    {subscribed ? (
                        <p className="font-sans text-[13px] text-[var(--mid)] italic">
                            Thank you for subscribing ✦
                        </p>
                    ) : (
                        <form onSubmit={handleSubscribe} className="flex w-full md:w-auto">
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="your@email.com"
                                className="font-sans text-[13px] bg-white/5 border border-white/20 text-[var(--cream)] placeholder:text-[var(--mid)] px-4 py-2.5 flex-1 md:w-64 focus:outline-none focus:border-[var(--cream)] transition-colors"
                            />
                            <button
                                type="submit"
                                className="font-sans text-[11px] tracking-widest uppercase bg-[var(--cream)] text-[var(--ink)] px-5 py-2.5 hover:bg-[var(--accent)] hover:text-white transition-colors duration-200 whitespace-nowrap"
                            >
                                Subscribe
                            </button>
                        </form>
                    )}
                </div>
            </div>

            {/* ── Bottom Bar ──────────────────────────────── */}
            <div className="border-t border-white/10">
                <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-2">
                    <p className="font-sans text-[11px] text-[var(--mid)]">
                        © {new Date().getFullYear()} Forma. All rights reserved.
                    </p>
                    <p className="font-sans text-[11px] text-[var(--mid)] tracking-widest uppercase">
                        Made with intention. Designed for longevity.
                    </p>
                </div>
            </div>

            {/* ── Social Coming Soon Modal ──────────────────── */}
            {activeSocial && (
                <SocialComingSoon
                    platform={activeSocial}
                    onClose={() => setActiveSocial(null)}
                />
            )}
        </footer>
    );
}

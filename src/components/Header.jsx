import React, { useState, useEffect, useRef } from 'react';

const NAV_LINKS = [
    { label: 'Shop', page: 'shop' },
    { label: 'Lookbook', page: 'lookbook' },
    { label: 'About', page: 'about' },
];

// ── Icons (inline SVG to avoid extra deps) ───────────────
const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none"
        viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <circle cx="11" cy="11" r="7" />
        <path strokeLinecap="round" d="M16.5 16.5l4 4" />
    </svg>
);

const HeartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none"
        viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round"
            d="M12 21C12 21 3 14.5 3 8.5A4.5 4.5 0 0 1 12 6.257 4.5 4.5 0 0 1 21 8.5C21 14.5 12 21 12 21z" />
    </svg>
);

const BagIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none"
        viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round"
            d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" strokeLinecap="round" />
        <path strokeLinecap="round" d="M16 10a4 4 0 01-8 0" />
    </svg>
);

const MenuIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none"
        viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
);

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none"
        viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

// ── Component ────────────────────────────────────────────
const announcements = [
    "Free worldwide shipping on orders over $250",
    "New S/S 26 collection — now live",
    "60-day free returns, no questions asked",
    "Handmade by artisans across Europe & Japan",
];

export default function Header({ page, setPage, cartCount, wishlistCount = 0, searchQuery = '', onSearch, resultCount = 0 }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [current, setCurrent] = useState(0);
    const [animating, setAnimating] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setAnimating(true);
            setTimeout(() => {
                setCurrent(prev => (prev + 1) % announcements.length);
                setAnimating(false);
            }, 400);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    // Autofocus search input when opened
    useEffect(() => {
        if (searchOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [searchOpen]);

    // Add shadow on scroll
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const navigate = (target) => {
        setPage(target);
        setMenuOpen(false);
    };

    return (
        <header className="sticky top-0 z-50 w-full overflow-hidden">
            {/* ── Announcement Bar ─────────────────────────── */}
            <div className="relative w-full overflow-hidden bg-[var(--ink)] text-[var(--cream)] text-[11px] tracking-widest uppercase text-center py-2 px-4">
                <span className={`transition-all duration-400 inline-block ${animating ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0'}`}>
                    {announcements[current]}
                </span>
                <div className="absolute bottom-[2px] left-0 right-0 flex justify-center items-center gap-1.5 pointer-events-none">
                    {announcements.map((_, idx) => (
                        <div 
                            key={idx}
                            className={`transition-all duration-300 rounded-full bg-white ${idx === current ? 'w-3 h-1 opacity-100' : 'w-1 h-1 opacity-30'}`}
                        />
                    ))}
                </div>
            </div>

            {/* ── Main Header ──────────────────────────────── */}
            <div
                className={`bg-[var(--cream)] w-full overflow-hidden transition-shadow duration-300 ${scrolled ? 'shadow-md' : 'shadow-none'}`}
            >
                <div className="relative w-full max-w-7xl mx-auto px-6 h-[68px] flex items-center justify-between">

                    {/* Left: Nav links (desktop) + Hamburger (mobile) */}
                    <div className="flex items-center gap-8 w-1/3">
                        {/* Desktop Nav */}
                        <nav className="hidden md:flex items-center gap-7">
                            {NAV_LINKS.map(({ label, page: target }) => (
                                <button
                                    key={target}
                                    onClick={() => navigate(target)}
                                    className={`font-sans text-[12px] tracking-widest uppercase transition-colors duration-150 ${
                                        page === target
                                            ? 'text-[var(--ink)] font-semibold'
                                            : 'text-[var(--mid)] hover:text-[var(--ink)]'
                                    }`}
                                >
                                    {label}
                                </button>
                            ))}
                        </nav>

                        {/* Mobile Hamburger */}
                        <button
                            className="md:hidden text-[var(--ink)] focus:outline-none"
                            onClick={() => setMenuOpen((v) => !v)}
                            aria-label="Toggle menu"
                        >
                            {menuOpen ? <CloseIcon /> : <MenuIcon />}
                        </button>
                    </div>

                    {/* Center: Logo */}
                    <div className="flex justify-center w-1/3">
                        <button 
                          onClick={() => setPage("home")}
                          style={{ 
                            background:"none", 
                            border:"none", 
                            cursor:"pointer",
                            fontFamily:"'Cormorant Garamond', serif",
                            fontSize:"1.9rem",
                            fontWeight:"700",
                            letterSpacing:"0.18em",
                            textTransform:"uppercase",
                            color:"#1C1814",
                            position:"absolute",
                            left:"50%",
                            top:"50%",
                            transform:"translateX(-50%) translateY(-50%)",
                            whiteSpace:"nowrap",
                            lineHeight:"1"
                          }}
                        >
                          Forma
                        </button>
                    </div>

                    {/* Right: Icons */}
                    <div className="flex items-center justify-end gap-5 w-1/3">
                        <button
                            onClick={() => setSearchOpen((v) => !v)}
                            className="text-[var(--mid)] hover:text-[var(--ink)] transition-colors hidden md:block"
                            aria-label="Search"
                        >
                            <SearchIcon />
                        </button>
                        <button
                            onClick={() => navigate('wishlist')}
                            className="relative text-[var(--mid)] hover:text-[var(--ink)] transition-colors hidden md:block"
                            aria-label="Wishlist"
                        >
                            <HeartIcon />
                            {wishlistCount > 0 && (
                                <span className="absolute -top-1.5 -right-2.5 bg-[var(--accent)] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-sans font-semibold">
                                    {wishlistCount}
                                </span>
                            )}
                        </button>
                        <button
                            onClick={() => navigate('cart')}
                            className="relative flex items-center gap-2 bg-[var(--ink)] text-[var(--cream)] text-[11px] tracking-widest uppercase font-sans px-4 py-2 hover:bg-[var(--accent)] transition-colors duration-200"
                            aria-label="Open cart"
                        >
                            <BagIcon />
                            <span>Bag</span>
                            {cartCount > 0 && (
                                <span className="absolute -top-1.5 -right-1.5 bg-[var(--accent)] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-sans font-semibold">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                    </div>

                </div>
            </div>

            {/* ── Search Bar Dropdown ───────────────────────── */}
            <div
                className={`bg-white border-b border-[var(--border)] overflow-hidden transition-all duration-300 ease-in-out ${
                    searchOpen ? 'max-h-32 opacity-100 py-4' : 'max-h-0 opacity-0 py-0'
                }`}
            >
                <div className="max-w-2xl mx-auto px-6 flex flex-col gap-2">
                    <div className="flex items-center gap-4">
                        <SearchIcon />
                        <input
                            ref={inputRef}
                            type="text"
                            value={searchQuery}
                            onChange={(e) => {
                                onSearch?.(e.target.value);
                            }}
                            placeholder="Search products..."
                            className="flex-1 font-sans text-[14px] text-[var(--ink)] placeholder:text-[var(--mid)] bg-transparent outline-none"
                        />
                        <button
                            onClick={() => {
                                setSearchOpen(false);
                                onSearch?.('');
                            }}
                            className="text-[var(--mid)] hover:text-[var(--ink)] transition-colors"
                            aria-label="Close search"
                        >
                            <CloseIcon />
                        </button>
                    </div>
                    {searchQuery.trim() !== '' && (
                        <p className="font-sans text-[11px] text-[var(--mid)] pl-9">
                            Showing results for "{searchQuery}" — {resultCount} {resultCount === 1 ? 'product' : 'products'} found
                        </p>
                    )}
                </div>
            </div>

            {/* ── Mobile Slide-Down Menu ────────────────────── */}
            <div
                className={`md:hidden bg-[var(--cream)] border-t border-[var(--border)] overflow-hidden transition-all duration-300 ease-in-out ${
                    menuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
                <nav className="flex flex-col px-6 py-4 gap-4">
                    {NAV_LINKS.map(({ label, page: target }) => (
                        <button
                            key={target}
                            onClick={() => navigate(target)}
                            className={`text-left font-sans text-[12px] tracking-widest uppercase transition-colors ${
                                page === target
                                    ? 'text-[var(--ink)] font-semibold'
                                    : 'text-[var(--mid)] hover:text-[var(--ink)]'
                            }`}
                        >
                            {label}
                        </button>
                    ))}
                    <hr className="border-[var(--border)]" />
                    <div className="flex items-center gap-6">
                        <button 
                            className="text-[var(--mid)] hover:text-[var(--ink)]" 
                            aria-label="Search"
                            onClick={() => {
                                setMenuOpen(false);
                                setSearchOpen(true);
                            }}
                        >
                            <SearchIcon />
                        </button>
                        <button 
                            className="relative text-[var(--mid)] hover:text-[var(--ink)]" 
                            aria-label="Wishlist"
                            onClick={() => navigate('wishlist')}
                        >
                            <HeartIcon />
                            {wishlistCount > 0 && (
                                <span className="absolute -top-1.5 -right-2.5 bg-[var(--accent)] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-sans font-semibold">
                                    {wishlistCount}
                                </span>
                            )}
                        </button>
                    </div>
                </nav>
            </div>
        </header>
    );
}
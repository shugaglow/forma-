import React, { useEffect } from 'react';
import { PRODUCTS } from '../data/products';

// Match existing products to the requested vibe
// Look 1: Ritual Tea Set (Stoneware Bowl) + Wabi Linen Throw
// Look 2: Arc Floor Lamp (Brass Table Lamp) + Grid Wool Cushion
// Look 3: Ossian Dining Chair (Oak Side Table) + Dusk Stoneware Vase (Terracotta Vase)

const LOOKS = [
    {
        num: '01',
        title: 'Morning Light',
        desc: 'Start the day embracing slowness. Natural linens and organic stoneware forms invite quiet contemplation before the world wakes up.',
        imgBg: '#E8E0D2',
        imgEmoji: '☕️',
        products: [PRODUCTS[0], PRODUCTS[1]], // Bowl, Throw
    },
    {
        num: '02',
        title: 'Reading Nook',
        desc: 'A dedicated corner for losing yourself in a good book. Layered bouclé textures and warm, directional light create the ultimate cocoon.',
        imgBg: '#D4C9B8',
        imgEmoji: '📖',
        products: [PRODUCTS[6], PRODUCTS[5]], // Lamp, Cushion
    },
    {
        num: '03',
        title: 'The Long Table',
        desc: 'Gather around pieces that tell a story. Solid wood grains paired with earthy reactive glazes set the stage for endless evening conversations.',
        imgBg: '#C9C0B0',
        imgEmoji: '🍽️',
        products: [PRODUCTS[3], PRODUCTS[4]], // Oak table, Vase
    },
];

export default function LookbookPage({ setPage, setSelectedProduct, wishlist, toggleWishlist }) {

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const goToProduct = (product) => {
        setSelectedProduct(product);
        setPage('product');
    };

    return (
        <div className="font-sans">

            {/* ── Header ─────────────────────────────────────── */}
            <div className="bg-[var(--ink)] text-[var(--cream)] py-32 text-center px-6">
                <span className="font-sans text-[11px] tracking-widest uppercase text-[var(--mid)] mb-4 block">
                    Lookbook S/S 26
                </span>
                <h1 className="font-serif text-5xl md:text-7xl">Living with Forma</h1>
            </div>

            {/* ── Looks List ─────────────────────────────────── */}
            <div className="max-w-7xl mx-auto px-6 py-24 flex flex-col gap-32">
                {LOOKS.map((look, index) => {
                    const isEven = index % 2 !== 0;

                    return (
                        <div
                            key={look.num}
                            className={`grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center ${
                                isEven ? 'lg:[direction:rtl]' : ''
                            }`}
                        >
                            {/* ── Image Side ──────────────────────── */}
                            <div
                                className="relative overflow-hidden flex flex-col items-center justify-center [direction:ltr]"
                                style={{ background: look.imgBg, aspectRatio: '4/5' }}
                            >
                                <span className="text-9xl select-none hover:scale-105 transition-transform duration-700">
                                    {look.imgEmoji}
                                </span>
                            </div>

                            {/* ── Text Side ───────────────────────── */}
                            <div className="flex flex-col gap-6 [direction:ltr]">
                                <span className="font-sans text-[13px] text-[var(--mid)]">
                                    Look — {look.num}
                                </span>
                                <h2 className="font-serif text-4xl text-[var(--ink)]">
                                    {look.title}
                                </h2>
                                <p className="font-sans text-[15px] text-[var(--mid)] leading-relaxed max-w-md">
                                    {look.desc}
                                </p>

                                {/* Shoppable products */}
                                <div className="mt-8 flex flex-col gap-4">
                                    <p className="font-sans text-[11px] tracking-widest uppercase text-[var(--ink)] mb-1">
                                        Featured in this look
                                    </p>
                                    <div className="flex flex-col gap-4 border-b border-[var(--border)] pb-6 mb-2">
                                        {look.products.map((p) => (
                                            <button
                                                key={p.id}
                                                onClick={() => goToProduct(p)}
                                                className="group flex items-center justify-between text-left hover:bg-white/50 p-2 -mx-2 rounded transition-colors"
                                            >
                                                <div className="flex items-center gap-4">
                                                    {/* Mini thumb */}
                                                    <div
                                                        className="w-12 h-12 flex items-center justify-center text-xl shrink-0"
                                                        style={{ background: p.bg }}
                                                    >
                                                        {p.emoji}
                                                    </div>
                                                    <div>
                                                        <p className="font-serif text-[17px] text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors">
                                                            {p.name}
                                                        </p>
                                                        <p className="font-sans text-[11px] text-[var(--mid)] mt-0.5">
                                                            ${p.price}
                                                        </p>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        toggleWishlist?.(p.id);
                                                    }}
                                                    className={`transition-colors duration-150 ml-auto mr-4 ${
                                                        wishlist?.includes(p.id) ? 'text-[var(--accent)]' : 'text-[var(--mid)] hover:text-[var(--ink)]'
                                                    }`}
                                                >
                                                    <svg width="14" height="14" viewBox="0 0 16 16" fill={wishlist?.includes(p.id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
                                                        <path d="M8 14s-6-4.5-6-8.5A3.5 3.5 0 0 1 5.5 2C6.8 2 8 3.2 8 3.2S9.2 2 10.5 2A3.5 3.5 0 0 1 14 5.5C14 9.5 8 14 8 14z" />
                                                    </svg>
                                                </button>
                                                <span className="font-sans text-[11px] tracking-widest uppercase text-[var(--mid)] group-hover:text-[var(--ink)] transition-colors hidden sm:block">
                                                    View
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                    <button
                                        onClick={() => setPage('shop')}
                                        className="self-start font-sans text-[11px] tracking-widest uppercase border border-[var(--border)] text-[var(--ink)] px-6 py-3.5 hover:border-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--cream)] transition-colors duration-200"
                                    >
                                        Shop this look
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

        </div>
    );
}

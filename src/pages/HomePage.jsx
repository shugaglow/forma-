import React from 'react';
import { PRODUCTS, CATEGORIES } from '../data/products';
import ProductCard from '../components/ProductCard';

// ── Category tile config ──────────────────────────────────
const CATEGORY_TILES = [
    { name: 'Ceramics',  emoji: '🏺', bg: '#DDD3C4', count: 24 },
    { name: 'Lighting',  emoji: '💡', bg: '#D4C9B8', count: 18 },
    { name: 'Furniture', emoji: '🪵', bg: '#C9C0B0', count: 31 },
    { name: 'Textiles',  emoji: '🧣', bg: '#E8E0D2', count: 27 },
];

const VALUES = [
    {
        icon: '🌿',
        title: 'Responsibly Sourced',
        body: 'Every material is traced to its origin. We work only with makers who share our commitment to ethical production and fair wages.',
    },
    {
        icon: '📦',
        title: 'Plastic-Free Packaging',
        body: 'All orders are packed in recycled paper and natural twine. Zero plastic — from our studio to your door.',
    },
    {
        icon: '↩︎',
        title: '60-Day Returns',
        body: 'Take your time. If anything isn\'t right, we offer free returns within 60 days, no questions asked.',
    },
];

export default function HomePage({ setPage, setSelectedProduct, addToCart, wishlist, toggleWishlist }) {
    const heroProducts  = PRODUCTS.slice(0, 4);
    const featuredProducts = PRODUCTS.slice(0, 3);
    const editorialProducts = PRODUCTS.slice(4, 8);

    const goToProduct = (product) => {
        setSelectedProduct(product);
        setPage('product');
    };

    return (
        <div className="font-sans">

            {/* ── 1. HERO ─────────────────────────────────── */}
            <section className="bg-[var(--ink)] text-[var(--cream)] min-h-[90vh] flex items-center">
                <div className="max-w-7xl mx-auto px-6 py-20 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left copy */}
                    <div className="flex flex-col gap-7">
                        <span className="font-sans text-[11px] tracking-widest uppercase text-[var(--mid)]">
                            Spring / Summer 2026
                        </span>
                        <h1 className="font-serif text-6xl lg:text-7xl leading-[1.05] text-[var(--cream)]">
                            Objects for<br />the slow life.
                        </h1>
                        <p className="font-sans text-[15px] text-[var(--mid)] leading-relaxed max-w-md">
                            Handcrafted homeware made by independent artisans. Each piece is designed
                            to age beautifully and outlast every passing trend.
                        </p>
                        <div className="flex flex-wrap gap-3 pt-2">
                            <button
                                onClick={() => setPage('shop')}
                                className="font-sans text-[11px] tracking-widest uppercase bg-[var(--cream)] text-[var(--ink)] px-7 py-3.5 hover:bg-[var(--accent)] hover:text-white transition-colors duration-200"
                            >
                                Shop Collection
                            </button>
                            <button
                                onClick={() => setPage('about')}
                                className="font-sans text-[11px] tracking-widest uppercase border border-white/30 text-[var(--cream)] px-7 py-3.5 hover:border-white hover:bg-white/10 transition-colors duration-200"
                            >
                                Our Story
                            </button>
                        </div>
                    </div>

                    {/* Right: 2×2 mini product cards */}
                    <div className="grid grid-cols-2 gap-3">
                        {heroProducts.map((product) => (
                            <button
                                key={product.id}
                                onClick={() => goToProduct(product)}
                                className="relative overflow-hidden group"
                                style={{ background: product.bg, aspectRatio: '4/5' }}
                            >
                                <span className="absolute inset-0 flex items-center justify-center text-5xl
                                                 transition-transform duration-500 group-hover:scale-110 select-none">
                                    {product.emoji}
                                </span>
                                <div className="absolute bottom-0 left-0 right-0 bg-black/30 px-3 py-2
                                                translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                    <p className="font-sans text-[11px] text-white tracking-wide truncate">
                                        {product.name}
                                    </p>
                                </div>
                                {product.badge && (
                                    <span className={`absolute top-2 left-2 font-sans text-[9px] tracking-widest uppercase px-2 py-0.5 ${
                                        product.badge === 'Sale'
                                            ? 'bg-[var(--accent)] text-white'
                                            : 'bg-black/70 text-white'
                                    }`}>
                                        {product.badge}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 2. CATEGORY GRID ─────────────────────────── */}
            <section className="max-w-7xl mx-auto px-6 py-20">
                <div className="flex items-end justify-between mb-10">
                    <h2 className="font-serif text-4xl text-[var(--ink)]">Shop by Category</h2>
                    <button
                        onClick={() => setPage('shop')}
                        className="font-sans text-[11px] tracking-widest uppercase text-[var(--mid)] hover:text-[var(--ink)] transition-colors border-b border-[var(--mid)] hover:border-[var(--ink)] pb-0.5"
                    >
                        View All
                    </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {CATEGORY_TILES.map(({ name, emoji, bg, count }) => (
                        <button
                            key={name}
                            onClick={() => setPage('shop')}
                            className="group relative overflow-hidden flex flex-col items-center justify-center gap-3 py-12 px-4 transition-transform duration-300 hover:-translate-y-1"
                            style={{ background: bg }}
                        >
                            <span className="text-5xl transition-transform duration-500 group-hover:scale-110 select-none">
                                {emoji}
                            </span>
                            <div className="text-center">
                                <p className="font-serif text-[20px] text-[var(--ink)]">{name}</p>
                                <p className="font-sans text-[11px] text-[var(--mid)] mt-0.5">{count} pieces</p>
                            </div>
                        </button>
                    ))}
                </div>
            </section>

            {/* ── 3. FEATURED PRODUCTS ─────────────────────── */}
            <section className="bg-[var(--card)] py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-end justify-between mb-10">
                        <div>
                            <p className="font-sans text-[11px] tracking-widest uppercase text-[var(--mid)] mb-2">
                                Just In
                            </p>
                            <h2 className="font-serif text-4xl text-[var(--ink)]">New Arrivals</h2>
                        </div>
                        <button
                            onClick={() => setPage('shop')}
                            className="font-sans text-[11px] tracking-widest uppercase text-[var(--mid)] hover:text-[var(--ink)] transition-colors border-b border-[var(--mid)] hover:border-[var(--ink)] pb-0.5"
                        >
                            All Products
                        </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {featuredProducts.map((product, i) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                index={i}
                                onClick={() => goToProduct(product)}
                                addToCart={addToCart}
                                isWishlisted={wishlist?.includes(product.id)}
                                onToggleWishlist={toggleWishlist}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 4. EDITORIAL BAND ────────────────────────── */}
            <section style={{ background: '#EDE7DE' }}>
                <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Left copy */}
                    <div className="flex flex-col gap-6">
                        <p className="font-sans text-[11px] tracking-widest uppercase text-[var(--mid)]">
                            Our Philosophy
                        </p>
                        <h2 className="font-serif text-5xl leading-tight text-[var(--ink)]">
                            Designed to<br />outlast trends.
                        </h2>
                        <p className="font-sans text-[15px] text-[var(--mid)] leading-relaxed max-w-sm">
                            We believe in fewer, better things. Everything in Forma's collection is
                            chosen for its craft, its material honesty, and its ability to grow
                            more beautiful with age.
                        </p>
                        <button
                            onClick={() => setPage('about')}
                            className="self-start font-sans text-[11px] tracking-widest uppercase bg-[var(--ink)] text-[var(--cream)] px-7 py-3.5 hover:bg-[var(--accent)] transition-colors duration-200"
                        >
                            Read Our Story
                        </button>
                    </div>

                    {/* Right: 2×2 emoji tiles */}
                    <div className="grid grid-cols-2 gap-3">
                        {editorialProducts.map((product) => (
                            <div
                                key={product.id}
                                className="flex items-center justify-center text-5xl select-none"
                                style={{ background: product.bg, aspectRatio: '1/1' }}
                            >
                                {product.emoji}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 5. VALUES ────────────────────────────────── */}
            <section className="max-w-7xl mx-auto px-6 py-20">
                <div className="text-center mb-12">
                    <p className="font-sans text-[11px] tracking-widest uppercase text-[var(--mid)] mb-2">
                        Why Forma
                    </p>
                    <h2 className="font-serif text-4xl text-[var(--ink)]">Made with intention</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {VALUES.map(({ icon, title, body }) => (
                        <div
                            key={title}
                            className="bg-[var(--card)] border border-[var(--border)] p-8 flex flex-col gap-4"
                        >
                            <span className="text-3xl">{icon}</span>
                            <h3 className="font-serif text-[22px] text-[var(--ink)]">{title}</h3>
                            <p className="font-sans text-[13px] text-[var(--mid)] leading-relaxed">{body}</p>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
}

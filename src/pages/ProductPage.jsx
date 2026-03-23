import React, { useState, useEffect } from 'react';
import { PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard';

// ── Accordion Item ────────────────────────────────────────
function AccordionItem({ title, children }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="border-t border-[var(--border)]">
            <button
                onClick={() => setOpen((v) => !v)}
                className="w-full flex items-center justify-between py-4 font-sans text-[12px] tracking-widest uppercase text-[var(--ink)] hover:text-[var(--mid)] transition-colors"
            >
                <span>{title}</span>
                <span className="text-lg leading-none">{open ? '−' : '+'}</span>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-96 pb-5' : 'max-h-0'}`}>
                <div className="font-sans text-[13px] text-[var(--mid)] leading-relaxed">
                    {children}
                </div>
            </div>
        </div>
    );
}

// ── Heart Icon ────────────────────────────────────────────
const HeartIcon = ({ filled }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill={filled ? "currentColor" : "none"}
        viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round"
            d="M12 21C12 21 3 14.5 3 8.5A4.5 4.5 0 0 1 12 6.257 4.5 4.5 0 0 1 21 8.5C21 14.5 12 21 12 21z" />
    </svg>
);

// ── Component ─────────────────────────────────────────────
export default function ProductPage({ product, setPage, setSelectedProduct, addToCart, wishlist, toggleWishlist }) {
    const [selectedSize, setSelectedSize]   = useState(null);
    const [qty, setQty]                     = useState(1);
    const [activeThumb, setActiveThumb]     = useState(0);

    // Reset state when product changes
    useEffect(() => {
        setSelectedSize(null);
        setQty(1);
        setActiveThumb(0);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [product?.id]);

    if (!product) return null;

    const related = PRODUCTS.filter(
        (p) => p.category === product.category && p.id !== product.id
    ).slice(0, 3);

    const savings = product.oldPrice ? product.oldPrice - product.price : 0;
    const totalPrice = (product.price * qty).toFixed(0);

    const handleAddToCart = () => {
        addToCart(product, qty, selectedSize);
        setPage('cart');
    };

    const goToProduct = (p) => {
        setSelectedProduct(p);
        setPage('product');
    };

    // Fake thumbnails — same emoji, varying opacity for demo
    const thumbOpacities = [1, 0.7, 0.45];

    return (
        <div className="font-sans">
            <div className="max-w-7xl mx-auto px-6 py-12">

                {/* ── Breadcrumb ───────────────────────────── */}
                <nav className="flex items-center gap-2 text-[11px] tracking-widest uppercase text-[var(--mid)] mb-10">
                    <button onClick={() => setPage('home')} className="hover:text-[var(--ink)] transition-colors">Home</button>
                    <span>/</span>
                    <button onClick={() => setPage('shop')} className="hover:text-[var(--ink)] transition-colors">Shop</button>
                    <span>/</span>
                    <span className="text-[var(--ink)] truncate max-w-[200px]">{product.name}</span>
                </nav>

                {/* ── 2-Column Layout ──────────────────────── */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">

                    {/* ── LEFT: Images ─────────────────────── */}
                    <div className="flex flex-col gap-4">
                        {/* Main image */}
                        <div
                            className="relative overflow-hidden flex items-center justify-center"
                            style={{ background: product.bg, aspectRatio: '3/4' }}
                        >
                            <span
                                className="text-9xl select-none transition-opacity duration-300"
                                style={{ opacity: thumbOpacities[activeThumb] }}
                            >
                                {product.emoji}
                            </span>
                            {product.badge && (
                                <span className={`absolute top-4 left-4 font-sans text-[10px] tracking-widest uppercase px-3 py-1 ${
                                    product.badge === 'Sale'
                                        ? 'bg-[var(--accent)] text-white'
                                        : 'bg-[var(--ink)] text-[var(--cream)]'
                                }`}>
                                    {product.badge}
                                </span>
                            )}
                        </div>

                        {/* Thumbnails */}
                        <div className="grid grid-cols-3 gap-3">
                            {thumbOpacities.map((opacity, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveThumb(i)}
                                    className={`flex items-center justify-center border-2 transition-colors duration-150 ${
                                        activeThumb === i
                                            ? 'border-[var(--ink)]'
                                            : 'border-transparent hover:border-[var(--border)]'
                                    }`}
                                    style={{ background: product.bg, aspectRatio: '1/1' }}
                                >
                                    <span className="text-3xl select-none" style={{ opacity }}>
                                        {product.emoji}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* ── RIGHT: Info ──────────────────────── */}
                    <div className="flex flex-col gap-6">

                        {/* Category tag */}
                        <span className="font-sans text-[11px] tracking-widest uppercase text-[var(--mid)]">
                            {product.category}
                        </span>

                        {/* Name */}
                        <h1 className="font-serif text-5xl leading-tight text-[var(--ink)]">
                            {product.name}
                        </h1>

                        {/* Price row */}
                        <div className="flex items-center gap-3 flex-wrap">
                            <span className="font-sans text-[22px] text-[var(--ink)]">${product.price}</span>
                            {product.oldPrice && (
                                <>
                                    <span className="font-sans text-[16px] text-[var(--mid)] line-through">
                                        ${product.oldPrice}
                                    </span>
                                    <span className="font-sans text-[11px] tracking-widest uppercase bg-[var(--accent)] text-white px-2.5 py-1">
                                        Save ${savings}
                                    </span>
                                </>
                            )}
                        </div>

                        {/* Origin tag */}
                        <p className="font-sans text-[12px] text-[var(--mid)]">
                            Made in <span className="text-[var(--ink)]">{product.origin}</span>
                        </p>

                        <hr className="border-[var(--border)]" />

                        {/* Size selector */}
                        <div>
                            <p className="font-sans text-[11px] tracking-widest uppercase text-[var(--mid)] mb-3">
                                Size {selectedSize && <span className="text-[var(--ink)] normal-case">— {selectedSize}</span>}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {product.sizes.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`font-sans text-[12px] px-4 py-2 border transition-colors duration-150 ${
                                            selectedSize === size
                                                ? 'bg-[var(--ink)] text-[var(--cream)] border-[var(--ink)]'
                                                : 'bg-transparent text-[var(--ink)] border-[var(--border)] hover:border-[var(--ink)]'
                                        }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity stepper */}
                        <div>
                            <p className="font-sans text-[11px] tracking-widest uppercase text-[var(--mid)] mb-3">
                                Quantity
                            </p>
                            <div className="flex items-center border border-[var(--border)] w-fit">
                                <button
                                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                                    className="w-10 h-10 flex items-center justify-center text-[var(--ink)] hover:bg-[var(--tag)] transition-colors text-lg"
                                >
                                    −
                                </button>
                                <span className="w-12 text-center font-sans text-[14px] text-[var(--ink)]">
                                    {qty}
                                </span>
                                <button
                                    onClick={() => setQty((q) => q + 1)}
                                    className="w-10 h-10 flex items-center justify-center text-[var(--ink)] hover:bg-[var(--tag)] transition-colors text-lg"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-2">
                            <button
                                onClick={handleAddToCart}
                                className="flex-1 font-sans text-[12px] tracking-widest uppercase bg-[var(--ink)] text-[var(--cream)] py-4 px-6 hover:bg-[var(--accent)] transition-colors duration-200"
                            >
                                Add to Bag — ${totalPrice}
                            </button>
                            <button
                                onClick={() => toggleWishlist?.(product.id)}
                                className={`flex items-center justify-center gap-2 font-sans text-[12px] tracking-widest uppercase border py-4 px-5 transition-colors duration-150 ${
                                    wishlist?.includes(product.id)
                                        ? 'border-[var(--accent)] text-[var(--accent)]'
                                        : 'border-[var(--border)] text-[var(--ink)] hover:border-[var(--ink)]'
                                }`}
                            >
                                <HeartIcon filled={wishlist?.includes(product.id)} />
                                {wishlist?.includes(product.id) ? 'Saved' : 'Wishlist'}
                            </button>
                        </div>

                        {/* Accordion tabs */}
                        <div className="mt-2">
                            <AccordionItem title="Description">
                                <p>{product.desc}</p>
                            </AccordionItem>
                            <AccordionItem title="Details">
                                <ul className="flex flex-col gap-1.5">
                                    <li><span className="text-[var(--ink)]">Material:</span> {product.material}</li>
                                    <li><span className="text-[var(--ink)]">Origin:</span> {product.origin}</li>
                                    <li><span className="text-[var(--ink)]">Care:</span> {product.care}</li>
                                </ul>
                            </AccordionItem>
                            <AccordionItem title="Shipping & Returns">
                                <ul className="flex flex-col gap-1.5">
                                    <li>Free standard shipping on orders over $150.</li>
                                    <li>Estimated delivery: 3–7 business days.</li>
                                    <li>Free returns within 60 days, no questions asked.</li>
                                    <li>Items must be unused and in original packaging.</li>
                                </ul>
                            </AccordionItem>
                        </div>

                    </div>
                </div>

                {/* ── Related Products ─────────────────────── */}
                {related.length > 0 && (
                    <div className="mt-24">
                        <div className="flex items-end justify-between mb-10">
                            <div>
                                <p className="font-sans text-[11px] tracking-widest uppercase text-[var(--mid)] mb-2">
                                    More from {product.category}
                                </p>
                                <h2 className="font-serif text-3xl text-[var(--ink)]">You May Also Like</h2>
                            </div>
                            <button
                                onClick={() => setPage('shop')}
                                className="font-sans text-[11px] tracking-widest uppercase text-[var(--mid)] hover:text-[var(--ink)] transition-colors border-b border-[var(--mid)] hover:border-[var(--ink)] pb-0.5"
                            >
                                View All
                            </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                            {related.map((p, i) => (
                                <ProductCard
                                    key={p.id}
                                    product={p}
                                    index={i}
                                    onClick={() => goToProduct(p)}
                                    addToCart={addToCart}
                                    isWishlisted={wishlist?.includes(p.id)}
                                    onToggleWishlist={toggleWishlist}
                                />
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}

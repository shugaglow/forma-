import React, { useState } from 'react';

// ── Heart icon ────────────────────────────────────────────
const HeartIcon = ({ filled }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17"
        viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
        fill={filled ? 'currentColor' : 'none'}>
        <path strokeLinecap="round" strokeLinejoin="round"
            d="M12 21C12 21 3 14.5 3 8.5A4.5 4.5 0 0 1 12 6.257 4.5 4.5 0 0 1 21 8.5C21 14.5 12 21 12 21z" />
    </svg>
);

// ── Component ─────────────────────────────────────────────
export default function ProductCard({ product, index, onClick, addToCart, isWishlisted, onToggleWishlist }) {
    const handleAddToCart = (e) => {
        e.stopPropagation();
        addToCart(product);
    };

    const handleWishlist = (e) => {
        e.stopPropagation();
        onToggleWishlist(product.id);
    };

    // Staggered animation delay based on index
    const delay = `${(index % 6) * 80}ms`;

    return (
        <article
            onClick={onClick}
            className="group cursor-pointer"
            style={{
                animation: 'fadeUp 0.5s ease both',
                animationDelay: delay,
            }}
        >
            {/* ── Image Area ───────────────────────────── */}
            <div
                className="relative overflow-hidden"
                style={{ background: product.bg, aspectRatio: '4/5' }}
            >
                {/* Emoji centred */}
                <span className="absolute inset-0 flex items-center justify-center text-7xl select-none
                                 transition-transform duration-500 group-hover:scale-110">
                    {product.emoji}
                </span>

                {/* Badge */}
                {product.badge && (
                    <span className={`absolute top-3 left-3 font-sans text-[10px] tracking-widest uppercase px-2.5 py-1 ${
                        product.badge === 'Sale'
                            ? 'bg-[var(--accent)] text-white'
                            : 'bg-[var(--ink)] text-[var(--cream)]'
                    }`}>
                        {product.badge}
                    </span>
                )}

                {/* Hover: Add to Bag slides up */}
                <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0
                                transition-transform duration-300 ease-in-out">
                    <button
                        onClick={handleAddToCart}
                        className="w-full bg-[var(--ink)] text-[var(--cream)] font-sans text-[11px]
                                   tracking-widest uppercase py-3.5 hover:bg-[var(--accent)]
                                   transition-colors duration-200"
                    >
                        Add to Bag
                    </button>
                </div>
            </div>

            {/* ── Info Area ────────────────────────────── */}
            <div className="pt-3 pb-1 flex flex-col gap-1">
                {/* Category */}
                <span className="font-sans text-[10px] tracking-widest uppercase text-[var(--mid)]">
                    {product.category}
                </span>

                {/* Name + Wishlist row */}
                <div className="flex items-start justify-between gap-2">
                    <h3 className="font-serif text-[18px] leading-snug text-[var(--ink)] flex-1">
                        {product.name}
                    </h3>
                    <button
                        onClick={handleWishlist}
                        aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                        className={`mt-0.5 shrink-0 transition-colors duration-150 ${
                            isWishlisted ? 'text-[var(--accent)]' : 'text-[var(--mid)] hover:text-[var(--ink)]'
                        }`}
                    >
                        <HeartIcon filled={isWishlisted} />
                    </button>
                </div>

                {/* Price row */}
                <div className="flex items-baseline gap-2">
                    <span className="font-sans text-[14px] text-[var(--ink)]">
                        ${product.price}
                    </span>
                    {product.oldPrice && (
                        <span className="font-sans text-[12px] text-[var(--mid)] line-through">
                            ${product.oldPrice}
                        </span>
                    )}
                </div>
            </div>
        </article>
    );
}
import React, { useState } from 'react';

const FREE_SHIPPING_THRESHOLD = 250;
const SHIPPING_COST = 18;

export default function CartPage({ cart, setCart, setPage }) {
    const [promoCode, setPromoCode] = useState('');
    const [promoApplied, setPromoApplied] = useState(false);

    // ── Helpers ───────────────────────────────────────────
    const updateQty = (id, size, delta) => {
        setCart((prev) =>
            prev
                .map((item) =>
                    item.product.id === id && item.size === size
                        ? { ...item, qty: item.qty + delta }
                        : item
                )
                .filter((item) => item.qty > 0)
        );
    };

    const removeItem = (id, size) => {
        setCart((prev) => prev.filter((item) => !(item.product.id === id && item.size === size)));
    };

    const handleApplyPromo = () => {
        if (promoCode.trim().toLowerCase() === 'forma10') setPromoApplied(true);
    };

    // ── Totals ────────────────────────────────────────────
    const subtotal = cart.reduce((sum, { product, qty }) => sum + product.price * qty, 0);
    const discount = promoApplied ? Math.round(subtotal * 0.1) : 0;
    const shipping = subtotal - discount >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
    const total = subtotal - discount + shipping;
    const toFreeShipping = FREE_SHIPPING_THRESHOLD - (subtotal - discount);

    // ── Empty state ───────────────────────────────────────
    if (cart.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 font-sans px-6">
                <span className="text-6xl">🛍️</span>
                <div className="text-center">
                    <h2 className="font-serif text-3xl text-[var(--ink)] mb-2">Your bag is empty</h2>
                    <p className="font-sans text-[13px] text-[var(--mid)]">
                        Looks like you haven't added anything yet.
                    </p>
                </div>
                <button
                    onClick={() => setPage('shop')}
                    className="font-sans text-[11px] tracking-widest uppercase bg-[var(--ink)] text-[var(--cream)] px-8 py-3.5 hover:bg-[var(--accent)] transition-colors duration-200"
                >
                    Browse Products
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-7xl w-full mx-auto px-6 py-12 font-sans">

            {/* ── Heading ──────────────────────────────────── */}
            <div className="mb-10">
                <h1 className="font-serif text-4xl text-[var(--ink)]">Your Bag</h1>
                <p className="font-sans text-[13px] text-[var(--mid)] mt-1">
                    {cart.reduce((n, i) => n + i.qty, 0)} {cart.reduce((n, i) => n + i.qty, 0) === 1 ? 'item' : 'items'}
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 items-start">

                {/* ── LEFT: Item List ──────────────────────── */}
                <div>
                    {/* Header row */}
                    <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 pb-3 border-b border-[var(--border)] font-sans text-[10px] tracking-widest uppercase text-[var(--mid)]">
                        <span>Product</span>
                        <span>Size</span>
                        <span>Qty</span>
                        <span className="text-right">Total</span>
                    </div>

                    {/* Item rows */}
                    <div className="divide-y divide-[var(--border)]">
                        {cart.map(({ product, qty, size }) => (
                            <div
                                key={product.id}
                                className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-4 items-center py-6"
                            >
                                {/* Thumbnail + name */}
                                <div className="flex items-center gap-4">
                                    <div
                                        className="relative overflow-hidden w-20 h-24 flex-shrink-0 flex items-center justify-center text-3xl select-none"
                                        style={{ background: product.bg }}
                                    >
                                        {product.image ? (
                                            <img src={product.image} alt={product.name} className="absolute inset-0 w-full h-full object-cover" />
                                        ) : (
                                            product.emoji
                                        )}
                                    </div>
                                    <div>
                                        <p className="font-sans text-[10px] tracking-widest uppercase text-[var(--mid)] mb-0.5">
                                            {product.category}
                                        </p>
                                        <p className="font-serif text-[18px] text-[var(--ink)] leading-snug">
                                            {product.name}
                                        </p>
                                        <button
                                            onClick={() => removeItem(product.id, size)}
                                            className="font-sans text-[11px] text-[var(--mid)] hover:text-[var(--accent)] transition-colors mt-1 underline underline-offset-2"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>

                                {/* Size */}
                                <span className="font-sans text-[13px] text-[var(--mid)]">
                                    {size || product.sizes?.[0] || '—'}
                                </span>

                                {/* Qty stepper */}
                                <div className="flex items-center border border-[var(--border)] w-fit">
                                    <button
                                        onClick={() => updateQty(product.id, size, -1)}
                                        className="w-8 h-8 flex items-center justify-center text-[var(--ink)] hover:bg-[var(--tag)] transition-colors"
                                    >
                                        −
                                    </button>
                                    <span className="w-9 text-center font-sans text-[13px] text-[var(--ink)]">
                                        {qty}
                                    </span>
                                    <button
                                        onClick={() => updateQty(product.id, size, 1)}
                                        className="w-8 h-8 flex items-center justify-center text-[var(--ink)] hover:bg-[var(--tag)] transition-colors"
                                    >
                                        +
                                    </button>
                                </div>

                                {/* Line total */}
                                <span className="font-sans text-[14px] text-[var(--ink)] md:text-right">
                                    ${product.price * qty}
                                </span>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={() => setPage('shop')}
                        className="mt-6 font-sans text-[11px] tracking-widest uppercase text-[var(--mid)] hover:text-[var(--ink)] transition-colors flex items-center gap-2"
                    >
                        ← Continue Shopping
                    </button>
                </div>

                {/* ── RIGHT: Order Summary ─────────────────── */}
                <div className="lg:sticky lg:top-28 bg-[var(--card)] border border-[var(--border)] p-6 flex flex-col gap-5">
                    <h2 className="font-serif text-2xl text-[var(--ink)]">Order Summary</h2>

                    {/* Free shipping progress */}
                    {toFreeShipping > 0 && (
                        <div className="bg-[var(--tag)] px-4 py-3">
                            <p className="font-sans text-[12px] text-[var(--mid)]">
                                Add <span className="text-[var(--ink)] font-semibold">${toFreeShipping}</span> more for free shipping
                            </p>
                            <div className="mt-2 h-1 bg-[var(--border)] rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-[var(--ink)] rounded-full transition-all duration-500"
                                    style={{ width: `${Math.min(100, ((subtotal - discount) / FREE_SHIPPING_THRESHOLD) * 100)}%` }}
                                />
                            </div>
                        </div>
                    )}

                    {/* Promo code */}
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder='Try "FORMA10"'
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            disabled={promoApplied}
                            className="flex-1 font-sans text-[12px] bg-transparent border border-[var(--border)] text-[var(--ink)] placeholder:text-[var(--mid)] px-3 py-2 focus:outline-none focus:border-[var(--ink)] transition-colors disabled:opacity-50"
                        />
                        <button
                            onClick={handleApplyPromo}
                            disabled={promoApplied}
                            className="font-sans text-[11px] tracking-widest uppercase px-4 py-2 border border-[var(--ink)] text-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--cream)] transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
                        >
                            {promoApplied ? 'Applied ✓' : 'Apply'}
                        </button>
                    </div>

                    {/* Line items */}
                    <div className="flex flex-col gap-3 pt-2 border-t border-[var(--border)]">
                        <div className="flex justify-between font-sans text-[13px] text-[var(--mid)]">
                            <span>Subtotal</span>
                            <span>${subtotal}</span>
                        </div>
                        {promoApplied && (
                            <div className="flex justify-between font-sans text-[13px] text-[var(--accent)]">
                                <span>Discount (10%)</span>
                                <span>−${discount}</span>
                            </div>
                        )}
                        <div className="flex justify-between font-sans text-[13px] text-[var(--mid)]">
                            <span>Shipping</span>
                            <span>{shipping === 0 ? <span className="text-[var(--ink)]">Free</span> : `$${shipping}`}</span>
                        </div>
                    </div>

                    {/* Total */}
                    <div className="flex justify-between border-t border-[var(--border)] pt-4">
                        <span className="font-sans text-[13px] uppercase tracking-widest text-[var(--ink)]">Total</span>
                        <span className="font-serif text-2xl text-[var(--ink)]">${total}</span>
                    </div>

                    {/* Checkout button */}
                    <button onClick={() => setPage('checkout')} className="w-full font-sans text-[12px] tracking-widest uppercase bg-[var(--ink)] text-[var(--cream)] py-4 hover:bg-[var(--accent)] transition-colors duration-200">
                        Proceed to Checkout
                    </button>

                    {/* Trust badges */}
                    <div className="flex flex-col gap-2 pt-2 border-t border-[var(--border)]">
                        {[
                            { icon: '🔒', text: 'Secure checkout' },
                            { icon: '↩️', text: '60-day returns' },
                            { icon: '🚚', text: 'Free shipping over $250' },
                        ].map(({ icon, text }) => (
                            <div key={text} className="flex items-center gap-2 font-sans text-[11px] text-[var(--mid)]">
                                <span>{icon}</span>
                                <span>{text}</span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}

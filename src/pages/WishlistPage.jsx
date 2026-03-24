import React, { useEffect } from 'react';
import { PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function WishlistPage({ wishlist, toggleWishlist, setPage, setSelectedProduct, addToCart }) {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const wishlistedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

    // ── Empty State ───────────────────────────────────────
    if (wishlistedProducts.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 font-sans px-6">
                <span className="text-6xl text-[var(--mid)]">♡</span>
                <div className="text-center">
                    <h2 className="font-serif text-3xl text-[var(--ink)] mb-2">Your wishlist is empty</h2>
                    <p className="font-sans text-[13px] text-[var(--mid)]">
                        Save pieces you love and find them here.
                    </p>
                </div>
                <button
                    onClick={() => setPage('shop')}
                    className="font-sans text-[11px] tracking-widest uppercase bg-[var(--ink)] text-[var(--cream)] px-8 py-3.5 hover:bg-[var(--accent)] transition-colors duration-200 mt-2"
                >
                    Explore Collection
                </button>
            </div>
        );
    }

    // ── Filled State ──────────────────────────────────────
    return (
        <div className="max-w-7xl w-full mx-auto px-6 py-12 font-sans">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-[11px] tracking-widest uppercase text-[var(--mid)] mb-8">
                <button onClick={() => setPage('home')} className="hover:text-[var(--ink)] transition-colors">
                    Home
                </button>
                <span>/</span>
                <span className="text-[var(--ink)]">Wishlist</span>
            </nav>

            {/* Heading */}
            <div className="mb-10">
                <h1 className="font-serif text-4xl text-[var(--ink)]">Your Wishlist</h1>
                <p className="font-sans text-[13px] text-[var(--mid)] mt-1">
                    {wishlistedProducts.length} {wishlistedProducts.length === 1 ? 'piece' : 'pieces'} saved
                </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {wishlistedProducts.map((product, i) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        index={i}
                        onClick={() => {
                            setSelectedProduct(product);
                            setPage('product');
                        }}
                        addToCart={addToCart}
                        isWishlisted={true}
                        onToggleWishlist={() => toggleWishlist(product.id)}
                    />
                ))}
            </div>

            {/* Footer action */}
            <div className="mt-16 border-t border-[var(--border)] pt-8 flex justify-center">
                <button
                    onClick={() => setPage('shop')}
                    className="font-sans text-[11px] tracking-widest uppercase text-[var(--mid)] hover:text-[var(--ink)] transition-colors flex items-center gap-2"
                >
                    ← Continue Shopping
                </button>
            </div>
        </div>
    );
}

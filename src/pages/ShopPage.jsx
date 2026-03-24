import React, { useState, useMemo, useEffect } from 'react';
import { PRODUCTS, CATEGORIES } from '../data/products';
import ProductCard from '../components/ProductCard';

const SORT_OPTIONS = [
    { label: 'Featured',          value: 'featured' },
    { label: 'Price: Low → High', value: 'price_asc' },
    { label: 'Price: High → Low', value: 'price_desc' },
];

export default function ShopPage({ setPage, setSelectedProduct, addToCart, searchQuery = '', setSearchQuery, wishlist, toggleWishlist, defaultCategory, defaultFilter }) {
    const [activeCategory, setActiveCategory] = useState(defaultCategory || 'All');
    const [saleOnly, setSaleOnly] = useState(defaultFilter === 'sale' || false);
    const [newOnly, setNewOnly] = useState(defaultFilter === 'new' || false);
    const [sortBy, setSortBy] = useState('featured');

    useEffect(() => {
        setActiveCategory(defaultCategory || 'All');
        setSaleOnly(defaultFilter === 'sale');
        setNewOnly(defaultFilter === 'new');
    }, [defaultCategory, defaultFilter]);

    const filtered = useMemo(() => {
        let list = activeCategory === 'All'
            ? [...PRODUCTS]
            : PRODUCTS.filter((p) => p.category === activeCategory);

        if (saleOnly) {
            list = list.filter((p) => p.badge === 'Sale');
        }

        if (newOnly) {
            list = list.filter((p) => p.badge === 'New');
        }

        if (searchQuery && searchQuery.trim() !== '') {
            const lowerQuery = searchQuery.toLowerCase();
            list = list.filter(
                (p) => p.name.toLowerCase().includes(lowerQuery) || p.category.toLowerCase().includes(lowerQuery)
            );
        }

        if (sortBy === 'price_asc')  list.sort((a, b) => a.price - b.price);
        if (sortBy === 'price_desc') list.sort((a, b) => b.price - a.price);

        return list;
    }, [activeCategory, saleOnly, newOnly, sortBy, searchQuery]);

    const goToProduct = (product) => {
        setSelectedProduct(product);
        setPage('product');
    };

    const getHeading = () => {
        if (newOnly) return "New Arrivals";
        if (saleOnly) return "Sale Items";
        if (activeCategory !== "All") return activeCategory;
        if (searchQuery && searchQuery.trim() !== "") return `Results for "${searchQuery}"`;
        return "All Products";
    };

    return (
        <div className="max-w-7xl mx-auto px-6 py-12 font-sans">

            {/* ── Breadcrumb ───────────────────────────────── */}
            <nav className="flex items-center gap-2 text-[11px] tracking-widest uppercase text-[var(--mid)] mb-8">
                <button onClick={() => setPage('home')} className="hover:text-[var(--ink)] transition-colors">
                    Home
                </button>
                <span>/</span>
                <span className="text-[var(--ink)]">Shop</span>
            </nav>

            {/* ── Heading + Sort row ───────────────────────── */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                <div>
                    <h1 className="font-serif text-4xl text-[var(--ink)]">
                        {getHeading()}
                    </h1>
                    <p className="font-sans text-[13px] text-[var(--mid)] mt-1">
                        {filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'}
                    </p>
                </div>

                {/* Sort dropdown */}
                <div className="flex items-center gap-3">
                    <label
                        htmlFor="sort"
                        className="font-sans text-[11px] tracking-widest uppercase text-[var(--mid)] whitespace-nowrap"
                    >
                        Sort by
                    </label>
                    <select
                        id="sort"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="font-sans text-[12px] bg-transparent border border-[var(--border)] text-[var(--ink)]
                                   px-3 py-2 focus:outline-none focus:border-[var(--ink)] transition-colors cursor-pointer"
                    >
                        {SORT_OPTIONS.map(({ label, value }) => (
                            <option key={value} value={value}>{label}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* ── Category Filter Buttons ───────────────────── */}
            {/* ── Category Filter Buttons ───────────────────── */}
            <div className="flex flex-wrap gap-2 mb-10">
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => {
                            setActiveCategory(cat);
                            setSaleOnly(false);
                            setNewOnly(false);
                        }}
                        className={`font-sans text-[11px] tracking-widest uppercase px-4 py-2 border transition-colors duration-150 ${
                            activeCategory === cat && !saleOnly && !newOnly
                                ? 'bg-[var(--ink)] text-[var(--cream)] border-[var(--ink)]'
                                : 'bg-transparent text-[var(--mid)] border-[var(--border)] hover:border-[var(--ink)] hover:text-[var(--ink)]'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
                
                <button
                    onClick={() => {
                        setNewOnly(!newOnly);
                        setActiveCategory('All');
                        setSaleOnly(false);
                    }}
                    className={`font-sans text-[11px] tracking-widest uppercase px-4 py-2 border transition-colors duration-150 ${
                        newOnly
                            ? 'bg-[var(--ink)] text-[var(--cream)] border-[var(--ink)]'
                            : 'bg-transparent text-[var(--mid)] border-[var(--border)] hover:border-[var(--ink)] hover:text-[var(--ink)]'
                    }`}
                >
                    New Arrivals
                </button>

                <button
                    onClick={() => {
                        setSaleOnly(!saleOnly);
                        setActiveCategory('All');
                        setNewOnly(false);
                    }}
                    className={`font-sans text-[11px] tracking-widest uppercase px-4 py-2 border transition-colors duration-150 ${
                        saleOnly
                            ? 'bg-[var(--accent)] text-white border-[var(--accent)]'
                            : 'bg-transparent text-[var(--mid)] border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)]'
                    }`}
                >
                    Sale
                </button>
            </div>

            {/* ── Product Grid ─────────────────────────────── */}
            {filtered.length === 0 ? (
                <div className="text-center py-24 flex flex-col items-center gap-4">
                    <p className="text-[var(--mid)] font-sans text-[14px]">
                        {searchQuery
                            ? `No products found for "${searchQuery}".`
                            : "No products found in this category."}
                    </p>
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery('')}
                            className="font-sans text-[11px] tracking-widest uppercase border border-[var(--border)] text-[var(--ink)] px-6 py-3 hover:border-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--cream)] transition-colors duration-200"
                        >
                            Clear search
                        </button>
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filtered.map((product, i) => (
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
            )}

        </div>
    );
}

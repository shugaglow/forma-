import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Toast from './components/Toast';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import LookbookPage from './pages/LookbookPage';
import AboutPage from './pages/AboutPage';
import WishlistPage from './pages/WishlistPage';
import { PRODUCTS } from './data/products';

export default function App() {
    const [page, setPage] = useState('home');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [cart, setCart] = useState([]);
    const [toast, setToast] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [wishlist, setWishlist] = useState([]);

    const toggleWishlist = (id) => {
        setWishlist((prev) => 
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    // Scroll to top on page change
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [page]);

    // Go to shop when search is typed
    useEffect(() => {
        if (searchQuery.trim() !== '') {
            setPage('shop');
        }
    }, [searchQuery]);

    // Derived cart count
    const cartCount = cart.reduce((total, item) => total + item.qty, 0);

    // Derived search results count
    const resultCount = searchQuery.trim() === '' ? 0 : PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
    ).length;

    const addToCart = (product, selectedQty = 1, selectedSize = null) => {
        setCart((prev) => {
            // Find existing item by ID (and size if applicable)
            const existing = prev.find(
                (item) => item.product.id === product.id && item.size === selectedSize
            );
            if (existing) {
                return prev.map((item) =>
                    item.product.id === product.id && item.size === selectedSize
                        ? { ...item, qty: item.qty + selectedQty }
                        : item
                );
            }
            return [...prev, { product, qty: selectedQty, size: selectedSize }];
        });

        setToast(`${product.name} added to bag`);
        setTimeout(() => setToast(null), 2500);
    };

    const renderPage = () => {
        const props = {
            setPage,
            setSelectedProduct,
            addToCart,
            wishlist,
            toggleWishlist,
        };

        switch (page) {
            case 'home':
                return <HomePage {...props} />;
            case 'shop':
                return <ShopPage searchQuery={searchQuery} setSearchQuery={setSearchQuery} {...props} />;
            case 'product':
                return <ProductPage product={selectedProduct} {...props} />;
            case 'lookbook':
                return <LookbookPage setPage={setPage} setSelectedProduct={setSelectedProduct} />;
            case 'about':
                return <AboutPage setPage={setPage} />;
            case 'wishlist':
                return <WishlistPage wishlist={wishlist} toggleWishlist={toggleWishlist} setPage={setPage} setSelectedProduct={setSelectedProduct} addToCart={addToCart} />;
            case 'cart':
                return <CartPage cart={cart} setCart={setCart} setPage={setPage} setSelectedProduct={setSelectedProduct} />;
            default:
                return <HomePage {...props} />;
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-[var(--cream)]">
            <Header 
                page={page} 
                setPage={setPage} 
                cartCount={cartCount} 
                searchQuery={searchQuery}
                onSearch={setSearchQuery} 
                resultCount={resultCount}
            />
            <main className="flex-1">
                {renderPage()}
            </main>
            <Footer setPage={setPage} />
            <Toast message={toast} />
        </div>
    );
}
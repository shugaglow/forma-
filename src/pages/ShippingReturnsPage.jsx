import React, { useState, useEffect } from 'react';

// Accordion Item Helper
function FAQItem({ question, answer }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="border-t border-[var(--border)]">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between py-5 font-serif text-[18px] text-[var(--ink)] text-left"
            >
                <span>{question}</span>
                <span className="text-xl leading-none">{open ? '−' : '+'}</span>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-48 pb-5' : 'max-h-0'}`}>
                <p className="font-sans text-[14px] text-[var(--mid)] leading-relaxed">
                    {answer}
                </p>
            </div>
        </div>
    );
}

export default function ShippingReturnsPage({ setPage }) {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const faqs = [
        { q: "When will my order ship?", a: "All orders are typically dispatched within 24 hours of placement on business days. You will receive a tracking link via email once your order ships." },
        { q: "Can I change my delivery address after ordering?", a: "If you need to change your address, please contact us immediately. Once an order has been dispatched, we are unable to redirect it." },
        { q: "What if my item arrives damaged?", a: "We take great care in packaging our items. However, if something arrives broken, please email us within 48 hours with photos, and we will arrange a replacement." },
        { q: "Do you offer exchanges?", a: "We do not offer direct exchanges. If you want a different item, we recommend returning your original order for a refund and placing a new order." }
    ];

    return (
        <div className="max-w-4xl mx-auto px-6 py-12 font-sans">
            {/* Header */}
            <nav className="flex items-center gap-2 text-[11px] tracking-widest uppercase text-[var(--mid)] mb-8">
                <button onClick={() => setPage('home')} className="hover:text-[var(--ink)] transition-colors">Home</button>
                <span>/</span>
                <button onClick={() => setPage('contact')} className="hover:text-[var(--ink)] transition-colors">Help</button>
                <span>/</span>
                <span className="text-[var(--ink)]">Shipping & Returns</span>
            </nav>
            <h1 className="font-serif text-4xl text-[var(--ink)] mb-4">Shipping & Returns</h1>
            <p className="font-sans text-[15px] text-[var(--mid)] leading-relaxed mb-16">
                Everything you need to know about our delivery times, global shipping routes, and our hassle-free return policy.
            </p>

            {/* Shipping */}
            <section className="mb-20">
                <h2 className="font-serif text-2xl text-[var(--ink)] mb-6">Shipping Information</h2>
                <div className="border border-[var(--border)] rounded overflow-hidden mb-4">
                    <table className="w-full text-left font-sans text-[13px] text-[var(--ink)]">
                        <tbody className="divide-y divide-[var(--border)]">
                            <tr>
                                <td className="py-4 px-6 font-medium">Standard Delivery</td>
                                <td className="py-4 px-6 text-[var(--mid)]">3–5 business days</td>
                                <td className="py-4 px-6 text-[var(--accent)] font-medium">Free over $250, else $18</td>
                            </tr>
                            <tr className="bg-[var(--card)]">
                                <td className="py-4 px-6 font-medium">Express Delivery</td>
                                <td className="py-4 px-6 text-[var(--mid)]">1–2 business days</td>
                                <td className="py-4 px-6 font-medium">$35</td>
                            </tr>
                            <tr>
                                <td className="py-4 px-6 font-medium">International</td>
                                <td className="py-4 px-6 text-[var(--mid)]">7–14 business days</td>
                                <td className="py-4 px-6 font-medium">$25</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p className="font-sans text-[12px] text-[var(--mid)]">
                    All orders are dispatched within 24 hours of placement, Monday–Friday.
                </p>
            </section>

            {/* Returns */}
            <section className="mb-20">
                <h2 className="font-serif text-2xl text-[var(--ink)] mb-6">Returns & Exchanges</h2>
                <p className="font-sans text-[14px] text-[var(--mid)] leading-relaxed mb-6">
                    If an item isn't quite right for your space, we offer a 60-day return policy from the date of delivery. Items must be returned in their original packaging and condition.
                </p>
                <ol className="list-decimal list-outside ml-4 flex flex-col gap-3 font-sans text-[14px] text-[var(--ink)] mb-6">
                    <li><span className="text-[var(--mid)]">Email us at</span> returns@forma.com <span className="text-[var(--mid)]">with your order number</span></li>
                    <li><span className="text-[var(--mid)]">We'll send a prepaid return label within 24 hours</span></li>
                    <li><span className="text-[var(--mid)]">Drop off the package at any courier location</span></li>
                    <li><span className="text-[var(--mid)]">Refund processed within 5–7 business days</span></li>
                </ol>
                <p className="font-sans text-[13px] text-[var(--accent)]">
                    Please note: Custom orders and final sale items cannot be returned or exchanged.
                </p>
            </section>

            {/* FAQ */}
            <section className="mb-20">
                <h2 className="font-serif text-2xl text-[var(--ink)] mb-6">Frequently Asked Questions</h2>
                <div className="border-b border-[var(--border)]">
                    {faqs.map((faq, index) => (
                        <FAQItem key={index} question={faq.q} answer={faq.a} />
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="text-center py-12 border-t border-[var(--border)]">
                <h3 className="font-serif text-3xl text-[var(--ink)] mb-6">Still have questions?</h3>
                <button
                    onClick={() => setPage('contact')}
                    className="font-sans text-[12px] tracking-widest uppercase bg-[var(--ink)] text-[var(--cream)] px-8 py-4 hover:bg-[var(--accent)] transition-colors duration-200"
                >
                    Contact Information
                </button>
            </section>
        </div>
    );
}

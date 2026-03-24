import React, { useState, useEffect } from 'react';

export default function SizeGuidePage({ setPage }) {
    const [activeTab, setActiveTab] = useState('Ceramics');

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const tabs = ['Ceramics', 'Textiles', 'Furniture'];

    return (
        <div className="max-w-4xl mx-auto px-6 py-12 font-sans">
            {/* Header */}
            <nav className="flex items-center gap-2 text-[11px] tracking-widest uppercase text-[var(--mid)] mb-8">
                <button onClick={() => setPage('home')} className="hover:text-[var(--ink)] transition-colors">Home</button>
                <span>/</span>
                <button onClick={() => setPage('contact')} className="hover:text-[var(--ink)] transition-colors">Help</button>
                <span>/</span>
                <span className="text-[var(--ink)]">Size Guide</span>
            </nav>
            <h1 className="font-serif text-4xl text-[var(--ink)] mb-6">Size Guide</h1>
            <p className="font-sans text-[15px] text-[var(--mid)] leading-relaxed mb-12 max-w-2xl">
                At Forma, we believe that proportion and scale are critical to a harmonious home. We design our objects in purposeful sizing tiers to ensure they fit correctly within your space, whether on a dominant dining table or a subtle console.
            </p>

            {/* Tabs */}
            <div className="flex flex-wrap gap-4 mb-8">
                {tabs.map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`font-sans text-[11px] tracking-widest uppercase px-6 py-3 transition-colors ${
                            activeTab === tab 
                                ? 'bg-[var(--ink)] text-[var(--cream)] border border-[var(--ink)]' 
                                : 'bg-transparent text-[var(--ink)] border border-[var(--border)] hover:border-[var(--ink)]'
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Tables */}
            <div className="border border-[var(--border)] rounded overflow-hidden mb-16">
                <table className="w-full text-left font-sans text-[13px] text-[var(--ink)]">
                    {/* Ceramics */}
                    {activeTab === 'Ceramics' && (
                        <>
                            <thead className="bg-[var(--card)] border-b border-[var(--border)] font-serif text-[16px] text-[var(--ink)]">
                                <tr>
                                    <th className="py-4 px-6 font-normal">Size</th>
                                    <th className="py-4 px-6 font-normal">Height</th>
                                    <th className="py-4 px-6 font-normal">Width</th>
                                    <th className="py-4 px-6 font-normal">Best for</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[var(--border)]">
                                <tr>
                                    <td className="py-4 px-6 font-medium">S</td>
                                    <td className="py-4 px-6 text-[var(--mid)]">15cm</td>
                                    <td className="py-4 px-6 text-[var(--mid)]">10cm</td>
                                    <td className="py-4 px-6 text-[var(--mid)]">Side tables, shelves</td>
                                </tr>
                                <tr className="bg-[var(--card)]">
                                    <td className="py-4 px-6 font-medium">M</td>
                                    <td className="py-4 px-6 text-[var(--mid)]">25cm</td>
                                    <td className="py-4 px-6 text-[var(--mid)]">16cm</td>
                                    <td className="py-4 px-6 text-[var(--mid)]">Dining tables, mantels</td>
                                </tr>
                                <tr>
                                    <td className="py-4 px-6 font-medium">L</td>
                                    <td className="py-4 px-6 text-[var(--mid)]">38cm</td>
                                    <td className="py-4 px-6 text-[var(--mid)]">22cm</td>
                                    <td className="py-4 px-6 text-[var(--mid)]">Floor placement, large surfaces</td>
                                </tr>
                            </tbody>
                        </>
                    )}
                    {/* Textiles */}
                    {activeTab === 'Textiles' && (
                        <>
                            <thead className="bg-[var(--card)] border-b border-[var(--border)] font-serif text-[16px] text-[var(--ink)]">
                                <tr>
                                    <th className="py-4 px-6 font-normal">Size</th>
                                    <th className="py-4 px-6 font-normal">Dimensions</th>
                                    <th className="py-4 px-6 font-normal">Best for</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[var(--border)]">
                                <tr>
                                    <td className="py-4 px-6 font-medium">One Size</td>
                                    <td className="py-4 px-6 text-[var(--mid)]">130 x 170cm</td>
                                    <td className="py-4 px-6 text-[var(--mid)]">Sofa, armchair</td>
                                </tr>
                                <tr className="bg-[var(--card)]">
                                    <td className="py-4 px-6 font-medium">40cm</td>
                                    <td className="py-4 px-6 text-[var(--mid)]">40 x 40cm</td>
                                    <td className="py-4 px-6 text-[var(--mid)]">Accent cushion</td>
                                </tr>
                                <tr>
                                    <td className="py-4 px-6 font-medium">50cm</td>
                                    <td className="py-4 px-6 text-[var(--mid)]">50 x 50cm</td>
                                    <td className="py-4 px-6 text-[var(--mid)]">Standard cushion</td>
                                </tr>
                                <tr className="bg-[var(--card)]">
                                    <td className="py-4 px-6 font-medium">60cm</td>
                                    <td className="py-4 px-6 text-[var(--mid)]">60 x 60cm</td>
                                    <td className="py-4 px-6 text-[var(--mid)]">Large floor cushion</td>
                                </tr>
                            </tbody>
                        </>
                    )}
                    {/* Furniture */}
                    {activeTab === 'Furniture' && (
                        <>
                            <thead className="bg-[var(--card)] border-b border-[var(--border)] font-serif text-[16px] text-[var(--ink)]">
                                <tr>
                                    <th className="py-4 px-6 font-normal">Size</th>
                                    <th className="py-4 px-6 font-normal">Dimensions</th>
                                    <th className="py-4 px-6 font-normal">Notes</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[var(--border)]">
                                <tr>
                                    <td className="py-4 px-6 font-medium">60cm</td>
                                    <td className="py-4 px-6 text-[var(--mid)]">60 x 25 x 20cm</td>
                                    <td className="py-4 px-6 text-[var(--mid)]">Small spaces</td>
                                </tr>
                                <tr className="bg-[var(--card)]">
                                    <td className="py-4 px-6 font-medium">90cm</td>
                                    <td className="py-4 px-6 text-[var(--mid)]">90 x 25 x 20cm</td>
                                    <td className="py-4 px-6 text-[var(--mid)]">Standard rooms</td>
                                </tr>
                                <tr>
                                    <td className="py-4 px-6 font-medium">One Size</td>
                                    <td className="py-4 px-6 text-[var(--mid)]">Varies by piece</td>
                                    <td className="py-4 px-6 text-[var(--mid)]">See product page</td>
                                </tr>
                            </tbody>
                        </>
                    )}
                </table>
            </div>

            <p className="font-sans text-[13px] text-[var(--mid)] text-center py-8 border-t border-[var(--border)]">
                Not sure? Email us and we'll help you choose — <a href="mailto:sizeguide@forma.com" className="text-[var(--ink)] underline underline-offset-4 hover:text-[var(--accent)] transition-colors">sizeguide@forma.com</a>
            </p>
        </div>
    );
}

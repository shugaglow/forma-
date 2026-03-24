import React, { useEffect } from 'react';
import { Droplets, Wind, Zap, Armchair } from 'lucide-react';

export default function CareInstructionsPage({ setPage }) {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-6 py-12 font-sans">
            {/* Header */}
            <nav className="flex items-center gap-2 text-[11px] tracking-widest uppercase text-[var(--mid)] mb-8">
                <button onClick={() => setPage('home')} className="hover:text-[var(--ink)] transition-colors">Home</button>
                <span>/</span>
                <button onClick={() => setPage('contact')} className="hover:text-[var(--ink)] transition-colors">Help</button>
                <span>/</span>
                <span className="text-[var(--ink)]">Care Instructions</span>
            </nav>
            <h1 className="font-serif text-4xl text-[var(--ink)] mb-6">Care Instructions</h1>
            <p className="font-sans text-[15px] text-[var(--mid)] leading-relaxed mb-16 max-w-2xl">
                Forma objects are built to last lifetimes. But natural materials demand proper maintenance to age gracefully. Follow these rigorous care protocols to maintain the material integrity and finish of your pieces.
            </p>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                {/* Ceramics */}
                <div className="bg-[var(--card)] border border-[var(--border)] p-10 flex flex-col gap-6">
                    <Droplets size={32} strokeWidth={1.5} className="text-[#BF4E1E]" />
                    <h3 className="font-serif text-[24px] text-[var(--ink)]">Ceramics</h3>
                    <ul className="list-disc list-inside flex flex-col gap-3 font-sans text-[14px] text-[var(--mid)]">
                        <li>Hand wash with mild soap and warm water</li>
                        <li>Do not place in dishwasher unless stated</li>
                        <li>Avoid sudden temperature changes</li>
                        <li>Store carefully to prevent chipping</li>
                    </ul>
                </div>

                {/* Textiles */}
                <div className="bg-[var(--card)] border border-[var(--border)] p-10 flex flex-col gap-6">
                    <Wind size={32} strokeWidth={1.5} className="text-[#BF4E1E]" />
                    <h3 className="font-serif text-[24px] text-[var(--ink)]">Textiles</h3>
                    <ul className="list-disc list-inside flex flex-col gap-3 font-sans text-[14px] text-[var(--mid)]">
                        <li>Machine wash cold on gentle cycle</li>
                        <li>Lay flat to dry, avoid tumble drying</li>
                        <li>Iron on low heat if needed</li>
                        <li>Store folded, not hung, to preserve shape</li>
                    </ul>
                </div>

                {/* Lighting */}
                <div className="bg-[var(--card)] border border-[var(--border)] p-10 flex flex-col gap-6">
                    <Zap size={32} strokeWidth={1.5} className="text-[#BF4E1E]" />
                    <h3 className="font-serif text-[24px] text-[var(--ink)]">Lighting</h3>
                    <ul className="list-disc list-inside flex flex-col gap-3 font-sans text-[14px] text-[var(--mid)]">
                        <li>Wipe with a dry or slightly damp cloth</li>
                        <li>Never use chemical cleaners on brass</li>
                        <li>Replace bulbs with same wattage only</li>
                        <li>Turn off and cool before cleaning</li>
                    </ul>
                </div>

                {/* Furniture */}
                <div className="bg-[var(--card)] border border-[var(--border)] p-10 flex flex-col gap-6">
                    <Armchair size={32} strokeWidth={1.5} className="text-[#BF4E1E]" />
                    <h3 className="font-serif text-[24px] text-[var(--ink)]">Furniture</h3>
                    <ul className="list-disc list-inside flex flex-col gap-3 font-sans text-[14px] text-[var(--mid)]">
                        <li>Dust regularly with a soft dry cloth</li>
                        <li>Oil wood surfaces once or twice a year</li>
                        <li>Spot clean upholstery immediately</li>
                        <li>Keep out of direct sunlight to prevent fading</li>
                    </ul>
                </div>
            </div>

            {/* General Tips */}
            <div className="border-t border-[var(--border)] pt-16">
                <h3 className="font-serif text-2xl text-[var(--ink)] mb-6">Universal Care Tips</h3>
                <ol className="list-decimal list-inside flex flex-col gap-4 font-sans text-[14px] text-[var(--mid)]">
                    <li><span className="text-[var(--ink)] font-medium">Embrace the patina:</span> Natural materials like raw brass and untreated oak will change color. This is not a defect.</li>
                    <li><span className="text-[var(--ink)] font-medium">Avoid harsh chemicals:</span> Always opt for natural, soft soap solutions over abrasive industrial cleaners.</li>
                    <li><span className="text-[var(--ink)] font-medium">Listen to the makers:</span> If a specific object includes a printed care card in the box, prioritize those instructions over these general guidelines.</li>
                </ol>
            </div>
        </div>
    );
}

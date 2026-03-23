import React from 'react';

export default function Toast({ message }) {
    return (
        <div
            className={`fixed bottom-6 right-6 z-50 flex items-center gap-2
                        bg-[var(--ink)] text-[var(--cream)] font-sans text-[13px]
                        px-5 py-3 rounded-full shadow-lg
                        transition-all duration-300 ease-in-out
                        ${message
                            ? 'opacity-100 translate-y-0 pointer-events-auto'
                            : 'opacity-0 translate-y-4 pointer-events-none'
                        }`}
        >
            <span className="text-[var(--accent)] font-semibold">✓</span>
            {message}
        </div>
    );
}

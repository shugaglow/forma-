import React, { useState, useEffect } from 'react';
import { MapPin, Mail, Phone, Clock } from 'lucide-react';

export default function ContactPage({ setPage }) {
    const [formData, setFormData] = useState({ name: '', email: '', subject: 'Order Enquiry', message: '' });
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.email.trim()) newErrors.email = "Email is required";
        if (!formData.message.trim()) newErrors.message = "Message is required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        setSubmitted(true);
    };

    return (
        <div className="font-sans pb-0">
            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Header */}
                <nav className="flex items-center gap-2 text-[11px] tracking-widest uppercase text-[var(--mid)] mb-8">
                    <button onClick={() => setPage('home')} className="hover:text-[var(--ink)] transition-colors">Home</button>
                    <span>/</span>
                    <span className="text-[var(--ink)]">Contact</span>
                </nav>
                <h1 className="font-serif text-5xl text-[var(--ink)] mb-4">Contact Us</h1>
                <p className="font-sans text-[18px] text-[var(--mid)] mb-16">We'd love to hear from you.</p>

                {/* Grid layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-24">
                    {/* LEFT - Form */}
                    <div>
                        {submitted ? (
                            <div className="bg-[#EDE7DE] p-12 text-center border border-[var(--border)]">
                                <span className="text-4xl block mb-4">✓</span>
                                <h3 className="font-serif text-[24px] text-[var(--ink)] mb-2">Message Sent</h3>
                                <p className="font-sans text-[15px] text-[var(--mid)]">
                                    Thanks {formData.name}, we'll be in touch within 24 hours.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                                {/* Name */}
                                <div className="flex flex-col gap-2">
                                    <label className="font-sans text-[11px] tracking-widest uppercase text-[var(--mid)] block">Name</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        className={`w-full font-sans text-[14px] bg-transparent border ${errors.name ? 'border-red-500' : 'border-[var(--border)]'} text-[var(--ink)] px-4 py-3 focus:outline-none focus:border-[var(--ink)] transition-colors`}
                                    />
                                    {errors.name && <span className="text-red-500 text-xs">{errors.name}</span>}
                                </div>

                                {/* Email */}
                                <div className="flex flex-col gap-2">
                                    <label className="font-sans text-[11px] tracking-widest uppercase text-[var(--mid)] block">Email</label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        className={`w-full font-sans text-[14px] bg-transparent border ${errors.email ? 'border-red-500' : 'border-[var(--border)]'} text-[var(--ink)] px-4 py-3 focus:outline-none focus:border-[var(--ink)] transition-colors`}
                                    />
                                    {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
                                </div>

                                {/* Subject */}
                                <div className="flex flex-col gap-2">
                                    <label className="font-sans text-[11px] tracking-widest uppercase text-[var(--mid)] block">Subject</label>
                                    <select
                                        value={formData.subject}
                                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                                        className="w-full font-sans text-[14px] bg-transparent border border-[var(--border)] text-[var(--ink)] px-4 py-3 focus:outline-none focus:border-[var(--ink)] transition-colors appearance-none"
                                    >
                                        <option>Order Enquiry</option>
                                        <option>Returns & Exchanges</option>
                                        <option>Product Question</option>
                                        <option>Press</option>
                                        <option>Other</option>
                                    </select>
                                </div>

                                {/* Message */}
                                <div className="flex flex-col gap-2">
                                    <label className="font-sans text-[11px] tracking-widest uppercase text-[var(--mid)] block">Message</label>
                                    <textarea
                                        rows="5"
                                        value={formData.message}
                                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                                        className={`w-full font-sans text-[14px] bg-transparent border ${errors.message ? 'border-red-500' : 'border-[var(--border)]'} text-[var(--ink)] px-4 py-3 focus:outline-none focus:border-[var(--ink)] transition-colors resize-none`}
                                    />
                                    {errors.message && <span className="text-red-500 text-xs">{errors.message}</span>}
                                </div>

                                <button
                                    type="submit"
                                    className="mt-2 font-sans text-[12px] tracking-widest uppercase bg-[var(--ink)] text-[var(--cream)] py-4 hover:bg-[var(--accent)] transition-colors duration-200"
                                >
                                    Send Message
                                </button>
                            </form>
                        )}
                    </div>

                    {/* RIGHT - Cards */}
                    <div className="flex flex-col gap-6">
                        {/* Visit */}
                        <div className="bg-[var(--card)] border border-[var(--border)] p-8 flex items-start gap-6">
                            <MapPin size={24} strokeWidth={1.5} className="text-[#BF4E1E] shrink-0" />
                            <div>
                                <h3 className="font-serif text-[20px] text-[var(--ink)] mb-2">Visit Us</h3>
                                <p className="font-sans text-[14px] text-[var(--mid)] leading-relaxed">
                                    Forma Studio, 12 Vesterbro Street<br />
                                    Copenhagen, Denmark
                                </p>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="bg-[var(--card)] border border-[var(--border)] p-8 flex items-start gap-6">
                            <Mail size={24} strokeWidth={1.5} className="text-[#BF4E1E] shrink-0" />
                            <div>
                                <h3 className="font-serif text-[20px] text-[var(--ink)] mb-2">Email Us</h3>
                                <div className="font-sans text-[14px] text-[var(--mid)] leading-relaxed flex flex-col gap-1">
                                    <p><span className="text-[var(--ink)]">hello@forma.com</span> (general)</p>
                                    <p><span className="text-[var(--ink)]">returns@forma.com</span> (returns)</p>
                                    <p><span className="text-[var(--ink)]">press@forma.com</span> (press)</p>
                                </div>
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="bg-[var(--card)] border border-[var(--border)] p-8 flex items-start gap-6">
                            <Phone size={24} strokeWidth={1.5} className="text-[#BF4E1E] shrink-0" />
                            <div>
                                <h3 className="font-serif text-[20px] text-[var(--ink)] mb-2">Call Us</h3>
                                <div className="font-sans text-[14px] text-[var(--mid)] leading-relaxed flex flex-col gap-1">
                                    <p className="text-[var(--ink)]">+45 33 12 34 56</p>
                                    <p>Mon–Fri, 9am–5pm CET</p>
                                </div>
                            </div>
                        </div>

                        {/* Response */}
                        <div className="bg-[var(--card)] border border-[var(--border)] p-8 flex items-start gap-6">
                            <Clock size={24} strokeWidth={1.5} className="text-[#BF4E1E] shrink-0" />
                            <div>
                                <h3 className="font-serif text-[20px] text-[var(--ink)] mb-2">Response Time</h3>
                                <p className="font-sans text-[14px] text-[var(--mid)] leading-relaxed">
                                    We aim to reply to all enquiries within 24 hours on business days.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Band */}
            <div className="bg-[#EDE7DE] py-20 px-6 text-center">
                <h2 className="font-serif text-3xl text-[var(--ink)] mb-8">Looking for something specific?</h2>
                <div className="flex flex-wrap items-center justify-center gap-4">
                    <button
                        onClick={() => setPage('shipping')}
                        className="font-sans text-[12px] tracking-widest uppercase bg-[var(--ink)] text-[var(--cream)] px-8 py-4 hover:bg-[var(--accent)] transition-colors duration-200"
                    >
                        Browse FAQ
                    </button>
                    <button
                        onClick={() => alert('Tracking system temporarily unavailable.')}
                        className="font-sans text-[12px] tracking-widest uppercase border border-[var(--ink)] text-[var(--ink)] px-8 py-4 hover:bg-[var(--ink)] hover:text-white transition-colors duration-200"
                    >
                        Track My Order
                    </button>
                </div>
            </div>
        </div>
    );
}

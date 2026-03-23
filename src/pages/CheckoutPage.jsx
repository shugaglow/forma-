import React, { useState, useEffect, useRef } from 'react';

const FREE_SHIPPING_THRESHOLD = 250;
const SHIPPING_COST = 18;

// Input formatting helpers
const formatCardNumber = (val) => {
    const digits = val.replace(/\D/g, '').slice(0, 16);
    const parts = digits.match(/[\s\S]{1,4}/g) || [];
    return parts.join(' ');
};

const formatExpiry = (val) => {
    const digits = val.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
    return digits;
};

// ── Input Helper Components ───────────────────────────────
const Label = ({ children }) => (
    <label className="block font-sans text-[10px] tracking-widest uppercase text-[var(--mid)] mb-1.5">
        {children}
    </label>
);

const Input = ({ label, error, onChange, ...rest }) => (
    <div className="w-full">
        <Label>{label}</Label>
        <input
            onChange={onChange}
            className={`w-full font-sans text-[14px] bg-transparent border-b outline-none py-2 transition-colors ${
                error ? 'border-red-500 text-red-500' : 'border-[var(--border)] focus:border-[var(--ink)] text-[var(--ink)]'
            } placeholder:text-[#d1d5db]`}
            {...rest}
        />
        {error && <p className="text-red-500 text-[11px] font-sans mt-1">{error}</p>}
    </div>
);

export default function CheckoutPage({ cart, setCart, setPage }) {
    const [step, setStep] = useState(() => {
        try {
            const saved = localStorage.getItem("forma_checkout_step");
            return saved ? JSON.parse(saved) : 1;
        } catch { return 1; }
    });

    // Snapshot of cart for Step 3
    const finalCartRef = useRef([]);
    const [orderNumber, setOrderNumber] = useState('');

    // Scroll to top on mount or step change
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [step]);

    // Step 1 State
    const [shipping, setShipping] = useState(() => {
        try {
            const saved = localStorage.getItem("forma_shipping");
            return saved ? JSON.parse(saved) : {
                firstName: '', lastName: '', email: '', phone: '',
                address: '', city: '', state: '', zip: '', country: 'United States'
            };
        } catch {
            return {
                firstName: '', lastName: '', email: '', phone: '',
                address: '', city: '', state: '', zip: '', country: 'United States'
            };
        }
    });
    const [shippingErrors, setShippingErrors] = useState({});

    // Step 2 State
    const [payment, setPayment] = useState(() => {
        try {
            const saved = localStorage.getItem("forma_payment");
            const parsed = saved ? JSON.parse(saved) : null;
            return parsed ? { ...parsed, cvv: '' } : {
                cardName: '', cardNumber: '', expiry: '', cvv: ''
            };
        } catch {
            return { cardName: '', cardNumber: '', expiry: '', cvv: '' };
        }
    });
    const [paymentErrors, setPaymentErrors] = useState({});

    // ── Persistence Effects ───────────────────────────────────
    useEffect(() => { try { localStorage.setItem("forma_checkout_step", JSON.stringify(step)); } catch {} }, [step]);
    useEffect(() => { try { localStorage.setItem("forma_shipping", JSON.stringify(shipping)); } catch {} }, [shipping]);
    useEffect(() => {
        try {
            const { cvv, ...paymentToSave } = payment;
            localStorage.setItem("forma_payment", JSON.stringify(paymentToSave));
        } catch {}
    }, [payment]);

    // Calculations (for Steps 1 & 2)
    const activeCart = step === 3 ? finalCartRef.current : cart;
    const subtotal = activeCart.reduce((sum, item) => sum + item.product.price * item.qty, 0);
    const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
    const total = subtotal + shippingFee;

    // Guard: If empty cart and not on step 3, redirect to shop
    useEffect(() => {
        if (cart.length === 0 && step !== 3) {
            setPage('shop');
        }
    }, [cart, step, setPage]);

    // Validation Functions
    const validateShipping = () => {
        const errors = {};
        Object.keys(shipping).forEach((key) => {
            if (!shipping[key].trim()) errors[key] = 'Required';
        });
        if (shipping.email && !shipping.email.includes('@')) {
            errors.email = 'Invalid email address';
        }
        setShippingErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const validatePayment = () => {
        const errors = {};
        if (!payment.cardName.trim()) errors.cardName = 'Required';
        if (payment.cardNumber.replace(/\D/g, '').length !== 16) errors.cardNumber = 'Card number must be 16 digits';
        if (!/^\d{2}\/\d{2}$/.test(payment.expiry)) errors.expiry = 'Format must be MM/YY';
        if (payment.cvv.length < 3) errors.cvv = 'CVV must be 3 or 4 digits';

        setPaymentErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // Transitions
    const goToPayment = () => {
        if (validateShipping()) setStep(2);
    };

    const placeOrder = () => {
        if (validatePayment()) {
            finalCartRef.current = [...cart];
            setOrderNumber("FRM-" + Math.floor(Math.random() * 90000 + 10000));
            setCart([]);
            try {
                localStorage.removeItem("forma_cart");
                localStorage.removeItem("forma_shipping");
                localStorage.removeItem("forma_payment");
                localStorage.removeItem("forma_checkout_step");
                localStorage.removeItem("forma_page");
            } catch {}
            setStep(3);
        }
    };

    // ── Input Helper Components ───────────────────────────────

    // ── Render Views ──────────────────────────────────────────

    const renderProgressBar = () => (
        <div className="mb-12">
            <div className="flex items-center justify-between relative max-w-sm mx-auto">
                {/* Connecting line background */}
                <div className="absolute top-4 left-0 w-full h-0.5 bg-[var(--border)] -z-10" />
                {/* Connecting line filled (Accent) */}
                <div className="absolute top-4 left-0 h-0.5 bg-[#BF4E1E] transition-all duration-500 -z-10" 
                     style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }} />

                {['Shipping', 'Payment', 'Confirmation'].map((title, i) => {
                    const stepNum = i + 1;
                    const isCompleted = step > stepNum;
                    const isActive = step === stepNum;
                    return (
                        <div key={title} className="flex flex-col items-center gap-3 bg-[var(--cream)] px-2">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] transition-colors duration-300 ${
                                isCompleted ? 'bg-[#BF4E1E] text-white' : isActive ? 'bg-[var(--ink)] text-white' : 'border border-[var(--border)] text-[var(--mid)] bg-[var(--cream)]'
                            }`}>
                                {isCompleted ? '✓' : stepNum}
                            </div>
                            <span className={`font-sans text-[10px] tracking-widest uppercase ${isActive || isCompleted ? 'text-[var(--ink)]' : 'text-[var(--mid)]'}`}>
                                {title}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );

    const renderOrderSummary = () => (
        <div className="lg:sticky lg:top-28 bg-[var(--card)] border border-[var(--border)] p-8">
            <h3 className="font-serif text-2xl text-[var(--ink)] mb-6">Order Summary</h3>
            <div className="flex flex-col gap-4 mb-6">
                {activeCart.map((item, i) => (
                    <div key={i} className="flex items-center gap-4">
                        <div className="w-16 h-20 shrink-0 flex items-center justify-center text-2xl" style={{ background: item.product.bg }}>
                            {item.product.emoji}
                        </div>
                        <div className="flex-1">
                            <p className="font-serif text-[17px] text-[var(--ink)] leading-snug">{item.product.name}</p>
                            <p className="font-sans text-[11px] text-[var(--mid)] mt-0.5">
                                Qty: {item.qty} {item.size ? `· Size: ${item.size}` : ''}
                            </p>
                        </div>
                        <p className="font-sans text-[14px] text-[var(--ink)]">
                            ${(item.product.price * item.qty).toFixed(0)}
                        </p>
                    </div>
                ))}
            </div>
            <div className="flex flex-col gap-3 py-4 border-t border-[var(--border)] text-[13px] font-sans">
                <div className="flex justify-between text-[var(--mid)]">
                    <span>Subtotal</span><span>${subtotal?.toFixed(0)}</span>
                </div>
                <div className="flex justify-between text-[var(--mid)]">
                    <span>Shipping</span><span>{shippingFee === 0 ? 'Free' : `$${shippingFee}`}</span>
                </div>
            </div>
            <div className="flex justify-between border-t border-[var(--border)] pt-4 font-sans uppercase tracking-widest text-[13px] text-[var(--ink)]">
                <span>Total</span>
                <span className="font-serif text-2xl normal-case">${total?.toFixed(0)}</span>
            </div>
        </div>
    );

    // ── STEP Renderers ────────────────────────────────────────

    const renderStep1 = () => (
        <div className="flex flex-col gap-10">
            <div>
                <h2 className="font-serif text-3xl text-[var(--ink)] mb-6">Shipping Address</h2>
                <div className="flex flex-col gap-6">
                    <div className="flex gap-6">
                        <Input label="First Name" value={shipping.firstName} error={shippingErrors.firstName} onChange={e => setShipping(prev => ({...prev, firstName: e.target.value}))} />
                        <Input label="Last Name" value={shipping.lastName} error={shippingErrors.lastName} onChange={e => setShipping(prev => ({...prev, lastName: e.target.value}))} />
                    </div>
                    <div className="flex gap-6">
                        <Input label="Email Address" type="email" value={shipping.email} error={shippingErrors.email} onChange={e => setShipping(prev => ({...prev, email: e.target.value}))} />
                        <Input label="Phone Number" type="tel" value={shipping.phone} error={shippingErrors.phone} onChange={e => setShipping(prev => ({...prev, phone: e.target.value}))} />
                    </div>
                    <Input label="Street Address" value={shipping.address} error={shippingErrors.address} onChange={e => setShipping(prev => ({...prev, address: e.target.value}))} />
                    <div className="grid grid-cols-3 gap-6">
                        <Input label="City" value={shipping.city} error={shippingErrors.city} onChange={e => setShipping(prev => ({...prev, city: e.target.value}))} />
                        <Input label="State / Province" value={shipping.state} error={shippingErrors.state} onChange={e => setShipping(prev => ({...prev, state: e.target.value}))} />
                        <Input label="Postal / ZIP" value={shipping.zip} error={shippingErrors.zip} onChange={e => setShipping(prev => ({...prev, zip: e.target.value}))} />
                    </div>
                    <div className="w-full">
                        <Label>Country</Label>
                        <select 
                            value={shipping.country}
                            onChange={(e) => setShipping(prev => ({...prev, country: e.target.value}))}
                            className="w-full font-sans text-[14px] bg-transparent border-b border-[var(--border)] focus:border-[var(--ink)] text-[var(--ink)] pb-2 outline-none appearance-none cursor-pointer"
                        >
                            <option value="United States">United States</option>
                            <option value="United Kingdom">United Kingdom</option>
                            <option value="Canada">Canada</option>
                            <option value="Germany">Germany</option>
                            <option value="Nigeria">Nigeria</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-6 pt-6 border-t border-[var(--border)]">
                <button onClick={() => setPage('cart')} className="font-sans text-[11px] tracking-widest uppercase text-[var(--mid)] hover:text-[var(--ink)] transition-colors">
                    ← Back to Cart
                </button>
                <button onClick={goToPayment} className="w-full sm:w-auto font-sans text-[11px] tracking-widest uppercase bg-[var(--ink)] text-[var(--cream)] px-8 py-4 hover:bg-[#BF4E1E] transition-colors duration-200">
                    Continue to Payment
                </button>
            </div>
        </div>
    );

    const renderStep2 = () => (
        <div className="flex flex-col gap-10">
            <div>
                <h2 className="font-serif text-3xl text-[var(--ink)] mb-6">Payment Method</h2>
                
                {/* Accepted Cards Tags */}
                <div className="flex gap-2 mb-8">
                    {['Visa', 'Mastercard', 'Amex'].map(card => (
                        <span key={card} className="font-sans text-[10px] tracking-widest uppercase border border-[var(--border)] px-3 py-1 flex items-center justify-center">
                            {card}
                        </span>
                    ))}
                </div>

                <div className="flex flex-col gap-6">
                    <Input label="Name on Card" value={payment.cardName} error={paymentErrors.cardName} onChange={e => setPayment(prev => ({...prev, cardName: e.target.value}))} />
                    <Input 
                        label="Card Number" 
                        value={payment.cardNumber} 
                        error={paymentErrors.cardNumber} 
                        onChange={e => setPayment(prev => ({...prev, cardNumber: formatCardNumber(e.target.value)}))} 
                        placeholder="0000 0000 0000 0000"
                        maxLength={19}
                    />
                    <div className="flex gap-6">
                        <Input 
                            label="Expiry Date" 
                            value={payment.expiry} 
                            error={paymentErrors.expiry} 
                            onChange={e => setPayment(prev => ({...prev, expiry: formatExpiry(e.target.value)}))} 
                            placeholder="MM/YY"
                            maxLength={5}
                        />
                        <Input 
                            label="Security Code (CVV)" 
                            type="password" 
                            value={payment.cvv} 
                            error={paymentErrors.cvv} 
                            onChange={e => setPayment(prev => ({...prev, cvv: e.target.value.replace(/\D/g, '').slice(0, 4)}))} 
                            placeholder="123"
                        />
                    </div>
                </div>
            </div>

            <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-6 pt-6 border-t border-[var(--border)]">
                <button onClick={() => setStep(1)} className="font-sans text-[11px] tracking-widest uppercase text-[var(--mid)] hover:text-[var(--ink)] transition-colors">
                    ← Back to Shipping
                </button>
                <button onClick={placeOrder} className="w-full sm:w-auto font-sans text-[11px] tracking-widest uppercase bg-[var(--ink)] text-[var(--cream)] px-8 py-4 hover:bg-[#BF4E1E] transition-colors duration-200">
                    Place Order — ${total?.toFixed(0)}
                </button>
            </div>
        </div>
    );

    const renderStep3 = () => (
        <div className="flex flex-col items-center justify-center py-12 px-6 text-center max-w-2xl mx-auto">
            <div className="w-24 h-24 rounded-full bg-[#BF4E1E] text-white flex items-center justify-center text-4xl mb-8">
                ✓
            </div>
            <h1 className="font-serif text-5xl text-[var(--ink)] mb-4">Order Confirmed</h1>
            <p className="font-sans text-[16px] text-[var(--mid)] mb-8">
                Thank you, {shipping.firstName}! Your order has been placed successfully.
            </p>
            
            <div className="inline-block border border-[var(--border)] px-6 py-2 mb-12">
                <span className="font-sans text-[11px] tracking-widest uppercase text-[var(--ink)]">
                    Order Number: <span className="font-semibold">{orderNumber}</span>
                </span>
            </div>

            <div className="w-full bg-[var(--card)] p-8 border border-[var(--border)] text-left mb-12">
                <h3 className="font-serif text-2xl text-[var(--ink)] mb-6">Delivery Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-sans text-[13px] text-[var(--mid)] leading-relaxed">
                    <div>
                        <p className="font-bold text-[11px] tracking-widest uppercase text-[var(--ink)] mb-2">Shipping Address</p>
                        <p>{shipping.firstName} {shipping.lastName}</p>
                        <p>{shipping.address}</p>
                        <p>{shipping.city}, {shipping.state} {shipping.zip}</p>
                        <p>{shipping.country}</p>
                    </div>
                    <div>
                        <p className="font-bold text-[11px] tracking-widest uppercase text-[var(--ink)] mb-2">Estimated Arrival</p>
                        <p>5–8 business days</p>
                        <p className="mt-4 font-bold text-[11px] tracking-widest uppercase text-[var(--ink)] mb-2">Order Total</p>
                        <p>${total?.toFixed(0)}</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
                <button onClick={() => setPage('home')} className="w-full sm:w-auto px-10 py-4 font-sans text-[11px] tracking-widest uppercase border border-[var(--ink)] text-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--cream)] transition-colors">
                    Back to Home
                </button>
                <button onClick={() => setPage('shop')} className="w-full sm:w-auto px-10 py-4 font-sans text-[11px] tracking-widest uppercase bg-[var(--ink)] text-[var(--cream)] hover:bg-[#BF4E1E] transition-colors">
                    Continue Shopping
                </button>
            </div>
        </div>
    );

    // ── Main Layout ───────────────────────────────────────────
    if (step === 3) {
        return (
            <div className="max-w-[900px] mx-auto px-6 py-12 md:px-12">
                {renderProgressBar()}
                {renderStep3()}
            </div>
        );
    }

    if (cart.length === 0) return null; // Avoid flicker before redirect

    return (
        <div className="max-w-[1000px] mx-auto px-6 py-12 lg:px-12">
            {renderProgressBar()}

            <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-12 lg:gap-20 items-start">
                {/* Left Form Wrapper */}
                <div>
                    {step === 1 && renderStep1()}
                    {step === 2 && renderStep2()}
                </div>

                {/* Right Summary Sidebar */}
                {renderOrderSummary()}
            </div>
        </div>
    );
}

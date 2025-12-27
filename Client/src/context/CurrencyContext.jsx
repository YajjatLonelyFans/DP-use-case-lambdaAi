import React, { createContext, useContext, useState } from 'react';

const CurrencyContext = createContext();

export function useCurrency() {
    return useContext(CurrencyContext);
}

export function CurrencyProvider({ children }) {
    const [currency, setCurrency] = useState('USD'); // 'USD' or 'INR'
    const exchangeRate = 90;

    const toggleCurrency = () => {
        setCurrency((prev) => (prev === 'USD' ? 'INR' : 'USD'));
    };

    const formatCurrency = (value) => {
        if (currency === 'INR') {
            return new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: 'INR',
                maximumFractionDigits: 1,
                notation: 'compact',
            }).format(value * exchangeRate);
        }
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 1,
            notation: 'compact',
        }).format(value);
    };

    const value = {
        currency,
        toggleCurrency,
        formatCurrency,
    };

    return (
        <CurrencyContext.Provider value={value}>
            {children}
        </CurrencyContext.Provider>
    );
}

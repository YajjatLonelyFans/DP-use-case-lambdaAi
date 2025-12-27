import React from 'react';
import { useCurrency } from '../../context/CurrencyContext';

export default function InventoryStats({ stats }) {
    const { formatCurrency } = useCurrency();

    if (!stats) return null;

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
                <div key={stat.label} className="overflow-hidden rounded-xl bg-white px-4 py-5 shadow sm:p-6 ring-1 ring-gray-900/5">
                    <dt className="truncate text-sm font-medium text-gray-500">{stat.label}</dt>
                    <dd className={`mt-1 text-3xl font-semibold tracking-tight ${stat.isAlert ? 'text-red-600' : 'text-gray-900'}`}>
                        {stat.type === 'currency' ? formatCurrency(stat.value) : stat.value}
                    </dd>
                </div>
            ))}
        </div>
    );
}

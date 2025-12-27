import React from 'react';
import { useCurrency } from '../../context/CurrencyContext';

export default function PromoCard({ promo }) {
    const { formatCurrency } = useCurrency();

    return (
        <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200 transition-all hover:shadow-md">
            <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                <div className="h-12 w-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10 flex items-center justify-center font-bold text-indigo-600 text-xl">
                    %
                </div>
                <div className="text-sm font-medium leading-6 text-gray-900">{promo.name}</div>
                <div className="relative ml-auto">
                    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${promo.status === 'Active' ? 'bg-green-50 text-green-700 ring-green-600/20' : 'bg-gray-50 text-gray-600 ring-gray-500/10'}`}>
                        {promo.status}
                    </span>
                </div>
            </div>
            <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
                <div className="flex justify-between gap-x-4 py-3">
                    <dt className="text-gray-500">Code</dt>
                    <dd className="font-mono text-gray-700 bg-gray-100 px-2 rounded">{promo.code}</dd>
                </div>
                <div className="flex justify-between gap-x-4 py-3">
                    <dt className="text-gray-500">Discount</dt>
                    <dd className="text-gray-700">
                        {promo.isCurrency ? formatCurrency(promo.value) + ' Off' : promo.value + '% Off'}
                    </dd>
                </div>
                <div className="flex justify-between gap-x-4 py-3">
                    <dt className="text-gray-500">Revenue Generated</dt>
                    <dd className="flex items-start gap-x-2">
                        <div className="font-medium text-gray-900">{formatCurrency(promo.revenue)}</div>
                    </dd>
                </div>
                <div className="flex justify-between gap-x-4 py-3">
                    <dt className="text-gray-500">Redemptions</dt>
                    <dd className="text-gray-700">{promo.usage}</dd>
                </div>
            </dl>
        </div>
    );
}

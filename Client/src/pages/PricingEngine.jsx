import React from 'react';
import { SyncLoader } from 'react-spinners';
import DashboardLayout from '../components/layout/DashboardLayout';
import RulesList from '../components/pricing/RulesList';
import { usePricingData } from '../data/useDashboardData';
import { useCurrency } from '../context/CurrencyContext';

export default function PricingEngine() {
    const { currency, formatCurrency } = useCurrency();
    const { data, isLoading } = usePricingData(currency);

    if (isLoading) {
        return (
            <DashboardLayout>
                <div className="flex h-[80vh] flex-col items-center justify-center gap-6">
                    <SyncLoader color="#4f46e5" size={15} margin={5} />
                    <p className="text-slate-500 font-medium tracking-wide animate-pulse">Loading Pricing Rules...</p>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div className="md:flex md:items-center md:justify-between">
                    <div className="min-w-0 flex-1">
                        <h2 className="text-2xl font-bold leading-7 text-slate-900 sm:truncate sm:text-3xl sm:tracking-tight">
                            Pricing Engine
                        </h2>
                        <p className="mt-2 text-sm text-slate-500">Manage automated pricing rules and view change logs.</p>
                    </div>
                    <div className="mt-4 flex md:ml-4 md:mt-0">
                        <button
                            type="button"
                            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Create Rule
                        </button>
                    </div>
                </div>

                <RulesList rules={data?.rules} />

                <div className="bg-white shadow sm:rounded-lg overflow-hidden">
                    <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                        <h3 className="text-base font-semibold leading-6 text-gray-900">Recent Automated Actions</h3>
                    </div>
                    <ul role="list" className="divide-y divide-gray-100">
                        {data?.actions?.map((action) => (
                            <li key={action.id} className="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6">
                                <div className="flex min-w-0 gap-x-4">
                                    <div className="min-w-0 flex-auto">
                                        <p className="text-sm font-semibold leading-6 text-gray-900">
                                            <span className="absolute inset-x-0 -top-px bottom-0" />
                                            {action.product}
                                        </p>
                                        <p className="mt-1 flex text-xs leading-5 text-gray-500">
                                            Triggered by {action.trigger}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex shrink-0 items-center gap-x-4">
                                    <div className="hidden sm:flex sm:flex-col sm:items-end">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm text-gray-500 line-through">{formatCurrency(action.oldPrice)}</span>
                                            <span className="text-sm font-bold text-gray-900">{formatCurrency(action.newPrice)}</span>
                                        </div>
                                        <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${action.diff > 0 ? 'text-green-700 bg-green-50 ring-green-600/20' : 'text-red-700 bg-red-50 ring-red-600/10'}`}>
                                            {action.diff > 0 ? '+' : ''}{formatCurrency(action.diff)}
                                        </span>
                                        <p className="mt-1 text-xs leading-5 text-gray-500">{action.time}</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </DashboardLayout>
    );
}

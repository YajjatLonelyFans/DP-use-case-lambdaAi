import React from 'react';
import { SyncLoader } from 'react-spinners';
import DashboardLayout from '../components/layout/DashboardLayout';
import PromoCard from '../components/promotions/PromoCard';
import { usePromotionsData } from '../data/useDashboardData';
import { useCurrency } from '../context/CurrencyContext';

export default function Promotions() {
    const { currency } = useCurrency();
    const { data, isLoading } = usePromotionsData(currency);

    if (isLoading) {
        return (
            <DashboardLayout>
                <div className="flex h-[80vh] flex-col items-center justify-center gap-6">
                    <SyncLoader color="#4f46e5" size={15} margin={5} />
                    <p className="text-slate-500 font-medium tracking-wide animate-pulse">Loading Campaigns...</p>
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
                            Promotion Management
                        </h2>
                        <p className="mt-2 text-sm text-slate-500">Track performance of active campaigns and plan upcoming deals.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {data?.promos?.map(promo => (
                        <PromoCard key={promo.id} promo={promo} />
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
}

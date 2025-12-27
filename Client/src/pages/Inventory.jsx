import React from 'react';
import { SyncLoader } from 'react-spinners';
import DashboardLayout from '../components/layout/DashboardLayout';
import InventoryStats from '../components/inventory/InventoryStats';
import ProductsTable from '../components/tables/ProductsTable';
import { useInventoryData } from '../data/useDashboardData';
import { useCurrency } from '../context/CurrencyContext';

export default function Inventory() {
    const { currency } = useCurrency();
    const { data, isLoading } = useInventoryData(currency);

    if (isLoading) {
        return (
            <DashboardLayout>
                <div className="flex h-[80vh] flex-col items-center justify-center gap-6">
                    <SyncLoader color="#4f46e5" size={15} margin={5} />
                    <p className="text-slate-500 font-medium tracking-wide animate-pulse">Checking Stock Levels...</p>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold leading-7 text-slate-900 sm:truncate sm:text-3xl sm:tracking-tight">
                        Inventory Management
                    </h1>
                    <p className="mt-2 text-sm text-slate-500">Real-time stock tracking and valuation.</p>
                </div>

                <InventoryStats stats={data?.stats} />

                <div className="bg-white shadow sm:rounded-lg overflow-hidden">
                    <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                        <h3 className="text-base font-semibold leading-6 text-gray-900">Stock Details</h3>
                    </div>
                    <div className="px-4 pb-4">
                        <ProductsTable data={data?.products} />
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

import React from 'react';
import { motion } from 'framer-motion';
import { SyncLoader } from 'react-spinners';
import DashboardLayout from '../components/layout/DashboardLayout';
import KPIGrid from '../components/kpi/KPIGrid';
import RevenueChart from '../components/charts/RevenueChart';
import InventoryChart from '../components/charts/InventoryChart';
import ProductsTable from '../components/tables/ProductsTable';
import { useDashboardMetrics } from '../data/useDashboardData';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { type: 'spring', stiffness: 50 },
    },
};

export default function Dashboard() {
    const { data, isLoading, error } = useDashboardMetrics();

    if (isLoading) {
        return (
            <DashboardLayout>
                <div className="flex h-[80vh] flex-col items-center justify-center gap-6">
                    <SyncLoader color="#4f46e5" size={15} margin={5} />
                    <p className="text-slate-500 font-medium tracking-wide animate-pulse">Aggregating Store Data...</p>
                </div>
            </DashboardLayout>
        );
    }

    if (error) {
        return (
            <DashboardLayout>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="rounded-lg bg-red-50 p-6 border border-red-100"
                >
                    <div className="flex items-center">
                        <h3 className="text-lg font-medium text-red-800">Unable to load dashboard</h3>
                    </div>
                    <p className="mt-2 text-sm text-red-700">Detailed analytics are currently unavailable. Please check your connection.</p>
                </motion.div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-8"
            >
                <motion.div variants={itemVariants} className="flex items-end justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Store Overview</h1>
                        <p className="mt-2 text-sm text-slate-500">
                            Performance metrics for <span className="font-semibold text-indigo-600">Flagship Store (NY)</span> • {new Date().toLocaleDateString()}
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <button className="hidden sm:inline-flex items-center justify-center rounded-lg bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50 transition-colors">
                            Download Report
                        </button>
                        <button className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                            + New Product
                        </button>
                    </div>
                </motion.div>

                {/* KPI Section */}
                <motion.section variants={itemVariants}>
                    <KPIGrid kpis={data?.kpis} />
                </motion.section>

                {/* Charts Section */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    <motion.div variants={itemVariants} className="lg:col-span-2 h-full">
                        <RevenueChart data={data?.salesTrend} />
                    </motion.div>
                    <motion.div variants={itemVariants} className="lg:col-span-1 h-full">
                        <InventoryChart data={data?.inventoryDist} />
                    </motion.div>
                </div>

                {/* Table Section */}
                <motion.section variants={itemVariants} className="pt-4">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-slate-900">High Impact Products</h2>
                    </div>
                    <ProductsTable data={data?.products} />
                </motion.section>
            </motion.div>
        </DashboardLayout>
    );
}

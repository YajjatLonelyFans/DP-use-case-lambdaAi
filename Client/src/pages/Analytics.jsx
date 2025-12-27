import React from 'react';
import { motion } from 'framer-motion';
import { SyncLoader } from 'react-spinners';
import DashboardLayout from '../components/layout/DashboardLayout';
import KPIGrid from '../components/kpi/KPIGrid';
import RevenueChart from '../components/charts/RevenueChart';
import InventoryChart from '../components/charts/InventoryChart';
import PerformanceStats from '../components/analytics/PerformanceStats';
import DemandCurveChart from '../components/analytics/DemandCurveChart';
import CategoryBarChart from '../components/analytics/CategoryBarChart';
import { useDashboardMetrics, useAnalyticsData } from '../data/useDashboardData';
import { useCurrency } from '../context/CurrencyContext';

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { type: 'spring', stiffness: 50 },
    },
};

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

export default function Analytics() {
    const { currency } = useCurrency();
    const { data: dashboardData, isLoading: isDashLoading } = useDashboardMetrics(currency);
    const { data: analyticsData, isLoading: isAnalyticsLoading } = useAnalyticsData(currency);

    const isLoading = isDashLoading || isAnalyticsLoading;

    if (isLoading) {
        return (
            <DashboardLayout>
                <div className="flex h-[80vh] flex-col items-center justify-center gap-6">
                    <SyncLoader color="#4f46e5" size={15} margin={5} />
                    <p className="text-slate-500 font-medium tracking-wide animate-pulse">Computing Analytics...</p>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-12"
            >
                {/* Section 1: Store Overview (Reused) */}
                <section className="space-y-6">
                    <div className="border-b border-slate-200 pb-5">
                        <h2 className="text-2xl font-bold leading-7 text-slate-900 sm:truncate sm:text-3xl sm:tracking-tight">
                            Store Overview
                        </h2>
                        <p className="mt-2 text-sm text-slate-500">High-level sales and inventory metrics.</p>
                    </div>

                    <motion.div variants={itemVariants}>
                        <KPIGrid kpis={dashboardData?.kpis} />
                    </motion.div>

                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                        <motion.div variants={itemVariants} className="lg:col-span-2">
                            <RevenueChart data={dashboardData?.salesTrend} />
                        </motion.div>
                        <motion.div variants={itemVariants} className="lg:col-span-1">
                            <InventoryChart data={dashboardData?.inventoryDist} />
                        </motion.div>
                    </div>
                </section>

                {/* Section 2: Pricing Deep Dive (New) */}
                <section className="space-y-6">
                    <div className="border-b border-slate-200 pb-5">
                        <h2 className="text-2xl font-bold leading-7 text-slate-900 sm:truncate sm:text-3xl sm:tracking-tight">
                            Pricing Deep Dive
                        </h2>
                        <p className="mt-2 text-sm text-slate-500">Advanced analysis on demand elasticity and category performance.</p>
                    </div>

                    <motion.div variants={itemVariants}>
                        <PerformanceStats stats={analyticsData?.performance} />
                    </motion.div>

                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                        <motion.div variants={itemVariants} className="h-full">
                            <DemandCurveChart data={analyticsData?.elasticity} />
                        </motion.div>
                        <motion.div variants={itemVariants} className="h-full">
                            <CategoryBarChart data={analyticsData?.categoryPerformance} />
                        </motion.div>
                    </div>
                </section>
            </motion.div>
        </DashboardLayout>
    );
}

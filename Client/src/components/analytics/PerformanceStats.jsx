import React from 'react';
import KPIGrid from '../kpi/KPIGrid';

export default function PerformanceStats({ stats }) {
    if (!stats) return null;

    return (
        <div className="py-4">
            <h3 className="text-base font-semibold leading-6 text-gray-900 mb-4">Pricing Efficiency Metrics</h3>
            <KPIGrid kpis={stats} />
        </div>
    );
}

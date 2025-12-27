import React from 'react';
import KPICard from './KPICard';

export default function KPIGrid({ kpis }) {
    if (!kpis) return null;

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {kpis.map((kpi) => (
                <KPICard key={kpi.id} kpi={kpi} />
            ))}
        </div>
    );
}

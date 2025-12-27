import React from 'react';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/20/solid';
import { motion } from 'framer-motion';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function KPICard({ kpi }) {
    const { label, value, change, trend, isInverse, description } = kpi;

    const isPositiveOutcome = isInverse
        ? trend === 'down'
        : trend === 'up';

    const trendColor = isPositiveOutcome
        ? 'text-emerald-700 bg-emerald-50 ring-emerald-600/20'
        : 'text-rose-700 bg-rose-50 ring-rose-600/20';

    const TrendIcon = trend === 'up' ? ArrowUpIcon : ArrowDownIcon;

    return (
        <motion.div
            whileHover={{ y: -4, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            className="overflow-hidden rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
        >
            <dt className="truncate text-sm font-medium text-slate-500">{label}</dt>
            <dd className="mt-3 flex items-baseline justify-between">
                <span className="text-3xl font-bold tracking-tight text-slate-900">{value}</span>
                <span className={classNames(trendColor, 'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ring-1 ring-inset')}>
                    <TrendIcon className="mr-1 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    {change}
                </span>
            </dd>
            {description && (
                <div className="mt-4 flex items-center gap-2">
                    <div className={`h-1.5 w-1.5 rounded-full ${isPositiveOutcome ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
                    <p className="text-xs text-slate-400 line-clamp-1">
                        {description}
                    </p>
                </div>
            )}
        </motion.div>
    );
}

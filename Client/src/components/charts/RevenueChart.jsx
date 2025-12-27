import React from 'react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, ComposedChart, Legend
} from 'recharts';
import { useCurrency } from '../../context/CurrencyContext';

export default function RevenueChart({ data }) {
    const { formatCurrency } = useCurrency();

    if (!data) return <div className="h-72 flex items-center justify-center text-gray-400">Loading Chart...</div>;

    return (
        <div className="bg-white rounded-xl shadow-sm p-6 ring-1 ring-gray-900/5">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-base font-semibold leading-6 text-gray-900">Revenue & Margin Trend</h3>
                <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                    Last 30 Days
                </span>
            </div>
            <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={data}>
                        <defs>
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1} />
                                <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                        <XAxis
                            dataKey="date"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6b7280', fontSize: 12 }}
                            dy={10}
                            minTickGap={30}
                        />
                        {/* Left Axis: Revenue ($) */}
                        <YAxis
                            yAxisId="left"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6b7280', fontSize: 12 }}
                            tickFormatter={(value) => formatCurrency(value)}
                        />
                        {/* Right Axis: Margin (%) */}
                        <YAxis
                            yAxisId="right"
                            orientation="right"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6b7280', fontSize: 12 }}
                            unit="%"
                            domain={[20, 60]}
                        />
                        <Tooltip
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            itemStyle={{ fontSize: '13px' }}
                            formatter={(value, name) => [
                                name === 'Revenue' ? formatCurrency(value) : `${value}%`,
                                name
                            ]}
                        />
                        <Legend wrapperStyle={{ paddingTop: '20px' }} />

                        <Area
                            yAxisId="left"
                            type="monotone"
                            dataKey="revenue"
                            name="Revenue"
                            stroke="#4f46e5"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorRevenue)"
                        />
                        <Line
                            yAxisId="right"
                            type="monotone"
                            dataKey="margin"
                            name="Gross Margin %"
                            stroke="#10b981"
                            strokeWidth={2}
                            dot={false}
                        />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

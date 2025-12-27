import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { useCurrency } from '../../context/CurrencyContext';

export default function CategoryBarChart({ data }) {
    const { formatCurrency } = useCurrency();

    if (!data) return <div className="h-72 flex items-center justify-center text-gray-400">Loading Chart...</div>;

    return (
        <div className="bg-white rounded-xl shadow-sm p-6 ring-1 ring-gray-900/5">
            <div className="mb-6">
                <h3 className="text-base font-semibold leading-6 text-gray-900">Category Performance</h3>
                <p className="text-sm text-gray-500">Revenue contribution and average margin by category.</p>
            </div>
            <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="category" axisLine={false} tickLine={false} />
                        <YAxis
                            yAxisId="left"
                            orientation="left"
                            axisLine={false}
                            tickLine={false}
                            tickFormatter={(val) => formatCurrency(val)}
                        />
                        <YAxis
                            yAxisId="right"
                            orientation="right"
                            axisLine={false}
                            tickLine={false}
                            unit="%"
                        />
                        <Tooltip
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            formatter={(value, name) => [
                                name === 'Revenue' ? formatCurrency(value) : `${value}%`,
                                name
                            ]}
                        />
                        <Legend />
                        <Bar yAxisId="left" dataKey="revenue" name="Revenue" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                        <Bar yAxisId="right" dataKey="margin" name="Margin %" fill="#10b981" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

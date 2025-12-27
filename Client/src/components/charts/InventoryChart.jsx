import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

export default function InventoryChart({ data }) {
    if (!data) return null;

    return (
        <div className="bg-white rounded-xl shadow-sm p-6 ring-1 ring-gray-900/5">
            <div className="flex items-center justify-between mb-2">
                <h3 className="text-base font-semibold leading-6 text-gray-900">Inventory Health (Aging)</h3>
            </div>
            <p className="text-sm text-gray-500 mb-6">Distribution of stock by time in warehouse</p>

            <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} strokeWidth={0} />
                            ))}
                        </Pie>
                        <Tooltip
                            formatter={(value) => `${value}%`}
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                        <Legend verticalAlign="bottom" height={36} iconType="circle" />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

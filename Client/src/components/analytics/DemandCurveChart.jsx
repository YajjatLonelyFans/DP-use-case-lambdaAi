import React from 'react';
import {
    ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label
} from 'recharts';
import { useCurrency } from '../../context/CurrencyContext';

export default function DemandCurveChart({ data }) {
    const { formatCurrency } = useCurrency();

    if (!data) return <div className="h-72 flex items-center justify-center text-gray-400">Loading Chart...</div>;

    return (
        <div className="bg-white rounded-xl shadow-sm p-6 ring-1 ring-gray-900/5">
            <div className="mb-6">
                <h3 className="text-base font-semibold leading-6 text-gray-900">Price Elasticity of Demand</h3>
                <p className="text-sm text-gray-500">Estimated demand at different price points.</p>
            </div>
            <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="qty"
                            type="number"
                            name="Quantity"
                            unit=" units"
                            label={{ value: 'Quantity Demanded', position: 'bottom', offset: 0 }}
                        />
                        <YAxis
                            dataKey="price"
                            type="number"
                            name="Price"
                            unit=""
                            tickFormatter={(val) => formatCurrency(val)}
                            label={{ value: 'Price', angle: -90, position: 'left' }}
                        />
                        <Tooltip
                            cursor={{ strokeDasharray: '3 3' }}
                            formatter={(value, name) => [
                                name === 'Price' ? formatCurrency(value) : value,
                                name
                            ]}
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                        <Scatter name="Demand" data={data} fill="#8884d8" line={{ stroke: '#4f46e5', strokeWidth: 2 }} shape="circle" />
                    </ScatterChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

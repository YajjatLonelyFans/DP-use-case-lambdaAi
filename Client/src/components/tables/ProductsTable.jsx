import React, { useMemo, useState } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    flexRender,
    createColumnHelper,
} from '@tanstack/react-table';
import { useCurrency } from '../../context/CurrencyContext';
import { ChevronUpIcon, ChevronDownIcon, ArrowsUpDownIcon } from '@heroicons/react/20/solid';

const columnHelper = createColumnHelper();

const StatusBadge = ({ status }) => {
    const styles = {
        'Active': 'bg-green-50 text-green-700 ring-green-600/20',
        'Low Stock': 'bg-yellow-50 text-yellow-800 ring-yellow-600/20',
        'Out of Stock': 'bg-red-50 text-red-700 ring-red-600/10',
    };
    return (
        <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${styles[status] || 'bg-gray-50 text-gray-600 ring-gray-500/10'}`}>
            {status}
        </span>
    );
};

export default function ProductsTable({ data }) {
    const [sorting, setSorting] = useState([]);
    const { formatCurrency } = useCurrency();

    const columns = useMemo(() => [
        columnHelper.accessor('name', {
            header: 'Product Name',
            cell: info => <span className="font-medium text-gray-900">{info.getValue()}</span>,
        }),
        columnHelper.accessor('category', {
            header: 'Category',
            cell: info => <span className="text-gray-500">{info.getValue()}</span>,
        }),
        columnHelper.accessor('price', {
            header: 'Price',
            cell: info => formatCurrency(info.getValue()),
        }),
        columnHelper.accessor('margin', {
            header: 'Margin %',
            cell: info => (
                <span className={info.getValue() < 30 ? 'text-red-500 font-medium' : 'text-green-600 font-medium'}>
                    {info.getValue()}%
                </span>
            ),
        }),
        columnHelper.accessor('stock', {
            header: 'Stock Level',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('status', {
            header: 'Status',
            cell: info => <StatusBadge status={info.getValue()} />,
        }),
    ], [formatCurrency]);

    const table = useReactTable({
        data: data || [],
        columns,
        state: {
            sorting,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    if (!data) return <div className="p-4 text-center text-gray-500">Loading products...</div>;

    return (
        <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead className="bg-gray-50">
                                {table.getHeaderGroups().map(headerGroup => (
                                    <tr key={headerGroup.id}>
                                        {headerGroup.headers.map(header => (
                                            <th
                                                key={header.id}
                                                scope="col"
                                                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 cursor-pointer select-none group"
                                                onClick={header.column.getToggleSortingHandler()}
                                            >
                                                <div className="flex items-center gap-2">
                                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                                    <span className="flex items-center rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                                        {{
                                                            asc: <ChevronUpIcon className="h-4 w-4 text-gray-500" />,
                                                            desc: <ChevronDownIcon className="h-4 w-4 text-gray-500" />,
                                                        }[header.column.getIsSorted()] ?? <ArrowsUpDownIcon className="h-4 w-4 text-gray-400" />}
                                                    </span>
                                                </div>
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {table.getRowModel().rows.map(row => (
                                    <tr key={row.id}>
                                        {row.getVisibleCells().map(cell => (
                                            <td key={cell.id} className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

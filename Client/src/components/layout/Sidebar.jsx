import React from 'react';
import {
    HomeIcon,
    ChartBarIcon,
    CubeIcon,
    CurrencyDollarIcon,
    DocumentChartBarIcon,
    Cog6ToothIcon,
    TagIcon,
    UsersIcon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useCurrency } from '../../context/CurrencyContext';

const navigation = [
    { name: 'Dashboard', href: '/', icon: HomeIcon },
    { name: 'Inventory', href: '/inventory', icon: CubeIcon },
    { name: 'Pricing Engine', href: '/pricing', icon: CurrencyDollarIcon },
    { name: 'Customers', href: '/customers', icon: UsersIcon },
    { name: 'Promotions', href: '/promotions', icon: TagIcon },
    { name: 'Analytics', href: '/analytics', icon: ChartBarIcon },
    { name: 'Reports', href: '/reports', icon: DocumentChartBarIcon },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function Sidebar() {
    const location = useLocation();
    const { formatCurrency } = useCurrency();

    return (
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-slate-900 px-6 pb-4 shadow-xl">
                <div className="flex h-16 shrink-0 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center gap-x-3"
                    >
                        <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                            <ChartBarIcon className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-white tracking-tight">RetailPulse</span>
                    </motion.div>
                </div>
                <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                            <ul role="list" className="-mx-2 space-y-1">
                                {navigation.map((item) => (
                                    <motion.li
                                        key={item.name}
                                        whileHover={{ x: 4 }}
                                        transition={{ type: 'spring', stiffness: 300 }}
                                    >
                                        <Link
                                            to={item.href}
                                            className={classNames(
                                                location.pathname === item.href
                                                    ? 'bg-slate-800 text-white shadow-md shadow-slate-900/10'
                                                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50',
                                                'group flex gap-x-3 rounded-lg p-2.5 text-sm leading-6 font-medium transition-all duration-200 ease-in-out'
                                            )}
                                        >
                                            <item.icon
                                                className={classNames(
                                                    location.pathname === item.href ? 'text-indigo-400' : 'text-slate-500 group-hover:text-indigo-400',
                                                    'h-5 w-5 shrink-0'
                                                )}
                                                aria-hidden="true"
                                            />
                                            {item.name}
                                        </Link>
                                    </motion.li>
                                ))}
                            </ul>
                        </li>

                        <li className="mt-auto">
                            <div className="block -mx-2 mb-2 p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                                <p className="text-xs text-slate-400 font-medium mb-2">Monthly Goal</p>
                                <div className="w-full bg-slate-700 rounded-full h-1.5 mb-2">
                                    <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: '75%' }}></div>
                                </div>
                                <div className="flex justify-between text-xs text-white">
                                    <span>{formatCurrency(124000)}</span>
                                    <span className="text-slate-400">Target: {formatCurrency(160000)}</span>
                                </div>
                            </div>

                            <Link
                                to="/settings"
                                className={`group -mx-2 flex gap-x-3 rounded-lg p-2.5 text-sm font-semibold leading-6 ${location.pathname === '/settings' ? 'bg-slate-800 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
                            >
                                <Cog6ToothIcon
                                    className={`h-5 w-5 shrink-0 ${location.pathname === '/settings' ? 'text-white' : 'text-slate-500 group-hover:text-white'}`}
                                    aria-hidden="true"
                                />
                                Settings
                            </Link>
                            <div className="h-px bg-slate-700/50 my-2 mx-[-8px]" />
                            <a
                                href="#"
                                className="group -mx-2 flex gap-x-3 rounded-lg p-2.5 text-sm font-semibold leading-6 text-slate-300 hover:bg-slate-800 hover:text-white"
                            >
                                <div className="h-6 w-6 rounded-full bg-indigo-500 flex items-center justify-center text-xs text-white shadow ring-2 ring-slate-900">
                                    JD
                                </div>
                                John Doe
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

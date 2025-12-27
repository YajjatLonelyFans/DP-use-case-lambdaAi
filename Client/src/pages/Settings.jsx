import React from 'react';
import { Switch } from '@headlessui/react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useCurrency } from '../context/CurrencyContext';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function Settings() {
    const { currency, toggleCurrency } = useCurrency();
    const isINR = currency === 'INR';

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div className="md:flex md:items-center md:justify-between">
                    <div className="min-w-0 flex-1">
                        <h2 className="text-2xl font-bold leading-7 text-slate-900 sm:truncate sm:text-3xl sm:tracking-tight">
                            Settings
                        </h2>
                    </div>
                </div>

                <div className="bg-white shadow sm:rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        <h3 className="text-base font-semibold leading-6 text-slate-900">General Preferences</h3>
                        <div className="mt-2 text-sm text-slate-500">
                            <p>Manage your display and regional preferences.</p>
                        </div>

                        <div className="mt-5 border-t border-slate-200">
                            <dl className="divide-y divide-slate-200">
                                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                                    <dt className="text-sm font-medium text-slate-500">Currency Display</dt>
                                    <dd className="mt-1 flex text-sm text-slate-900 sm:col-span-2 sm:mt-0">
                                        <div className="flex items-center gap-3">
                                            <span className={`text-sm font-medium ${!isINR ? 'text-indigo-600' : 'text-slate-500'}`}>USD ($)</span>
                                            <Switch
                                                checked={isINR}
                                                onChange={toggleCurrency}
                                                className={classNames(
                                                    isINR ? 'bg-indigo-600' : 'bg-slate-200',
                                                    'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
                                                )}
                                            >
                                                <span className="sr-only">Use INR</span>
                                                <span
                                                    aria-hidden="true"
                                                    className={classNames(
                                                        isINR ? 'translate-x-5' : 'translate-x-0',
                                                        'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                                                    )}
                                                />
                                            </Switch>
                                            <span className={`text-sm font-medium ${isINR ? 'text-indigo-600' : 'text-slate-500'}`}>INR (₹)</span>
                                        </div>
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

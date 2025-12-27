import React from 'react';
import { Switch } from '@headlessui/react';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function RulesList({ rules }) {
    if (!rules) return null;

    return (
        <div className="bg-white shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <div className="border-b border-gray-200 px-4 py-5 sm:px-6">
                <h3 className="text-base font-semibold leading-6 text-gray-900">Active Pricing Strategies</h3>
            </div>
            <ul role="list" className="divide-y divide-gray-100">
                {rules.map((rule) => (
                    <li key={rule.id} className="flex items-center justify-between gap-x-6 px-4 py-5 sm:px-6">
                        <div className="min-w-0">
                            <div className="flex items-start gap-x-3">
                                <p className="text-sm font-semibold leading-6 text-gray-900">{rule.name}</p>
                                <p className={classNames(
                                    rule.status === 'Active' ? 'text-green-700 bg-green-50 ring-green-600/20' :
                                        rule.status === 'Paused' ? 'text-yellow-800 bg-yellow-50 ring-yellow-600/20' :
                                            'text-gray-600 bg-gray-50 ring-gray-500/10',
                                    'rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset'
                                )}>
                                    {rule.status}
                                </p>
                            </div>
                            <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                                <p className="truncate">{rule.logic}</p>
                            </div>
                        </div>
                        <div className="flex flex-none items-center gap-x-4">
                            <div className="flex flex-col items-end">
                                <p className="text-sm leading-6 text-gray-900">{rule.products} products</p>
                                <p className="text-xs leading-5 text-gray-500">affected</p>
                            </div>
                            <Switch
                                checked={rule.status === 'Active'}
                                onChange={() => { }} // Dummy handler
                                className={classNames(
                                    rule.status === 'Active' ? 'bg-indigo-600' : 'bg-gray-200',
                                    'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
                                )}
                            >
                                <span className="sr-only">Toggle rule</span>
                                <span
                                    aria-hidden="true"
                                    className={classNames(
                                        rule.status === 'Active' ? 'translate-x-5' : 'translate-x-0',
                                        'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                                    )}
                                />
                            </Switch>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

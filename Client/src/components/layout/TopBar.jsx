import React, { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon, CalendarIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { BellIcon } from '@heroicons/react/24/outline';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function TopBar() {
    const [selectedStore, setSelectedStore] = useState('Flagship Store (NY)');

    return (
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-slate-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                <form className="relative flex flex-1" action="#" method="GET">
                    <label htmlFor="search-field" className="sr-only">
                        Search
                    </label>
                    <MagnifyingGlassIcon
                        className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-slate-400"
                        aria-hidden="true"
                    />
                    <input
                        id="search-field"
                        className="block h-full w-full border-0 py-0 pl-8 pr-0 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm bg-transparent"
                        placeholder="Search catalog, orders, or customers (Press '/')..."
                        type="search"
                        name="search"
                    />
                </form>
                <div className="flex items-center gap-x-4 lg:gap-x-6">

                    {/* Date Picker Mock */}
                    <div className="hidden sm:flex items-center gap-x-2 px-3 py-1.5 bg-white rounded-md border border-slate-300 shadow-sm cursor-pointer hover:bg-slate-50 transition-colors">
                        <CalendarIcon className="h-4 w-4 text-slate-500" />
                        <span className="text-sm text-slate-700 font-medium">Last 30 Days</span>
                        <ChevronDownIcon className="h-4 w-4 text-slate-400" />
                    </div>

                    <div className="h-6 w-px bg-slate-200" aria-hidden="true" />

                    {/* Store Selector */}
                    <Menu as="div" className="relative">
                        <Menu.Button className="-m-1.5 flex items-center p-1.5 hover:bg-slate-50 rounded-md transition-colors">
                            <span className="sr-only">Open user menu</span>
                            <span className="hidden lg:flex lg:items-center">
                                <span className="ml-4 text-sm font-semibold leading-6 text-slate-900" aria-hidden="true">
                                    {selectedStore}
                                </span>
                                <ChevronDownIcon className="ml-2 h-5 w-5 text-slate-400" aria-hidden="true" />
                            </span>
                        </Menu.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute right-0 z-10 mt-2.5 w-56 origin-top-right rounded-lg bg-white py-2 shadow-xl ring-1 ring-slate-900/5 focus:outline-none">
                                {['Flagship Store (NY)', 'Online Store', 'West Coast Warehouse'].map((item) => (
                                    <Menu.Item key={item}>
                                        {({ active }) => (
                                            <button
                                                onClick={() => setSelectedStore(item)}
                                                className={classNames(
                                                    active ? 'bg-slate-50 text-indigo-600' : 'text-slate-700',
                                                    'block w-full text-left px-4 py-2 text-sm leading-6'
                                                )}
                                            >
                                                {item}
                                            </button>
                                        )}
                                    </Menu.Item>
                                ))}
                            </Menu.Items>
                        </Transition>
                    </Menu>

                    <button type="button" className="-m-2.5 p-2.5 text-slate-400 hover:text-slate-600 relative">
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                        <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
                    </button>
                </div>
            </div>
        </div>
    );
}

import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navItems = [
        {
            name: "Dashboard",
            route: "dashboard.index",
            icon: (
                <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeWidth={2}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                </svg>
            ),
        },
        {
            name: "Projects",
            route: "projects.index",
            icon: (
                <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeWidth={2}
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                </svg>
            ),
        },
        {
            name: "My Tasks",
            route: "tasks.index",
            icon: (
                <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                    />
                </svg>
            ),
        },
        {
            name: "Setting",
            route: "setting.index",
            icon: (
                <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeWidth={2}
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                </svg>
            ),
        },
    ];

    return (
        <div className="min-h-screen bg-slate-100">
            {/* Backdrop */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-20 bg-black/50 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-slate-900 shadow-xl transition-transform duration-300 lg:translate-x-0 ${
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                {/* Logo */}
                <div className="flex h-16 items-center justify-between border-b border-slate-800 bg-slate-950 px-4">
                    <Link href="/" className="flex items-center">
                        <ApplicationLogo className="h-9 w-auto fill-current text-white" />
                    </Link>

                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="p-1 text-slate-400 hover:text-white lg:hidden"
                    >
                        ✕
                    </button>
                </div>

                {/* Navigation */}
                <nav className="mt-5 px-2 space-y-1">
                    {navItems.map((item, i) => {
                        const active = route().current(item.route);
                        const Icon = item.icon;

                        return (
                            <Link
                                key={i}
                                href={route(item.route)}
                                className={`group flex items-center rounded-lg px-4 py-2 transition-all duration-200
                                    ${
                                        active
                                            ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md"
                                            : "text-slate-300 hover:bg-slate-800 hover:text-white"
                                    }`}
                            >
                                <span className="mr-3 opacity-70 group-hover:opacity-100">
                                    {item.icon}
                                </span>
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                {/* User */}
                {/* User */}
                <div className="absolute bottom-0 w-full border-t border-slate-800 p-4">
                    <div className="flex items-center mb-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-700 text-white font-semibold">
                            {user.name.charAt(0).toUpperCase()}
                        </div>

                        <div className="ml-3">
                            <div className="text-sm font-medium text-white">
                                {user.name}
                            </div>
                            <div className="text-xs text-slate-400">
                                {user.email}
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-1">
                        <Link
                            href={route("profile.edit")}
                            className="flex items-center rounded-md px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition"
                        >
                            Profile
                        </Link>

                        <Link
                            href={route("logout")}
                            method="post"
                            as="button"
                            className="flex w-full items-center rounded-md px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition"
                        >
                            Logout
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Main */}
            <div className="lg:pl-64">
                {/* Mobile Navbar */}
                <div className="sticky top-0 z-10 bg-white shadow-sm lg:hidden">
                    <div className="flex h-16 items-center justify-between px-4">
                        <button onClick={() => setSidebarOpen(true)}>☰</button>

                        <ApplicationLogo className="h-8 w-auto" />

                        <div className="w-6" />
                    </div>
                </div>

                {/* Header */}
                {header && (
                    <header className="bg-white shadow">
                        <div className="mx-auto max-w-7xl px-4 py-6">
                            {header}
                        </div>
                    </header>
                )}

                {/* Content */}
                <main className="py-6 px-4">{children}</main>
            </div>
        </div>
    );
}

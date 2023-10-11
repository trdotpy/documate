import React from "react";
import {
    Home,
    Users,
    Box,
    Settings,
    Mail,
    MoreHorizontal,
    MessagesSquare,
    Blocks,
} from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

type Props = {};

export default function SidebarMenu({}: Props) {
    return (
        <div>
            <aside
                id="sidebar"
                className="fixed left-0 top-0 z-40 h-screen transition-transform"
                aria-label="Sidebar"
            >
                <div className="flex h-full flex-col items-center overflow-y-auto border-r border-slate-200 bg-gray-900 px-3 py-4 dark:border-slate-700 dark:bg-slate-900">
                    <Link
                        href="/"
                        className="mb-8 flex items-center rounded-lg px-3 py-2 text-gray-200 dark:text-white"
                    >
                        <Blocks size={24} />
                    </Link>

                    <ul className="space-y-8 text-sm font-medium">
                        <li>
                            <a
                                href="/dashboard"
                                className="flex items-center rounded-lg px-3 py-2 text-slate-200 hover:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
                            >
                                <Home size={24} />
                            </a>
                        </li>
                        <li>
                            <a
                                href="/dashboard"
                                className="flex items-center rounded-lg px-3 py-2 text-slate-200 hover:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
                            >
                                <MessagesSquare size={24} />
                            </a>
                        </li>

                        <li>
                            <a
                                href="/settings"
                                className="flex items-center rounded-lg px-3 py-2 text-slate-200 hover:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
                            >
                                <Settings size={24} />
                            </a>
                        </li>
                    </ul>
                    <div className="mt-auto flex">
                        <div className="flex w-full justify-between">
                            <UserButton afterSignOutUrl="/" />
                        </div>
                    </div>
                </div>
            </aside>
        </div>
    );
}

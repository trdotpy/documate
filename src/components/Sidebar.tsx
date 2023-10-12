import { Blocks, Home, Info, LogOut, Settings } from "lucide-react";
import Link from "next/link";
import React from "react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface SidebarProps {}

export default function Sidebar({}: SidebarProps) {
    return (
        <div className="flex h-screen w-16 flex-col justify-between border-e bg-white">
            <div>
                <Link
                    href="/"
                    className="mt-4 inline-flex h-16 w-16 items-center justify-center"
                >
                    <span className="grid h-10 w-10 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600">
                        <Blocks aria-label="logo" />
                    </span>
                </Link>

                <div className="border-t border-gray-100">
                    <TooltipProvider>
                        <div className="px-2">
                            <ul className="space-y-6 border-t border-gray-100 pt-4">
                                <li>
                                    <Tooltip delayDuration={100}>
                                        <TooltipTrigger asChild>
                                            <Link
                                                href="/dashboard"
                                                className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                                            >
                                                <Home
                                                    className="h-5 w-5 opacity-75"
                                                    aria-label="dashboard"
                                                />

                                                <TooltipContent className="absolute left-7">
                                                    Dashboard
                                                </TooltipContent>
                                            </Link>
                                        </TooltipTrigger>
                                    </Tooltip>
                                </li>

                                <li>
                                    <Tooltip delayDuration={100}>
                                        <TooltipTrigger asChild>
                                            <Link
                                                href="/docs"
                                                className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                                            >
                                                <Info
                                                    className="h-5 w-5 opacity-75"
                                                    aria-label="documentation"
                                                />

                                                <TooltipContent className="absolute left-7">
                                                    Docs
                                                </TooltipContent>
                                            </Link>
                                        </TooltipTrigger>
                                    </Tooltip>
                                </li>

                                <li>
                                    <Tooltip delayDuration={100}>
                                        <TooltipTrigger asChild>
                                            <Link
                                                href="/settings"
                                                className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                                            >
                                                <Settings
                                                    className="h-5 w-5 opacity-75"
                                                    aria-label="account-settings"
                                                />

                                                <TooltipContent className="absolute left-7">
                                                    Account
                                                </TooltipContent>
                                            </Link>
                                        </TooltipTrigger>
                                    </Tooltip>
                                </li>
                            </ul>
                        </div>
                    </TooltipProvider>
                </div>
            </div>

            <div className="sticky inset-x-0 bottom-0 border-t border-gray-100 bg-white p-2">
                <form action="/logout">
                    <button
                        type="submit"
                        className="group relative flex w-full justify-center rounded-lg px-2 py-1.5 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                    >
                        <LogOut
                            className="h-5 w-5 opacity-75"
                            aria-label="logout"
                        />

                        <span className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100">
                            Logout
                        </span>
                    </button>
                </form>
            </div>
        </div>
    );
}

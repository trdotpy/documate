import { Blocks, Home, Info, LogOut, Settings } from "lucide-react";
import Link from "next/link";
import React from "react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { SignOutButton } from "@clerk/nextjs";

interface SidebarProps {}

export default function Sidebar({}: SidebarProps) {
    return (
        <div className="flex min-h-screen w-16 flex-col justify-between border-r border-gray-300 bg-white">
            <div>
                <Link
                    href="/"
                    className="mt-1 inline-flex h-16 w-16 items-center justify-center"
                >
                    <span className="grid h-10 w-10 place-content-center rounded-lg bg-gray-200 text-xs text-gray-900">
                        <Blocks aria-label="documate-logo" />
                    </span>
                </Link>

                <div className="border-t border-gray-300">
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
                <div className="group relative flex w-full cursor-pointer justify-center rounded-lg px-2 py-1.5 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700">
                    <TooltipProvider>
                        <Tooltip delayDuration={100}>
                            <TooltipTrigger asChild>
                                <div>
                                    <SignOutButton>
                                        <LogOut
                                            className="h-5 w-5 opacity-75"
                                            aria-label="logout"
                                        />
                                    </SignOutButton>
                                    <TooltipContent className="absolute left-7 whitespace-nowrap">
                                        Sign Out
                                    </TooltipContent>
                                </div>
                            </TooltipTrigger>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>
        </div>
    );
}

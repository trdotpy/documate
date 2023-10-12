import { Blocks, Home, Info, LogOut, Settings } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {};

export default function Sidebar({}: Props) {
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
                    <div className="px-2">
                        <ul className="space-y-6 border-t border-gray-100 pt-4">
                            <li>
                                <a
                                    href=""
                                    className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                                >
                                    <Home
                                        className="h-5 w-5 opacity-75"
                                        aria-label="dashboard"
                                    />

                                    <span className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100">
                                        Dashboard
                                    </span>
                                </a>
                            </li>

                            <li>
                                <a
                                    href=""
                                    className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                                >
                                    <Info
                                        className="h-5 w-5 opacity-75"
                                        aria-label="documentation"
                                    />

                                    <span className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100">
                                        Docs
                                    </span>
                                </a>
                            </li>

                            <li>
                                <a
                                    href=""
                                    className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                                >
                                    <Settings
                                        className="h-5 w-5 opacity-75"
                                        aria-label="account-settings"
                                    />

                                    <span className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100">
                                        Account Settings
                                    </span>
                                </a>
                            </li>
                        </ul>
                    </div>
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

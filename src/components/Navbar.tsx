"use client";

import { UserButton } from "@clerk/nextjs";
import React from "react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import LayoutWrapper from "./LayoutWrapper";
import { Blocks } from "lucide-react";

interface Props {
    userId: string | null;
}

export default function Navbar({ userId }: Props) {
    return (
        <nav className="h-18 sticky inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-transparent backdrop-blur-lg transition-all">
            <LayoutWrapper className="flex items-center justify-between ">
                <div className="flex items-center justify-between gap-x-3 text-gray-900">
                    <Link
                        href="/"
                        className="flex items-center justify-between gap-x-3 text-gray-900"
                    >
                        <Blocks className="h-6 w-6" />
                        <h1 className="font-medium text-white">DocuMate</h1>
                    </Link>
                    <div className="ml-2">
                        <Link
                            href="/pricing"
                            className={buttonVariants({
                                variant: "ghost",
                                size: "sm",
                            })}
                        >
                            Pricing
                        </Link>
                        <a
                            href="https://github.com/trdotpy"
                            className={buttonVariants({
                                variant: "ghost",
                                size: "sm",
                            })}
                        >
                            Documentation
                        </a>
                    </div>
                </div>

                <div className="flex items-center justify-between space-x-2 py-4">
                    <div>
                        {userId ? (
                            <div className="flex items-center justify-between space-x-4">
                                <Link
                                    href="/dashboard"
                                    className={buttonVariants({
                                        size: "sm",
                                    })}
                                >
                                    Dashboard
                                </Link>
                                <UserButton afterSignOutUrl="/" />
                            </div>
                        ) : (
                            <Link
                                href="/sign-in"
                                className={buttonVariants({
                                    size: "sm",
                                })}
                            >
                                Get Started
                            </Link>
                        )}
                    </div>
                </div>
            </LayoutWrapper>
        </nav>
    );
}

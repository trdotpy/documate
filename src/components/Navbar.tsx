"use client";

import { ClerkLoading, UserButton } from "@clerk/nextjs";
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
        <nav className="h-18 sticky inset-x-0 top-0 z-30 w-full border-b border-gray-200 backdrop-blur-lg transition-all">
            <LayoutWrapper className="flex items-center justify-between ">
                <Link
                    href="/"
                    className="flex items-center justify-between gap-x-3"
                >
                    <Blocks className="h-6 w-6" />
                    <h1 className="text-xl font-medium text-gray-100">
                        DocuMate
                    </h1>
                </Link>

                <div className="flex items-center justify-between space-x-2 py-4">
                    <Link
                        href="/pricing"
                        className={buttonVariants({
                            variant: "ghost",
                            size: "sm",
                        })}
                    >
                        Pricing
                    </Link>
                    <Link
                        href="/pricing"
                        className={buttonVariants({
                            variant: "ghost",
                            size: "sm",
                        })}
                    >
                        Documentation
                    </Link>

                    <div>
                        {userId ? (
                            <UserButton afterSignOutUrl="/" />
                        ) : (
                            <Link
                                href="/dashboard"
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

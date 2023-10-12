"use client";

import { UserButton } from "@clerk/nextjs";
import React from "react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import LayoutWrapper from "./LayoutWrapper";
import { Blocks } from "lucide-react";
import { Separator } from "./ui/separator";

interface Props {
    userId: string | null;
}

export default function Navbar({ userId }: Props) {
    return (
        <nav className="h-18 sticky inset-x-0 top-0 w-full border-b border-gray-300 backdrop-blur-lg transition-all">
            <div className="flex items-center justify-between px-6">
                <div className="flex items-center justify-between gap-x-3 text-gray-900">
                    <Link href="/">
                        <h1 className="font-medium text-white">DocuMate</h1>
                    </Link>
                </div>

                <div className="flex items-center justify-between gap-x-2 py-4">
                    <div className="flex items-center justify-between gap-x-2">
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
                            href="/"
                            className={buttonVariants({
                                variant: "ghost",
                                size: "sm",
                            })}
                        >
                            Documentation
                        </Link>
                    </div>
                    <div>
                        {userId ? (
                            <div className="flex items-center justify-between gap-x-4">
                                <Link
                                    href="/dashboard"
                                    className={buttonVariants({
                                        variant: "outline",
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
                                    variant: "outline",
                                    size: "sm",
                                })}
                            >
                                Get Started
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

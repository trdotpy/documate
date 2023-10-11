"use client";

import { UserButton, auth } from "@clerk/nextjs";
import React from "react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import LayoutWrapper from "./LayoutWrapper";
import { Blocks } from "lucide-react";

type Props = { userId?: string | null };

export default function Navbar({ userId }: Props) {
    return (
        <LayoutWrapper className="mb-4 max-w-screen-2xl">
            <div className="flex items-center justify-between border-b border-gray-200">
                <div className="flex items-center justify-between gap-x-3">
                    <Blocks className="mb-1 h-6 w-6" />
                    {/* <h1 className="text-xl font-medium text-gray-800">
                        DocuMate
                    </h1> */}
                </div>

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
                    <>
                        {!userId ? (
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
                    </>
                </div>
            </div>
        </LayoutWrapper>
    );
}

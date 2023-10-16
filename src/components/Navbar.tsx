"use client";

import { SignInButton, SignOutButton, UserButton } from "@clerk/nextjs";
import React from "react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { Blocks, ChevronDown } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { usePathname } from "next/navigation";

interface Props {
    userId: string | null;
}

export default function Navbar({ userId }: Props) {
    const pathname = usePathname();
    const isLanding = pathname === "/";

    return (
        <>
            {/* Mobile Navbar */}
            <nav className="h-18 sticky inset-x-0 top-0 block w-full border-b border-gray-300 py-4 backdrop-blur-lg transition-all sm:hidden">
                <div className="flex justify-center">
                    <Dialog>
                        <DialogTrigger className="flex items-center justify-center">
                            <Blocks />
                            <h1 className="ml-3 text-lg font-medium text-white">
                                DocuMate
                            </h1>
                            <ChevronDown className="ml-2 h-4 w-4" />
                        </DialogTrigger>
                        <DialogContent className="min-h-screen">
                            <ul className="flex-col justify-center text-center">
                                {userId ? (
                                    <div className="flex-col justify-between">
                                        <li>
                                            <Link
                                                href="/dashboard"
                                                className={buttonVariants({
                                                    variant: "ghost",
                                                    size: "lg",
                                                })}
                                            >
                                                Dashboard
                                            </Link>
                                        </li>
                                        <li>
                                            <SignOutButton>
                                                <p
                                                    className={buttonVariants({
                                                        variant: "ghost",
                                                        size: "lg",
                                                        className:
                                                            "cursor-pointer",
                                                    })}
                                                >
                                                    Sign out
                                                </p>
                                            </SignOutButton>
                                        </li>
                                    </div>
                                ) : (
                                    <div>
                                        <li>
                                            <SignInButton>
                                                <p
                                                    className={buttonVariants({
                                                        variant: "ghost",
                                                        size: "lg",
                                                        className:
                                                            "cursor-pointer",
                                                    })}
                                                >
                                                    Sign In
                                                </p>
                                            </SignInButton>
                                        </li>
                                        <li>
                                            <Link
                                                href="/sign-up"
                                                className={buttonVariants({
                                                    variant: "ghost",
                                                    size: "lg",
                                                })}
                                            >
                                                Get Started
                                            </Link>
                                        </li>
                                    </div>
                                )}
                                <li>
                                    <Link
                                        href="/pricing"
                                        className={buttonVariants({
                                            variant: "ghost",
                                            size: "lg",
                                        })}
                                    >
                                        Pricing
                                    </Link>
                                </li>
                                <li>
                                    <a
                                        href="https://github.com/trdotpy/documate"
                                        className={buttonVariants({
                                            variant: "ghost",
                                            size: "lg",
                                        })}
                                    >
                                        Documentation
                                    </a>
                                </li>
                            </ul>
                        </DialogContent>
                    </Dialog>
                </div>
            </nav>

            {/* Desktop Navbar */}
            <nav className="h-18 sticky inset-x-0 top-0 hidden w-full bg-transparent py-4 transition-all sm:block">
                <div className="flex items-center justify-between px-6">
                    <div className="flex items-center justify-between gap-x-2 text-gray-900">
                        <Link
                            href="/"
                            className={buttonVariants({
                                variant: "ghost",
                                size: "sm",
                                className: "flex items-center",
                            })}
                        >
                            <Blocks />
                            <h1 className="ml-3 text-lg font-medium text-white">
                                DocuMate
                            </h1>
                        </Link>
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
                            href="https://github.com/trdotpy/documate"
                            className={buttonVariants({
                                variant: "ghost",
                                size: "sm",
                            })}
                        >
                            Documentation
                        </a>
                    </div>

                    <div className="flex items-center justify-between gap-x-2">
                        <div>
                            {userId ? (
                                <div className="flex items-center justify-between gap-x-4">
                                    {isLanding && (
                                        <Link
                                            href="/dashboard"
                                            className={buttonVariants({
                                                variant: "outline",
                                                size: "sm",
                                            })}
                                        >
                                            Dashboard
                                        </Link>
                                    )}
                                    <UserButton afterSignOutUrl="/" />
                                </div>
                            ) : (
                                <div className="flex items-center justify-between gap-x-4">
                                    <Link
                                        href="/sign-in"
                                        className={buttonVariants({
                                            variant: "ghost",
                                            size: "sm",
                                        })}
                                    >
                                        Sign in
                                    </Link>
                                    <Link
                                        href="/sign-up"
                                        className={buttonVariants({
                                            variant: "outline",
                                            size: "sm",
                                        })}
                                    >
                                        Get Started
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}

"use client";

import { SignInButton, SignOutButton, UserButton } from "@clerk/nextjs";
import React from "react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { Blocks, ChevronDown, ListMinus, Text, TextQuote } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "./ui/separator";
import { usePathname } from "next/navigation";

interface Props {
    userId: string | null;
}

export default function Navbar({ userId }: Props) {
    const pathname = usePathname();
    const isDashboard = pathname === "/dashboard";

    return (
        <>
            {/* Mobile Navbar */}
            <nav className="h-18 block w-full border-b border-gray-200 py-4 backdrop-blur-lg transition-all sm:hidden">
                <div className="flex justify-center">
                    <Dialog>
                        <DialogTrigger className="flex items-center justify-center">
                            <h2 className="ml-3 text-base font-medium uppercase tracking-wide text-white">
                                DocuMat
                            </h2>
                            <ListMinus className="h-4 w-4" />
                            <ChevronDown className="ml-2 h-4 w-4" />
                        </DialogTrigger>

                        <DialogContent>
                            <Link
                                href="/"
                                className={buttonVariants({
                                    variant: "ghost",
                                    size: "sm",
                                })}
                            >
                                <Blocks className="h-8 w-8" />
                            </Link>
                            <Separator />
                            <ul className="flex-col justify-center text-center">
                                {userId ? (
                                    <div className="flex-col justify-between">
                                        <li>
                                            <Link
                                                href="/dashboard"
                                                className={buttonVariants({
                                                    variant: "ghost",
                                                    size: "lg",
                                                    className: "text-xl",
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
                                                            "cursor-pointer text-xl",
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
                                                            "cursor-pointer text-xl",
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
                                                    className: "text-xl",
                                                })}
                                            >
                                                Sign up
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
                                            className: "text-xl",
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
                                            className: "text-xl",
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
            <nav className="h-18 sticky inset-x-0 top-0 hidden w-full py-4 transition-all sm:block">
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
                            <h1 className="ml-3 text-base font-medium uppercase tracking-wide text-white">
                                DocuMat
                            </h1>
                            <ListMinus className="h-4 w-4" />
                        </Link>
                    </div>

                    <div>
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
                        <Link
                            href="/pricing"
                            className={buttonVariants({
                                variant: "ghost",
                                size: "sm",
                            })}
                        >
                            About
                        </Link>
                    </div>

                    <div className="flex items-center justify-between gap-x-2">
                        <div>
                            {userId ? (
                                <div className="flex items-center justify-between gap-x-4">
                                    {!isDashboard && (
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
                                            variant: "outline",
                                            size: "sm",
                                        })}
                                    >
                                        Sign in
                                    </Link>
                                    <Link
                                        href="/sign-up"
                                        className={buttonVariants({
                                            variant: "default",
                                            size: "sm",
                                        })}
                                    >
                                        Sign up for free
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

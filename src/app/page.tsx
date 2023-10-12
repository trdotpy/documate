import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import LayoutWrapper from "@/components/LayoutWrapper";

export default function Home() {
    return (
        <LayoutWrapper className="mb-12 mt-28 flex flex-col items-center justify-center text-center sm:mt-40">
            <div className="mx-auto mb-4 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-200 bg-white px-7 py-2 shadow-md backdrop-blur transition-all hover:border-gray-300 hover:bg-white/50">
                <p className="text-sm font-semibold text-gray-700">
                    Available Now
                </p>
            </div>
            <h1 className="max-w-4xl text-5xl font-medium md:text-6xl lg:text-7xl">
                Unlock the <span className="text-blue-600">value</span> in your
                files with <span className="text-blue-600">AI</span>
            </h1>

            <p className="mt-5 max-w-prose text-zinc-700 sm:text-lg">
                Our platform empowers you to efficiently handle PDF documents
                through intuitive AI-driven conversations. Get more done in less
                time.
            </p>

            <Link
                className={buttonVariants({
                    size: "lg",
                    className: "mt-5",
                })}
                href="/dashboard"
                target="_blank"
            >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
        </LayoutWrapper>
    );
}

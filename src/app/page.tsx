import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import LayoutWrapper from "@/components/LayoutWrapper";

export default function Home() {
    return (
        <LayoutWrapper className="flex h-[calc(100vh-72px)] flex-col items-center justify-center text-center">
            <div className="bg-white-50 absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]" />

            <div className="mb-4 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-100 bg-white px-7 py-2 shadow-md backdrop-blur transition-all hover:border-gray-300 hover:bg-white/50">
                <p className="text-sm text-gray-800">Now available for free!</p>
            </div>

            <div>
                <h1 className="max-w-4xl text-5xl font-medium md:text-6xl lg:text-7xl">
                    Unlock the <span className="text-blue-600"> Potential</span>{" "}
                    in Your Documents
                </h1>
                <p className="mt-5 max-w-prose text-zinc-700  sm:text-lg">
                    Whether it&apos;s contracts, reports, or any other PDF file,
                </p>
                <p className="max-w-prose text-zinc-700  sm:text-lg">
                    DocuMate can bring new life and utility to your documents.
                </p>
            </div>

            <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-x-6">
                <Link
                    className={buttonVariants({
                        variant: "default",
                        size: "lg",
                        className: "mt-5",
                    })}
                    href="/dashboard"
                    target="_blank"
                >
                    <p className="text-lg font-semibold">Get Started</p>
                </Link>
                <a
                    className={buttonVariants({
                        variant: "outline",
                        size: "lg",
                        className: "mt-5",
                    })}
                    href="https://github.com/trdotpy/documate"
                    target="_blank"
                >
                    <p className="text-lg font-semibold">Learn More</p>
                </a>
            </div>
        </LayoutWrapper>
    );
}

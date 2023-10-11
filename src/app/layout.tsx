import { cn } from "@/lib/utils";
import "./globals.css";
import type { Metadata } from "next";
import { Inter, Figtree } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import { Toaster } from "sonner";
import Providers from "@/components/Providers";

import "react-loading-skeleton/dist/skeleton.css";
import "simplebar-react/dist/simplebar.min.css";

const inter = Inter({ subsets: ["latin"] });

const figtree = Figtree({
    weight: ["300", "400", "500", "700"],
    subsets: ["latin"],
});

type Props = {
    children: React.ReactNode;
};

export const metadata: Metadata = {
    title: "DocuMate AI",
    description: "Analyze PDFs with AI",
};

export default function RootLayout({ children }: Props) {
    return (
        <ClerkProvider>
            <Providers>
                <html lang="en" className="light">
                    <body
                        className={cn(
                            "min-h-screen bg-gray-50 antialiased",
                            figtree.className
                        )}
                    >
                        <Navbar />
                        {children}
                        <Toaster />
                    </body>
                </html>
            </Providers>
        </ClerkProvider>
    );
}

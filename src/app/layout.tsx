import { cn } from "@/lib/utils";
import "./globals.css";
import type { Metadata } from "next";
import { Nunito_Sans, Figtree } from "next/font/google";
import { ClerkProvider, auth } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import { Toaster } from "sonner";
import Providers from "@/components/Providers";

import "react-loading-skeleton/dist/skeleton.css";
import "simplebar-react/dist/simplebar.min.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

const nunitoSans = Nunito_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
});

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
    const { userId } = auth();

    return (
        <ClerkProvider>
            <Providers>
                <html lang="en" className="light">
                    <body
                        className={cn(
                            "min-h-screen antialiased",
                            nunitoSans.className
                        )}
                    >
                        <Navbar userId={userId} />
                        {children}
                        <Toaster />
                    </body>
                </html>
            </Providers>
        </ClerkProvider>
    );
}

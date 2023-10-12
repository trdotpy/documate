import { cn } from "@/lib/utils";
import { File } from "@prisma/client";
import { Message } from "ai/react";
import { Loader2 } from "lucide-react";
import React from "react";
import PDFUploader from "../PDFUploader";

interface Props {
    messages: Message[];
    isLoading?: boolean;
    isLoadingFiles: boolean;
    isPDFSelected: boolean;
    files: File[];
}

export default function MessageList({
    messages,
    isPDFSelected,
    isLoading,
    files,
    isLoadingFiles,
}: Props) {
    if (isLoadingFiles || (isPDFSelected && isLoading))
        return (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <Loader2 className="h-12 w-12 animate-spin" />
            </div>
        );

    if (!isPDFSelected && messages.length < 1)
        return (
            <div className="relative flex-1">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                    <div className="flex flex-col items-center gap-2 text-center text-gray-600">
                        <h1 className="text-xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
                            Let&apos;s get started!
                        </h1>
                        {files.length === 0 ? (
                            <div className="mt-4">
                                <PDFUploader />
                            </div>
                        ) : (
                            <h3 className="text-xl font-semibold">
                                Choose a file to begin.
                            </h3>
                        )}
                    </div>
                </div>
            </div>
        );

    if (isPDFSelected && messages.length < 1)
        return (
            <div className="relative flex-1">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                    <div className="mt-16 flex flex-col items-center gap-2 text-center text-gray-600">
                        <h3 className="text-xl font-semibold">
                            What do you want to know?
                        </h3>
                        <p>Ask your question below to begin.</p>
                    </div>
                </div>
            </div>
        );
    return (
        <div className="flex flex-col gap-2 px-4">
            {messages.map((message) => {
                return (
                    <div
                        key={message.id}
                        className={cn("my-4 flex gap-3 text-sm text-gray-300", {
                            "justify-end": message.role === "user",
                            "justify-start": message.role === "assistant",
                        })}
                    >
                        <div
                            className={cn(
                                "rounded px-3 py-1 text-sm text-gray-700 shadow-md ring-1 ring-gray-900/10",
                                {
                                    "bg-[#252527] text-white":
                                        message.role === "user",
                                }
                            )}
                        >
                            <p className="leading-relaxed">
                                <span
                                    className={
                                        message.role === "user"
                                            ? "block text-right font-bold text-gray-700"
                                            : "block text-left font-bold text-gray-700"
                                    }
                                >
                                    {message.role === "user"
                                        ? ""
                                        : message.role === "assistant"
                                        ? "DocuMate"
                                        : ""}{" "}
                                </span>

                                {message.content}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

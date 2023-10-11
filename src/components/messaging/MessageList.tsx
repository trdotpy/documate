import { cn } from "@/lib/utils";
import { Message } from "ai/react";
import React from "react";

interface Props {
    messages: Message[];
    isLoading?: boolean;
}

export default function MessageList({ messages }: Props) {
    return (
        <>
            {messages.length < 1 && (
                <div className="relative flex-1">
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                        <div className="mb-20 mt-16 flex flex-col items-center gap-2 text-center text-gray-600">
                            <h3 className="text-xl font-semibold">
                                Send a question below
                            </h3>
                            <p>Lorem ipsum dolor, sit amet consectetur</p>
                        </div>
                    </div>
                </div>
            )}
            <div className="flex flex-col gap-2 px-4">
                {messages.map((message) => {
                    return (
                        <div
                            key={message.id}
                            className={cn(
                                "my-4 flex gap-3 text-sm text-gray-300",
                                {
                                    "justify-end": message.role === "user",
                                    "justify-start":
                                        message.role === "assistant",
                                }
                            )}
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
                                            : "DocuMate"}{" "}
                                    </span>
                                    {message.content}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}

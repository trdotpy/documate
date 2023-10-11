import React from "react";
import { Textarea } from "@/components/ui/textarea";
import ResizeTextarea from "react-textarea-autosize";
import { Button } from "../ui/button";

type Props = {};

export default function MessageInput({}: Props) {
    return (
        <div className="flex h-screen flex-col bg-white p-6">
            {/* Header */}
            <div className="flex flex-col space-y-1.5 pb-6">
                <h2 className="text-lg font-semibold tracking-tight">
                    Chatbot
                </h2>
                <p className="text-sm leading-3 text-[#6b7280]">
                    Powered by OpenAI
                </p>
            </div>

            {/* Message List */}

            {/* Chat Container */}
            <div className="flex-1 overflow-y-auto pr-4">
                {/* Chat Message AI */}
                <div className="my-4 flex gap-3 text-sm text-gray-600">
                    <p className="leading-relaxed">
                        <span className="block font-bold text-gray-700">
                            AI{" "}
                        </span>
                        Hi, how can I help you today?
                    </p>
                </div>

                {/* User Chat Message */}
                <div className="my-4 flex gap-3 text-sm text-gray-600">
                    <p className="leading-relaxed">
                        <span className="block font-bold text-gray-700">
                            You{" "}
                        </span>
                        User Message
                    </p>
                </div>

                {/* Ai Chat Message */}
                <div className="my-4 flex gap-3 text-sm text-gray-600">
                    <p className="leading-relaxed">
                        <span className="block font-bold text-gray-700">
                            AI{" "}
                        </span>
                        Sorry, I couldn't find any information in the
                        documentation about that. Expect the answer to be less
                        accurate. I could not find the answer to this in the
                        verified sources.
                    </p>
                </div>
            </div>

            {/* Input box */}
            <div className="flex items-center">
                <form className="flex w-full items-center justify-center space-x-2">
                    <input
                        className="flex h-10 w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm text-[#030712] placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#9ca3af] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Type your message"
                        value=""
                    />
                    <button className="inline-flex h-10 items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-[#f9fafb] hover:bg-[#111827E6] disabled:pointer-events-none disabled:opacity-50">
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
}

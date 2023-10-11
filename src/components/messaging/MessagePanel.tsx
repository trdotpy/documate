import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Message, useChat } from "ai/react";
import MessageList from "./MessageList";
import { Settings, Settings2, Trash2 } from "lucide-react";
import { Card } from "../ui/card";
import MessageInput from "./MessageInput";
import axios from "axios";

interface Props {
    fileName: string;
    fileId: string;
    isPDFSelected: boolean;
}

export default function MessagePanel({
    fileName,
    fileId,
    isPDFSelected,
}: Props) {
    const { input, handleInputChange, handleSubmit, messages } = useChat({
        api: "/api/message",
        body: {
            fileId,
        },
    });

    return (
        <div className="relative w-full p-4">
            <div className="flex min-h-[600px] flex-col p-6">
                {/* Messages List */}
                <MessageList
                    messages={messages}
                    isPDFSelected={isPDFSelected}
                />

                {/* Message Input */}
                <div className="absolute inset-x-0 bottom-5 px-6 py-2">
                    <form
                        className="flex w-full items-center justify-center space-x-2"
                        onSubmit={handleSubmit}
                        id="message-input"
                    >
                        <Input
                            className="flex h-10 w-full rounded-md border border-gray-800 bg-transparent px-3 py-2 text-sm text-gray-800 placeholder-gray-800 focus:outline-none focus:ring-2 focus:ring-[#9ca3af] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Ask anything"
                            value={input}
                            onChange={handleInputChange}
                        />
                        <Button className="inline-flex h-10 items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-gray-200 hover:bg-[#111827E6] disabled:pointer-events-none disabled:opacity-50">
                            Send
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}

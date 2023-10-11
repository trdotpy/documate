import { ReactNode, createContext, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";

type StreamResponse = {
    addMessage: () => void;
    message: string;
    handleInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    isLoading: boolean;
};

export const MessageContext = createContext<StreamResponse>({
    addMessage: () => {},
    message: "",
    handleInputChange: () => {},
    isLoading: false,
});

interface Props {
    fileId: string;
    children: ReactNode;
}

export const ChatContextProvider = ({ fileId, children }: Props) => {
    const [message, setMessage] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const backupMessage = useRef("");

    const { mutate: sendMessage } = useMutation({
        mutationFn: async ({ message }: { message: string }) => {
            try {
                const response = await fetch("/api/message", {
                    method: "POST",
                    body: JSON.stringify({
                        fileId,
                        message,
                    }),
                });

                if (!response.ok) {
                    throw new Error("Failed to send message");
                }

                return response.body;
            } catch (error) {
                throw new Error("Failed to send message");
            }
        },
        onMutate: async ({ message }) => {
            backupMessage.current = message;
            setMessage("");

            setIsLoading(true);

            return {};
        },
        onSuccess: async () => {
            setIsLoading(false);
        },
        onError: (_, __, context) => {
            setMessage(backupMessage.current);
        },
        onSettled: async () => {
            setIsLoading(false);
        },
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);
    };

    const addMessage = () => sendMessage({ message });

    return (
        <MessageContext.Provider
            value={{
                addMessage,
                message,
                handleInputChange,
                isLoading,
            }}
        >
            {children}
        </MessageContext.Provider>
    );
};

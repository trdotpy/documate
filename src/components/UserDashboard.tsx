"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import MessagePanel from "@/components/messaging/MessagePanel";
import PDFViewer from "@/components/PDFViewer";
import { useQuery } from "@tanstack/react-query";
import FileList from "@/components/FileList";

interface PageProps {
    isSubscribed: boolean;
}

export default function UserDashboard({ isSubscribed }: PageProps) {
    const router = useRouter();
    const { user } = useUser();
    const [selectedFileUrl, setSelectedFileUrl] = React.useState("");
    const [selectedFileName, setSelectedFileName] = React.useState("");
    const [selectedFileId, setSelectedFileId] = React.useState("");
    const [isPDFSelected, setIsPDFSelected] = React.useState(false);

    const userFirstName = user?.firstName ?? null;

    const { data, isLoading } = useQuery({
        queryKey: ["files"],
        queryFn: async () => {
            const response = await axios.get("/api/files");
            return response.data;
        },
    });

    // Update URL without redirecting
    React.useEffect(() => {
        const newUrl = `/dashboard/${selectedFileId}`;
        history.pushState(null, "", newUrl);
        setSelectedFileId(selectedFileId);
    }, [selectedFileId]);

    // Function to handle unselecting the file
    const handleReturnToDashboard = () => {
        // Update the URL to go back to the dashboard
        history.pushState(null, "", "/dashboard");

        // Clear the selected file information
        setSelectedFileUrl("");
        setSelectedFileName("");
        setSelectedFileId("");
        setIsPDFSelected(false);
    };

    return (
        <div className="flex-col border-t border-gray-100 md:flex">
            <div className="flex justify-between">
                {/* File List */}
                {!isPDFSelected && (
                    <div className="h-full">
                        {!isPDFSelected && (
                            <FileList
                                files={data}
                                onFileSelect={(file) => {
                                    setSelectedFileUrl(file.url);
                                    setIsPDFSelected(true);
                                    setSelectedFileName(file.name);
                                    setSelectedFileId(file.id);
                                }}
                                selectedFileId={selectedFileId}
                                isLoading={isLoading}
                                isSubscribed={isSubscribed}
                            />
                        )}
                    </div>
                )}

                {/* Message Panel */}
                <div className="flex-1 border-l border-gray-100">
                    <div className="h-[calc(100vh-72px)] flex-col sm:flex sm:flex-row">
                        {isPDFSelected && (
                            <PDFViewer
                                fileURL={selectedFileUrl}
                                fileName={selectedFileName}
                                handleReturnToDashboard={
                                    handleReturnToDashboard
                                }
                            />
                        )}
                        <MessagePanel
                            fileName={selectedFileName}
                            fileId={selectedFileId}
                            isPDFSelected={isPDFSelected}
                            files={data}
                            isLoadingFiles={isLoading}
                            userFirstName={userFirstName}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

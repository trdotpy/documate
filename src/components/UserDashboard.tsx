"use client";

import React from "react";
import LayoutWrapper from "@/components/LayoutWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, Folder, MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import MessagePanel from "@/components/messaging/MessagePanel";
import PDFUploader from "@/components/PDFUploader";
import { File } from "@prisma/client";
import PDFViewer from "@/components/PDFViewer";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";
import { formatDate } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import Sidebar from "@/components/Sidebar";
import FileList from "@/components/FileList";
import Navbar from "./Navbar";

interface PageProps {}

export default function UserDashboard({}: PageProps) {
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
        <>
            <div className="flex-col md:flex">
                <div className="flex justify-between">
                    {/* File List */}
                    {!isPDFSelected && (
                        <div className="h-full border-r border-black">
                            {/* <div className="mt-4 flex h-16 items-center px-4">
                                {userFirstName ? (
                                    <h2 className="text-3xl tracking-tight">
                                        {userFirstName}'s Files
                                    </h2>
                                ) : (
                                    <Skeleton height={50} width={350} />
                                )}
                            </div> */}
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
                                />
                            )}
                        </div>
                    )}

                    {/* Message Panel */}
                    <div className="flex-1">
                        {/* {isPDFSelected && (
                            <div className="mb-1 ml-2">
                                <Button
                                    className={buttonVariants({
                                        variant: "outline",
                                        className: "mt-4 text-stone-900",
                                    })}
                                    onClick={handleReturnToDashboard}
                                >
                                    <ChevronLeft
                                        className="mr-1.5 h-3 w-3"
                                        aria-label="return-to-dashboard"
                                    />
                                </Button>
                            </div>
                        )} */}
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
        </>
    );
}

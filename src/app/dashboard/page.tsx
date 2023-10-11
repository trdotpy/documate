"use client";

import React from "react";
import LayoutWrapper from "@/components/LayoutWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ChevronLeft, FileText, MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import SearchBar from "@/components/SearchBar";
import MessagePanel from "@/components/messaging/MessagePanel";
import SidebarMenu from "@/components/SidebarMenu";
import PDFUploader from "@/components/PDFUploader";
import { File } from "@prisma/client";
import PDFViewer from "@/components/PDFViewer";
import { Input } from "@/components/ui/input";
import moment from "moment";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";

interface ListProps {
    files: File[];
    onFileSelect: (file: any) => void;
    selectedFileId: string;
    isLoading: boolean;
}

interface PageProps {}

export default function Page({}: PageProps) {
    const router = useRouter();
    const { user } = useUser();
    const [selectedFileUrl, setSelectedFileUrl] = React.useState("");
    const [selectedFileName, setSelectedFileName] = React.useState("");
    const [selectedFileId, setSelectedFileId] = React.useState("");
    const [isPDFSelected, setIsPDFSelected] = React.useState(false);

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
        <div className="px-20">
            {isPDFSelected ? (
                <Button
                    className={buttonVariants({
                        variant: "outline",
                        className: "mt-4 text-stone-900",
                    })}
                    onClick={handleReturnToDashboard}
                >
                    <ChevronLeft className="mr-1.5 h-3 w-3" />
                    Back
                </Button>
            ) : (
                <div className="mt-4 flex h-16 items-center px-4">
                    <h2 className="mb-2 text-3xl font-bold tracking-tight">
                        {user?.firstName}'s Workspace
                    </h2>
                    <div className="ml-auto flex items-center space-x-4">
                        <PDFUploader />
                    </div>
                </div>
            )}

            <Card className="mt-4 flex-col md:flex">
                <div className="flex justify-between">
                    {/* Files */}
                    <div>
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

                    {/* Message Panel */}
                    <div className="flex-1 border-l border-stone-100 p-4">
                        <div className="flex">
                            {isPDFSelected && (
                                <PDFViewer
                                    fileURL={selectedFileUrl}
                                    fileName={selectedFileName}
                                />
                            )}
                            <MessagePanel
                                fileName={selectedFileName}
                                fileId={selectedFileId}
                                isPDFSelected={isPDFSelected}
                            />
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}

function FileList({
    files,
    onFileSelect,
    selectedFileId,
    isLoading,
}: ListProps) {
    const [searchQuery, setSearchQuery] = React.useState("");

    const filteredFiles = files.filter((file) =>
        file.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const formatDate = (createdAt: Date) => {
        const now = moment();
        const fileDate = moment(createdAt);

        if (now.isSame(fileDate, "day")) {
            return fileDate.format("HH:mm");
        }
        if (now.diff(fileDate, "seconds") <= 60) {
            return "Now";
        }
        if (now.diff(fileDate, "days") <= 7) {
            return fileDate.format("ddd");
        }

        return fileDate.format("D MMM");
    };

    if (isLoading)
        return (
            <div className="grid gap-y-2 overflow-hidden">
                <div className="p-4">
                    <Skeleton
                        height={50}
                        width={350}
                        className="mb-4 w-80 px-3 py-2"
                    />
                </div>
                <div className="p-4">
                    <Skeleton height={50} width={350} />
                </div>
                <div className="p-4">
                    <Skeleton count={6} height={50} width={350} />
                </div>
            </div>
        );

    return (
        <div className="grid gap-y-2 overflow-hidden">
            <div className="p-4">
                <Input
                    type="text"
                    className="mb-4 w-80 px-3 py-2"
                    placeholder="Search files"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <div className="px-6">
                <h1 className="text-sm">Your Files</h1>
            </div>
            <div className="px-2">
                {filteredFiles
                    .sort(
                        (a, b) =>
                            new Date(b.createdAt).getTime() -
                            new Date(a.createdAt).getTime()
                    )
                    .map((file) => (
                        <div
                            className={`h-22 cursor-pointer rounded-lg ${
                                file.id === selectedFileId
                                    ? "bg-gray-200"
                                    : "bg-transparent hover:bg-gray-100"
                            }`}
                            key={file.id}
                            onClick={() => {
                                onFileSelect(file);
                            }}
                        >
                            <CardHeader
                                className="flex flex-row items-center justify-between space-y-0 pb-2"
                                onClick={() => {
                                    onFileSelect(file);
                                }}
                            >
                                <CardTitle className="cursor-pointer flex-wrap text-sm font-medium text-gray-800 hover:underline-offset-2">
                                    {file.name}
                                </CardTitle>
                                <p className="text-muted-foreground text-xs">
                                    {formatDate(file.createdAt)}
                                </p>
                            </CardHeader>

                            <CardContent>
                                <p className="text-muted-foreground text-xs">
                                    Lorem, ipsum dolor sit amet consectetur
                                    adipisicing elit.
                                </p>
                            </CardContent>
                        </div>
                    ))}
            </div>
        </div>
    );
}

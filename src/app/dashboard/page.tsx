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
import {
    ChevronDown,
    ChevronLeft,
    FileText,
    Layout,
    MessageCircle,
    Folder,
    MessageSquare,
} from "lucide-react";
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
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

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
        <>
            <div className="flex-col md:flex">
                <div className="flex justify-between">
                    {/* Sidebar */}
                    <Sidebar />
                    {/* {isPDFSelected && (
                        <div className="ml-4">
                            <Button
                                className={buttonVariants({
                                    variant: "outline",
                                    className: "mt-4 text-stone-900",
                                })}
                                onClick={handleReturnToDashboard}
                            >
                                <ChevronLeft className="mr-1.5 h-3 w-3" />
                                Dashboard
                            </Button>
                        </div>
                    )} */}
                    {/* File List */}
                    {!isPDFSelected && (
                        <div className="h-screen border-r border-black">
                            <div className="mt-4 flex h-16 items-center px-4">
                                {user?.firstName ? (
                                    <h2 className="text-3xl tracking-tight">
                                        {user.firstName}'s Workspace
                                    </h2>
                                ) : (
                                    <Skeleton height={50} width={350} />
                                )}
                                <ChevronDown className="ml-2" />
                            </div>
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
                        {isPDFSelected && (
                            <div className="mb-1 ml-2">
                                <Button
                                    className={buttonVariants({
                                        variant: "outline",
                                        className: "mt-4 text-stone-900",
                                    })}
                                    onClick={handleReturnToDashboard}
                                >
                                    <ChevronLeft className="mr-1.5 h-3 w-3" />
                                    Dashboard
                                </Button>
                            </div>
                        )}
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
                                files={data}
                                isLoadingFiles={isLoading}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

function FileList({
    files,
    onFileSelect,
    selectedFileId,
    isLoading,
}: ListProps) {
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

    if (files.length === 0)
        return (
            <div className="flex h-full items-center justify-center">
                {/* <div className="m-auto grid px-4">
                    <div className="text-center">
                        <p className="text-xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
                            Let&apos;s get started
                        </p>
                        <p className="mt-4 text-gray-500">
                            Click below to upload a PDF from your computer.
                        </p>
                        <div className="mt-6">
                            <PDFUploader />
                        </div>
                    </div>
                </div> */}
            </div>
        );

    return (
        <div className="grid overflow-hidden">
            <div className="p-4">
                <Input
                    type="text"
                    className="w-full px-3 py-2"
                    placeholder="Search"
                />
            </div>

            <div className="mt-4">
                <div className="mx-6 flex items-center justify-start">
                    <Folder className="h-4 w-4 text-gray-500" />
                    <h1 className="ml-2 text-sm tracking-tight text-gray-500">
                        Recent Files
                    </h1>
                </div>
                {files
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
                                className="flex flex-row items-center justify-between pb-2"
                                onClick={() => {
                                    onFileSelect(file);
                                }}
                            >
                                <CardTitle className="flex cursor-pointer items-center justify-between space-x-2 text-sm font-medium text-gray-700">
                                    <MessageSquare className="text-muted-foreground h-4 w-4" />
                                    <span>
                                        {" "}
                                        {file.name.length > 20
                                            ? `${file.name.slice(0, 20)}...`
                                            : file.name}
                                    </span>
                                    <p className="text-muted-foreground text-xs">
                                        {formatDate(file.createdAt)}
                                    </p>
                                </CardTitle>
                            </CardHeader>
                            <Separator className="mt-2" />
                        </div>
                    ))}
                <div className="mt-6 flex justify-center px-6">
                    <PDFUploader />
                </div>
            </div>
        </div>
    );
}

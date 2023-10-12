import React from "react";
import { Input } from "@/components/ui/input";
import { Folder, MessageSquare } from "lucide-react";
import { formatDate } from "@/lib/utils";
import Skeleton from "react-loading-skeleton";
import { CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import PDFUploader from "./PDFUploader";
import { File } from "@prisma/client";

interface ListProps {
    files: File[];
    onFileSelect: (file: any) => void;
    selectedFileId: string;
    isLoading: boolean;
}

export default function FileList({
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
                        All
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
                            className={`h-22 cursor-pointer ${
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
                                        {file.name.length > 30
                                            ? `${file.name.slice(0, 30)}...`
                                            : file.name}
                                    </span>
                                </CardTitle>
                                <p className="text-muted-foreground text-xs">
                                    {formatDate(file.createdAt)}
                                </p>
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

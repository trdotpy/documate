"use client";

import React from "react";
import PDFUploader from "./PDFUploader";
import Skeleton from "react-loading-skeleton";
import {
    Download,
    File,
    Ghost,
    Loader2,
    MessageSquare,
    Trash,
} from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import PDFViewer from "./PDFViewer";
import { redirect, useRouter } from "next/navigation";
import axios from "axios";
import SidebarMenu from "./SidebarMenu";
import SearchBar from "./SearchBar";
import MessagePanel from "./messaging/MessagePanel";
import FileList from "./FileList";

interface Props {}

const EmptyDashboard = () => (
    <div className="relative flex-1 border-l border-l-gray-200 bg-[#f6f6f6]">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
            <div className="mt-16 flex flex-col items-center gap-2">
                <Ghost className="h-8 w-8 text-zinc-800" />
                <h3 className="text-xl font-semibold">
                    Pretty empty around here
                </h3>
                <p>Let's upload your first PDF.</p>
                <PDFUploader />
            </div>
        </div>
    </div>
);

export default function UserDashboard({}: Props) {
    const router = useRouter();
    const { user } = useUser();
    const [files, setFiles] = React.useState([]);
    const [selectedFileUrl, setSelectedFileUrl] = React.useState("");
    const [selectedFileName, setSelectedFileName] = React.useState("");
    const [isPDFSelected, setIsPDFSelected] = React.useState(false);

    React.useEffect(() => {
        const fetchFiles = async () => {
            try {
                const response = await axios.get("/api/files");
                setFiles(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchFiles();
    }, []);

    console.log(files);

    return (
        <>
            {/* <div className="flex min-h-screen">
                <div className="max-w-sm">
                    <SidebarMenu />
                </div>
                <div className="max-w-lg p-6">
                    {!isPDFSelected && (
                        <div className="mt-1 flex flex-col justify-between gap-4 border-b border-gray-200 pb-5 sm:gap-0">
                            <div className="mb-4">
                                <SearchBar />
                            </div>
                            <p className="mb-2 text-sm text-gray-600">
                                Recent Files
                            </p>

                            <FileList
                                files={files}
                                onFileSelect={(file) => {
                                    setSelectedFileUrl(file.url);
                                    setIsPDFSelected(true);
                                    setSelectedFileName(file.name);
                                }}
                            />
                        </div>
                    )}
                </div>

                {isPDFSelected ? (
                    <div className="flex w-full justify-between rounded">
                        <PDFViewer
                            fileURL={selectedFileUrl}
                            fileName={selectedFileName}
                        />
                        <MessagePanel />
                    </div>
                ) : (
                    <div className="relative flex-1 border-l border-l-gray-200 bg-[#f6f6f6]">
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                            <div className="mt-16 flex flex-col items-center gap-2">
                                <Ghost className="h-8 w-8 text-zinc-800" />
                                <h3 className="text-xl font-semibold">
                                    Pretty empty around here
                                </h3>
                                <p>Let&apos;s upload your first PDF.</p>
                                <PDFUploader />
                            </div>
                        </div>
                    </div>
                )}
            </div> */}
        </>
    );
}

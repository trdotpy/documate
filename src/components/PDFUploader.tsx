"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FolderPlus, Loader, Loader2, UploadCloud } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import Dropzone, { useDropzone } from "react-dropzone";
import { uploadToS3 } from "@/lib/aws/s3-client";
import { useUser } from "@clerk/clerk-react";

type Props = {};

export default function PDFUploader({}: Props) {
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    return (
        <Dialog
            open={isOpen}
            onOpenChange={(v) => {
                if (!v) {
                    setIsOpen(v);
                }
            }}
        >
            <DialogTrigger onClick={() => setIsOpen(true)} asChild>
                <div className="w-full">
                    <Button variant="outline" className="w-full">
                        Add PDF
                    </Button>
                </div>
            </DialogTrigger>
            <DialogContent>
                <PDFUpload />
            </DialogContent>
        </Dialog>
    );
}

function PDFUpload({}: Props) {
    const [isOpen, setIsOpen] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const router = useRouter();
    const { user } = useUser();
    const userId = user?.id;

    const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
        accept: { "application/pdf": [".pdf"] },
        maxFiles: 1,
        onDrop: async (acceptedFiles) => {
            const file = acceptedFiles[0];
            // 10mb
            if (file.size > 10 * 1024 * 1024) {
                toast.error("File too large!");
                return;
            }

            try {
                const data = await uploadToS3(file);
                setIsLoading(true);
                if (!data?.fileId || !data.fileName) {
                    toast.error("Something went wrong.");
                    return;
                }

                const response = await fetch("/api/files", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        fileId: data.fileId,
                        fileName: data.fileName,
                        userId: userId,
                    }),
                });
                if (!response.ok) {
                    throw new Error(
                        "An error occurred while creating the file record."
                    );
                }

                // Redirect to /dashboard/ with file ID as query parameter
                router.push(`/dashboard/${data.fileId}`);
            } catch (error) {
                console.error;
            } finally {
                setIsLoading(false);
                toast.success("Successfully uploaded file!");
            }
        },
    });

    return (
        <div className="relative flex w-full items-center justify-center p-4">
            <label
                htmlFor="dropzone-file"
                className="flex h-44 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
                {...getRootProps()}
            >
                <div className="flex flex-col items-center justify-center p-6">
                    <div className="flex flex-col items-center justify-center p-6">
                        {isLoading ? (
                            <div>
                                <Loader2 className="mb-4 h-8 w-8 animate-spin text-gray-500 dark:text-gray-400" />
                            </div>
                        ) : (
                            <UploadCloud className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400" />
                        )}
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">
                                Click to upload
                            </span>{" "}
                            or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            Accepted file types: PDF (Max size: 10mb)
                        </p>
                    </div>
                </div>
                <input
                    {...getInputProps()}
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                />
            </label>
        </div>
    );
}

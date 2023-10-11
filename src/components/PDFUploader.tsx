"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FolderPlus, Loader } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import Dropzone, { useDropzone } from "react-dropzone";
import { uploadToS3 } from "@/lib/aws/s3-client";
import { useUser } from "@clerk/clerk-react";

type Props = {};

export default function PDFUploader({}: Props) {
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
            // Bigger than 10mb
            if (file.size > 10 * 1024 * 1024) {
                toast.error("File too large!");
                return;
            }

            try {
                const data = await uploadToS3(file);

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
        <Dialog
            open={isOpen}
            onOpenChange={(v) => {
                if (!v) {
                    setIsOpen(v);
                }
            }}
        >
            <DialogTrigger onClick={() => setIsOpen(true)} asChild>
                <div>
                    <Button {...getRootProps()}>Upload PDF</Button>
                    <input
                        {...getInputProps()}
                        type="file"
                        id="dropzone-file"
                        className="hidden"
                    />
                </div>
            </DialogTrigger>
        </Dialog>
    );
}

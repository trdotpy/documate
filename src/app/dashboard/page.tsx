"use client";

import React from "react";
import LayoutWrapper from "@/components/LayoutWrapper";
import { Button } from "@/components/ui/button";
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

interface Props {
  files: File[];
  onFileSelect: (file: any) => void;
  selectedFileId: string;
}

export default function Page({}: Props) {
  const router = useRouter();
  const { user } = useUser();
  const [files, setFiles] = React.useState([]);
  const [selectedFileUrl, setSelectedFileUrl] = React.useState("");
  const [selectedFileName, setSelectedFileName] = React.useState("");
  const [selectedFileId, setSelectedFileId] = React.useState("");
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

  return (
    <LayoutWrapper className="max-w-screen-2xl">
      {/* <SidebarMenu /> */}
      <div className="flex h-16 items-center border-b border-gray-300 px-4">
        <h2 className="mb-2 text-3xl font-bold tracking-tight">
          Hello, {user?.firstName} 👋
        </h2>
        <div className="ml-auto flex items-center space-x-4">
          {/* <SearchBar /> */}
          <PDFUploader />
        </div>
      </div>

      <Card className="mt-4 flex-col md:flex">
        <div className="flex h-16 items-center border-b border-gray-300 px-4">
          <h2 className="mb-2 text-3xl font-bold tracking-tight">
            My Workspace
          </h2>
          <div className="ml-auto flex items-center space-x-4">
            <SearchBar />
          </div>
          {/* <PDFUploader /> */}
        </div>
        <div className="flex h-screen justify-between">
          <div className="p-4">
            <FileList
              files={files}
              onFileSelect={(file) => {
                setSelectedFileUrl(file.url);
                setIsPDFSelected(true);
                setSelectedFileName(file.name);
                setSelectedFileId(file.id);
              }}
              selectedFileId={selectedFileId}
            />
          </div>

          <div className="flex-1 p-4">
            <Card className="flex">
              <MessagePanel
                fileName={selectedFileName}
                fileId={selectedFileId}
              />
              {isPDFSelected && (
                <PDFViewer
                  fileURL={selectedFileUrl}
                  fileName={selectedFileName}
                />
              )}
            </Card>
          </div>
        </div>
      </Card>
    </LayoutWrapper>
  );
}

function FileList({ files, onFileSelect, selectedFileId }: Props) {
  return (
    <div className="grid gap-2 overflow-hidden">
      {files
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        .map((file) => (
          <Card
            className={`h-24 max-w-[250px] cursor-pointer ${
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
            </CardHeader>

            <CardContent>
              <p className="text-muted-foreground text-xs">
                {new Date(file.createdAt).toLocaleString()}
              </p>
            </CardContent>
          </Card>
        ))}
    </div>
  );
}

interface PDFProps {
  fileURL: string;
  fileName: string;
}

function PDFViewer({ fileURL, fileName }: PDFProps) {
  return (
    <div className="flex min-h-[600px] w-full flex-col items-center rounded-lg bg-transparent shadow">
      {/* <div className="flex h-14 w-full items-center justify-between border-b border-zinc-200 px-2">
                <h1>{fileName}</h1>
            </div> */}
      <iframe
        src={`https://docs.google.com/gview?url=${fileURL}&embedded=true`}
        className="h-full w-full"
        width="100%"
      ></iframe>
    </div>
  );
}

import React from "react";
import { Document } from "react-pdf";
import {
  ChevronDown,
  ChevronUp,
  Loader2,
  RotateCw,
  Search,
} from "lucide-react";

type Props = {
  fileURL: string;
  fileName: string;
};

export default function PDFViewer({ fileURL, fileName }: Props) {
  return (
    <div className="flex w-full flex-col items-center rounded-md bg-white shadow">
      <div className="flex h-14 w-full items-center justify-between border-b border-zinc-200 px-2">
        <h1>{fileName}</h1>
      </div>
      <iframe
        src={`https://docs.google.com/gview?url=${fileURL}&embedded=true`}
        className="h-full w-full"
      ></iframe>
    </div>
  );
}

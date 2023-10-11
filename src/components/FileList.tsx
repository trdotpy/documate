import { File } from "@prisma/client";
import React from "react";

interface Props {
  files: File[];
  onFileSelect: (file: any) => void;
}

export default function FileList({ files, onFileSelect }: Props) {
  return (
    <ul className="flex flex-col space-y-4">
      {files
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        .map((file) => (
          <li key={file.id}>
            <div
              className="flex cursor-pointer flex-col rounded hover:bg-gray-200"
              onClick={() => {
                onFileSelect(file); // Pass the selected file to the parent component
              }}
            >
              <div className="flex w-full items-center justify-between p-2">
                <div className="flex space-x-4">
                  {/* <File /> */}
                  <div className="flex flex-col items-start">
                    <h3 className="mb-1 text-sm font-medium text-zinc-900">
                      {file.name}
                    </h3>

                    <p className="text-xs text-green-600">
                      {new Date(file.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
    </ul>
  );
}

"use client";

import React from "react";
import {
    ChevronLeft,
    Download,
    Loader2,
    Maximize,
    Printer,
} from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import { toast } from "sonner";
import { useResizeDetector } from "react-resize-detector";
import { Input } from "./ui/input";
import SimpleBar from "simplebar-react";
import { Button, buttonVariants } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { useReactToPrint } from "react-to-print";

interface PDFViewerProps {
    fileURL: string;
    fileName: string;
}

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function PDFViewer({ fileURL, fileName }: PDFViewerProps) {
    const [numPages, setNumPages] = React.useState<number | null>();
    const [pageNumber, setPageNumber] = React.useState<number>(1);
    const [scale, setScale] = React.useState<number>(1);
    const [rotation, setRotation] = React.useState<number>(0);
    const [renderedScale, setRenderedScale] = React.useState<number | null>(
        null
    );
    const { width, ref } = useResizeDetector();

    const handlePageNumberSubmit = () => {
        // Validate page number before setting it
        if (pageNumber > 0 && pageNumber <= (numPages || 1)) {
            setPageNumber(pageNumber);
        }
    };

    const reactToPrintContent = React.useCallback(() => {
        return ref.current;
    }, [ref.current]);

    const handlePrint = useReactToPrint({
        content: reactToPrintContent,
        documentTitle: fileName,
        removeAfterPrint: true,
    });

    return (
        <div className="flex w-full flex-col items-center rounded-md bg-white shadow">
            <div className="flex h-16 w-full items-center justify-between border-b border-zinc-200 px-2">
                <div className="flex items-center gap-1.5">
                    <Input
                        type="number"
                        value={pageNumber}
                        onChange={(e) => setPageNumber(Number(e.target.value))}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handlePageNumberSubmit();
                            }
                        }}
                        min={1}
                        max={numPages || 1}
                        className="h-8 w-12"
                    />
                    <p className="space-x-1 text-sm text-zinc-700">
                        <span>of</span>
                        <span>{numPages ?? "x"}</span>
                    </p>
                </div>
                <h1 className="font-medium">{fileName}</h1>
                <div className="flex items-center">
                    <a href={fileURL} download={fileName}>
                        <Button variant="ghost" aria-label="download">
                            <Download className="h-4 w-4" />
                        </Button>
                    </a>

                    <Button
                        variant="ghost"
                        aria-label="print"
                        onClick={handlePrint}
                    >
                        <Printer className="h-4 w-4" />
                    </Button>

                    <FSViewer fileURL={fileURL} />
                </div>
            </div>
            <div className="max-h-screen w-full flex-1">
                <SimpleBar
                    autoHide={false}
                    className="max-h-[calc(100vh-10rem)]"
                >
                    <div ref={ref}>
                        <Document
                            className="max-h-full"
                            file={fileURL}
                            loading={
                                <div className="flex justify-center">
                                    <Loader2 className="my-24 h-6 w-6 animate-spin" />
                                </div>
                            }
                            onLoadSuccess={({ numPages }) =>
                                setNumPages(numPages)
                            }
                            onLoadError={() => {
                                toast.error("Error loading PDF");
                            }}
                        >
                            <Page
                                pageNumber={pageNumber}
                                scale={scale}
                                width={width ? width : 1}
                                rotate={rotation}
                                key={"@" + scale}
                                loading={
                                    <div className="flex justify-center">
                                        <Loader2 className="my-24 h-6 w-6 animate-spin" />
                                    </div>
                                }
                                onRenderSuccess={() => setRenderedScale(scale)}
                            />
                        </Document>
                    </div>
                </SimpleBar>
            </div>
        </div>
    );
}

interface FSViewerProps {
    fileURL: string;
}

function FSViewer({ fileURL }: FSViewerProps) {
    const [isOpen, setIsOpen] = React.useState(false);
    const [numPages, setNumPages] = React.useState<number | null>();
    const { width, ref } = useResizeDetector();

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
                <Button variant="ghost" aria-label="fullscreen">
                    <Maximize className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="w-full max-w-7xl">
                <SimpleBar
                    autoHide={false}
                    className="mt-6 max-h-[calc(100vh-10rem)]"
                >
                    <div ref={ref} id="pdf-container">
                        <Document
                            className="max-h-full"
                            file={fileURL}
                            loading={
                                <div className="flex justify-center">
                                    <Loader2 className="my-24 h-6 w-6 animate-spin" />
                                </div>
                            }
                            onLoadSuccess={({ numPages }) =>
                                setNumPages(numPages)
                            }
                            onLoadError={() => {
                                toast.error("Error loading PDF");
                            }}
                        >
                            {new Array(numPages).fill(0).map((_, i) => (
                                <Page
                                    key={i}
                                    pageNumber={i + 1}
                                    width={width ? width : 1}
                                />
                            ))}
                        </Document>
                    </div>
                </SimpleBar>
            </DialogContent>
        </Dialog>
    );
}

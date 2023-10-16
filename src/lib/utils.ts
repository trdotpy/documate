import { type ClassValue, clsx } from "clsx";
import moment from "moment";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const SendMessageValidator = z.object({
    fileId: z.string(),
    messages: z.object({
        role: z.string(),
        content: z.string(),
    }),
});

export function absoluteUrl(path: string) {
    if (typeof window !== "undefined") return path;
    if (process.env.NEXT_PUBLIC_BASE_URL)
        return `https://${process.env.NEXT_PUBLIC_BASE_URL}${path}`;
    return `http://localhost:${process.env.PORT ?? 3000}${path}`;
}

export function convertToAscii(inputString: string) {
    const asciiString = inputString.replace(/[^\x00-\x7F]+/g, "");
    return asciiString;
}

export const formatDate = (createdAt: Date) => {
    const now = moment();
    const fileDate = moment(createdAt);

    if (now.isSame(fileDate, "day")) {
        return fileDate.format("h:mm A");
    }
    if (now.diff(fileDate, "seconds") <= 60) {
        return "Now";
    }
    if (now.diff(fileDate, "days") <= 7) {
        return fileDate.format("ddd");
    }

    return fileDate.format("D MMM");
};

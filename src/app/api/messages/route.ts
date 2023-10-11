import { db } from "@/db";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
    try {
        const { fileId } = await req.json();

        const messageHistory = await db.message.findMany({
            where: {
                fileId: fileId,
            },
        });

        return NextResponse.json(messageHistory);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "An error occurred when fetching message history." },
            { status: 500 }
        );
    }
};

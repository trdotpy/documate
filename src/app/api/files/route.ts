// api/files
import { db } from "@/db";
import { deleteFromS3, getS3Url } from "@/lib/aws/s3-client";
import { deleteFromPinecone, uploadToPinecone } from "@/lib/pinecone/pinecone";
import { auth } from "@clerk/nextjs";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

// POST a new file
export async function POST(req: Request, res: Response) {
    const { userId } = auth();
    if (!userId) {
        return NextResponse.json(
            {
                error: "Unauthorized",
            },
            { status: 401 }
        );
    }

    try {
        const body = await req.json();
        const { fileId, fileName } = body;

        // console.log("Body request data:", body);

        const fileRecord = await db.file.create({
            data: {
                name: fileName,
                url: getS3Url(fileId),
                userId: userId,
                key: uuidv4(),
                uploadStatus: "PROCESSING",
                id: fileId,
            },
        });

        // console.log("File record created in database:", fileRecord);

        await uploadToPinecone(fileId);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                error: "Internal Server Error",
            },
            { status: 500 }
        );
    }
}

// GET all files from a user
export async function GET(req: NextRequest, res: NextResponse) {
    const { userId } = auth();
    if (!userId) {
        return NextResponse.json(
            {
                error: "Unauthorized",
            },
            { status: 401 }
        );
    }
    try {
        const files = await db.file.findMany({
            where: {
                userId: userId,
            },
        });
        return NextResponse.json(files, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                error: "Internal Server Error",
            },
            { status: 500 }
        );
    }
}

// DELETE a file
export async function DELETE(req: Request, res: Response) {
    const { userId } = auth();
    if (!userId) {
        return NextResponse.json(
            {
                error: "Unauthorized",
            },
            { status: 401 }
        );
    }

    try {
        const body = await req.json();
        console.log("Body request data:", body);

        // Delete file from S3
        await deleteFromS3(body.fileId);

        // Delete file from Pinecone
        await deleteFromPinecone(body.fileId);

        // Delete file from the database
        await db.file.delete({
            where: {
                id: body.fileId,
            },
        });

        console.log("File deleted:", body.fileId);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                error: "Internal Server Error",
            },
            { status: 500 }
        );
    }
}

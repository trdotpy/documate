import { db } from "@/db";
import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const { userId } = await auth();
        const user = await currentUser();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const dbUser = await db.user.findFirst({
            where: {
                id: userId,
            },
        });

    } catch (error) {}
}

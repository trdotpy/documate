// src/app/api/clerk/signInAttempt.ts
import { db } from "@/db";
import { NextApiRequest, NextApiResponse } from "next";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { id, emailAddress } = req.body;

        console.log("Received sign in event with data:", req.body);

        // Check if user already exists in the database
        const existingUser = await db.user.findUnique({
            where: { id },
        });

        // If user does not exist, create a new user
        if (!existingUser) {
            await db.user.create({
                data: {
                    id,
                    email: emailAddress,
                },
            });
        }

        res.status(200).json({ status: "success" });
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}

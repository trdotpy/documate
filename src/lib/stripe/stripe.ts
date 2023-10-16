import { db } from "@/db";
import { auth } from "@clerk/nextjs";
import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2023-08-16",
    typescript: true,
});

export const checkSubscription = async (): Promise<boolean> => {
    const { userId } = auth();
    if (!userId) {
        return false;
    }

    const dbUser = await db.user.findFirst({
        where: {
            id: userId,
        },
    });

    if (!dbUser) {
        return false;
    }

    const isSubscribed = Boolean(
        dbUser.stripePriceId &&
            dbUser.stripeCurrentPeriodEnd && // 86400000 = 1D
            dbUser.stripeCurrentPeriodEnd.getTime() + 86_400_000 > Date.now()
    );

    return isSubscribed;
};

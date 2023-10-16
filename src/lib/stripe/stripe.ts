import { db } from "@/db";
import { auth } from "@clerk/nextjs";
import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2023-08-16",
    typescript: true,
});

export const PLANS = [
    {
        name: "Free",
        slug: "free",
        quota: 10,
        pagesPerPdf: 5,
        price: {
            amount: 0,
            priceIds: {
                test: "",
                production: "",
            },
        },
    },
    {
        name: "Pro",
        slug: "pro",
        quota: 50,
        pagesPerPdf: 25,
        price: {
            amount: 14,
            priceIds: {
                test: "price_1NuEwTA19umTXGu8MeS3hN8L",
                production: "",
            },
        },
    },
];

export const checkSubscription = async () => {
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
        return {
            isSubscribed: false,
            isCanceled: false,
            stripeCurrentPeriodEnd: null,
        };
    }

    const isSubscribed = Boolean(
        dbUser.stripePriceId &&
            dbUser.stripeCurrentPeriodEnd && // 86400000 = 1D
            dbUser.stripeCurrentPeriodEnd.getTime() + 86_400_000 > Date.now()
    );

    const plan = isSubscribed
        ? PLANS.find(
              (plan) => plan.price.priceIds.test === dbUser.stripePriceId
          )
        : null;

    let isCanceled = false;
    if (isSubscribed && dbUser.stripeSubscriptionId) {
        const stripePlan = await stripe.subscriptions.retrieve(
            dbUser.stripeSubscriptionId
        );
        isCanceled = stripePlan.cancel_at_period_end;
    }

    return !!isSubscribed;
};

import { db } from "@/db";
import { stripe } from "@/lib/stripe/stripe";
import { absoluteUrl } from "@/lib/utils";
import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
    try {
        const { userId } = auth();
        const user = await currentUser();
        const returnUrl = absoluteUrl("/");

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
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

        const stripeSession = await stripe.checkout.sessions.create({
            success_url: returnUrl,
            cancel_url: returnUrl,
            payment_method_types: ["card"],
            mode: "subscription",
            billing_address_collection: "auto",
            customer_email: user?.emailAddresses[0].emailAddress,
            line_items: [
                {
                    price_data: {
                        currency: "USD",
                        product_data: {
                            name: "DocuMate Pro",
                            description: "Unlimited PDF sessions.",
                        },
                        unit_amount: 2000,
                        recurring: {
                            interval: "month",
                        },
                    },
                    quantity: 1,
                },
            ],
            metadata: {
                userId,
            },
        });

        return NextResponse.json({ url: stripeSession.url });
    } catch (error) {
        console.log("Stripe error", error);
        return new NextResponse("Internal server error", { status: 500 });
    }
}

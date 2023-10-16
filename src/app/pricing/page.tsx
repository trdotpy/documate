import React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { checkSubscription } from "@/lib/stripe/stripe";
import { Check } from "lucide-react";
import SubscribeBtn from "@/components/SubscribeBtn";
import { auth } from "@clerk/nextjs";
import Link from "next/link";

type Props = {};

const pricingPlans = [
    {
        name: "Starter",
        price: "$0",
        description: "Perfect for personal use",
        features: [
            "Send up to 5 messages per PDF",
            "Add up to 10 PDFs",
            "Analyze your PDFs with a state-of-the-art AI assistant",
        ],
    },
    {
        name: "Pro",
        price: "$29.99",
        description: "Perfect for teams and power users",
        features: [
            "Send unlimited messages per PDF",
            "Add unlimited PDFs",
            "Analyze your PDFs with a state-of-the-art AI assistant",
            "Unlock advanced AI features for in-depth PDF analysis",
            "24/7 support to answer any questions",
        ],
    },
];

export default async function Page({}: Props) {
    const { userId } = auth();
    const isSubscribed = await checkSubscription();

    return (
        <section className="relative z-20 overflow-hidden bg-white pb-12 pt-20 lg:pb-[90px] lg:pt-[120px]">
            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]" />
            <div>
                <div className="-mx-4 flex flex-wrap">
                    <div className="w-full px-4">
                        <div className="mx-auto mb-[60px] max-w-[510px] text-center lg:mb-20">
                            <span className="text-primary mb-2 block text-lg font-semibold">
                                Pricing
                            </span>
                            <h1 className="text-dark mb-4 text-3xl font-bold sm:text-4xl md:text-[40px] ">
                                Choose your plan
                            </h1>
                            <p className="text-body-color text-base">
                                We offer simple and transparent pricing to suit
                                teams of all sizes. Pick the plan that meets
                                your needs.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex-col justify-center space-y-12 px-4 sm:-mx-4 sm:flex sm:flex-row sm:space-x-12 sm:space-y-0 sm:px-0">
                    {pricingPlans.map((plan, index) => (
                        <Card
                            key={index}
                            className={index === 0 ? "sm:relative" : ""}
                        >
                            <CardHeader>
                                <CardTitle>
                                    <span className="text-primary mb-4 block text-lg font-semibold">
                                        {plan.name}
                                    </span>
                                    <h2 className="text-dark mb-5 text-[42px] font-bold">
                                        {plan.price}
                                        <span className="text-body-color text-base font-medium">
                                            / month
                                        </span>
                                    </h2>
                                </CardTitle>
                                <CardDescription>
                                    <p className="text-body-color border-b border-[#F2F2F2] pb-8 text-base">
                                        {plan.description}
                                    </p>
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex-col space-y-2">
                                {plan.features.map((feature, featureIndex) => (
                                    <div
                                        key={featureIndex}
                                        className="flex space-x-2"
                                    >
                                        <Check className="text-green-500" />
                                        <p className="text-body-color mb-1 text-sm leading-loose sm:text-base">
                                            {feature}
                                        </p>
                                    </div>
                                ))}
                            </CardContent>
                            <CardFooter
                                className={
                                    index === 0
                                        ? "bottom-0 sm:absolute sm:inset-x-0"
                                        : ""
                                }
                            >
                                {index === 0 ? (
                                    <Link
                                        href={
                                            isSubscribed
                                                ? "/dashboard"
                                                : "/sign-up"
                                        }
                                        className={buttonVariants({
                                            variant: "outline",
                                            size: "lg",
                                            className: "w-full",
                                        })}
                                    >
                                        <p>Choose Free Plan</p>
                                    </Link>
                                ) : userId ? (
                                    <SubscribeBtn isSubscribed={isSubscribed} />
                                ) : (
                                    <Link
                                        href="/sign-in"
                                        className={buttonVariants({
                                            variant: "outline",
                                            size: "lg",
                                            className: "w-full",
                                        })}
                                    >
                                        <p>Choose Pro Plan</p>
                                    </Link>
                                )}
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}

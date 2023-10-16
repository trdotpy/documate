import React from "react";
import { Button } from "./ui/button";
import axios from "axios";

interface SubscribeBtnProps {
    isSubscribed: boolean;
}

export default function SubscribeBtn({ isSubscribed }: SubscribeBtnProps) {
    const [loading, setLoading] = React.useState(false);
    const handleSubscription = async () => {
        try {
            setLoading(true);
            const response = await axios.get("/api/stripe");
            window.location.href = response.data.url;
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button
            disabled={loading}
            onClick={handleSubscription}
            variant="outline"
            className="w-full"
        >
            {isSubscribed ? "Manage Subscriptions" : "Upgrade"}
        </Button>
    );
}

import React from "react";
import UserDashboard from "@/components/UserDashboard";

interface DashboardProps {}

export default function Page({}: DashboardProps) {
    return (
        <div className="flex w-full">
            <div className="w-full flex-col">
                <UserDashboard />
            </div>
        </div>
    );
}

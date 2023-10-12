import React from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { auth } from "@clerk/nextjs";
import UserDashboard from "@/components/UserDashboard";

interface DashboardProps {}

export default function Page({}: DashboardProps) {
    const { userId } = auth();

    return (
        <div className="flex w-full">
            <div className="w-full flex-col">
                <UserDashboard />
            </div>
        </div>
    );
}

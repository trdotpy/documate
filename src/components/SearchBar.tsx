import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function SearchBar() {
    return (
        <div>
            <Input
                type="text"
                className="flex h-8 rounded-md border border-gray-800 bg-white p-2 px-3 py-2 text-sm text-gray-100 placeholder-gray-400 disabled:cursor-not-allowed disabled:opacity-50 md:w-[100px] lg:w-[300px]"
                placeholder="Search..."
            />
        </div>
    );
}

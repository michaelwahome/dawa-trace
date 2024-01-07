"use client"

import Link from "next/link";
import { useSession } from "@/context/SessionContext";

const Page = () => {
    const { user } = useSession();
    const firstName = user?.firstName;

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-8">{firstName ? `Hello ${firstName}!` : `Hello User!`}</h1>

            <div className="flex space-x-4">
                <Link href="#" className="bg-green-800 text-white py-4 px-8 rounded-full hover:bg-green-700 focus:outline-none focus:ring focus:border-green-300">
                    Search For Product
                </Link>
                <Link href="#" className="bg-green-800 text-white py-4 px-8 rounded-full hover:bg-green-700 focus:outline-none focus:ring focus:border-green-300">
                    Manage Account
                </Link>
            </div>
        </div>
    )
}

export default Page;
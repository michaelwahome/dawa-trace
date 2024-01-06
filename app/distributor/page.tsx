"use client"

import Link from "next/link";
import { useSession } from "@/context/SessionContext";

const Page = () => {
    const { user } = useSession();
    const companyName = user?.companyName;

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-8">Hello {`${companyName}`}!</h1>

            <div className="flex space-x-4">
                <Link href="#" className="bg-green-800 text-white py-4 px-8 rounded-full hover:bg-green-700 focus:outline-none focus:ring focus:border-green-300">
                    Add Shipment Data
                </Link>
                <Link href="#" className="bg-green-800 text-white py-4 px-8 rounded-full hover:bg-green-700 focus:outline-none focus:ring focus:border-green-300">
                    Transfer Ownership To Retailer
                </Link>
                <Link href="#" className="bg-green-800 text-white py-4 px-8 rounded-full hover:bg-green-700 focus:outline-none focus:ring focus:border-green-300">
                    Manage Account
                </Link>
            </div>
        </div>
    )
}

export default Page;
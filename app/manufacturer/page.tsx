import Link from "next/link";
import { Greeting } from "@/components/greeter";

const Page = () => {

    return (
        <div className="p-8">
            <Greeting userType="manufacturer" />

            <div className="flex space-x-4">
                <Link href="/manufacturer/product" className="bg-green-800 text-white py-4 px-8 rounded-full hover:bg-green-700 focus:outline-none focus:ring focus:border-green-300">
                    Create New Product
                </Link>
                <Link href="#" className="bg-green-800 text-white py-4 px-8 rounded-full hover:bg-green-700 focus:outline-none focus:ring focus:border-green-300">
                    Transfer Ownership To Distributor
                </Link>
                <Link href="#" className="bg-green-800 text-white py-4 px-8 rounded-full hover:bg-green-700 focus:outline-none focus:ring focus:border-green-300">
                    Manage Account
                </Link>
            </div>
        </div>
    )
}

export default Page;
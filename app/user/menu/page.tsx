import Link from "next/link"
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";

const Page = () => {
    return (
        <div className="flex flex-col justify-between gap-5 pt-0 p-8">
            <Link className="flex flex-row gap-3 items-center text-2xl font-bold mb-5" href="/user">
                <ArrowUturnLeftIcon className="h-7 w-7"/>
                Back To Dashboard
            </Link>
            <Link href="/user/product" className="bg-green-800 text-white py-4 px-8 rounded-full hover:bg-green-700 focus:outline-none focus:ring focus:border-green-300">
                Search By Product ID
            </Link>
            <Link href="/user/batch" className="bg-green-800 text-white py-4 px-8 rounded-full hover:bg-green-700 focus:outline-none focus:ring focus:border-green-300">
                Search By Batch ID
            </Link>
            <Link href="/user/manufacturer" className="bg-green-800 text-white py-4 px-8 rounded-full hover:bg-green-700 focus:outline-none focus:ring focus:border-green-300">
                Search By Manufacturer
            </Link>
            <Link href="/user/distributor" className="bg-green-800 text-white py-4 px-8 rounded-full hover:bg-green-700 focus:outline-none focus:ring focus:border-green-300">
                Search By Distributor
            </Link>
            <Link href="/user/retailer" className="bg-green-800 text-white py-4 px-8 rounded-full hover:bg-green-700 focus:outline-none focus:ring focus:border-green-300">
                Search By Retailer
            </Link>
        </div>
    )
}

export default Page;
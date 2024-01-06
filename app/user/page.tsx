import Link from "next/link";

const Page = () => {
    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-8">Hello User!</h1>

            <div className="flex space-x-4">
                <Link href="#" className="bg-green-800 text-white py-4 px-8 rounded-full hover:bg-green-700 focus:outline-none focus:ring focus:border-green-300">
                    Search for Product
                </Link>
                <Link href="#" className="bg-green-800 text-white py-4 px-8 rounded-full hover:bg-green-700 focus:outline-none focus:ring focus:border-green-300">
                    Manage Account
                </Link>
            </div>
        </div>
    )
}

export default Page;
import Link from "next/link";
import { Greeting } from "@/components/greeter";
import ManufacturerTable from "@/components/tables/manufacturer-table";
import { Suspense } from "react";
import connectDB from "@/lib/mongodb";
import Company from "@/models/company";
import TransferDistributor from "@/components/ownership/transfer-manufacturer";
import { HomeIcon } from "@heroicons/react/24/outline";

const Page = async () => {
    
    try{
        connectDB();

        const companies = await Company.find({}, "companyName address -_id");
        const distributors = await Company.find({role: "distributor"}, "companyName address -_id");

        const companyNames = companies.map(company => company.companyName);
        const addresses = companies.map(company => company.address);
        const distributorNames = distributors.map(distributor => distributor.companyName);
        const distributorAddresses = distributors.map(distributor => distributor.address);

        return (
            <>
                <div className="p-8">
                    <div className="flex flex-row gap-3 items-centre">
                        <HomeIcon className="h-7 w-7" />

                        <Greeting userType="manufacturer" />
                    </div>
    
                    <div className="flex space-x-4">
                        <Link href="/manufacturer/product" className="bg-green-800 text-white py-4 px-8 rounded-full hover:bg-green-700 focus:outline-none focus:ring focus:border-green-300">
                            Create New Product
                        </Link>
                        <Link href="#" className="bg-green-800 text-white py-4 px-8 rounded-full hover:bg-green-700 focus:outline-none focus:ring focus:border-green-300">
                            Manage Account
                        </Link>
                    </div>
                </div>

                <div className="flex flex-col gap-8">
                    <TransferDistributor distributorNames={distributorNames} addresses={distributorAddresses} />

                    <Suspense >
                        <ManufacturerTable companyNames={companyNames} addresses={addresses}/>
                    </Suspense>
                </div>
            </>
        )
    } catch (error: any){
        console.log(error.message);
    }

    return <></>
}

export default Page;
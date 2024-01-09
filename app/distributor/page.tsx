import Link from "next/link";
import { Greeting } from "@/components/greeter";
import DistributorTable from "@/components/tables/distributor-table";
import { Suspense } from "react";
import connectDB from "@/lib/mongodb";
import Company from "@/models/company";
import TransferRetailer from "@/components/ownership/transfer-distributor";
import AddShipment from "@/components/add-shipment";
import { HomeIcon } from "@heroicons/react/24/outline";

const Page = async () => {

    try{
        connectDB();

        const companies = await Company.find({}, "companyName address -_id");
        const retailers = await Company.find({role: "retailer"}, "companyName address -_id");

        const companyNames = companies.map(company => company.companyName);
        const addresses = companies.map(company => company.address);
        const retailerNames = retailers.map(retailer => retailer.companyName);
        const retailerAddresses = retailers.map(retailer => retailer.address);

        return (
            <>
                <div className="p-8">
                    <div className="flex flex-row gap-3 items-centre">
                        <HomeIcon className="h-7 w-7" />

                        <Greeting userType="distributor" />
                    </div>
        
                    <div className="flex space-x-4">
                        <Link href="#" className="bg-green-800 text-white py-4 px-8 rounded-full hover:bg-green-700 focus:outline-none focus:ring focus:border-green-300">
                            Manage Account
                        </Link>
                    </div>
                </div>

                <div className="flex flex-col gap-8">
                    <AddShipment />

                    <TransferRetailer retailerNames={retailerNames} addresses={retailerAddresses} />

                    <Suspense >
                        <DistributorTable companyNames={companyNames} addresses={addresses}/>
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
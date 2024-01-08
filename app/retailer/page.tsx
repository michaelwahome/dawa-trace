import Link from "next/link";
import { Greeting } from "@/components/greeter";
import RetailerTable from "@/components/tables/retailer-table";
import { Suspense } from "react";
import connectDB from "@/lib/mongodb";
import Company from "@/models/company";
import AddReceived from "@/components/add-received";

const Page = async () => {

    try{
        connectDB();

        const companies = await Company.find({}, "companyName address -_id");

        const companyNames = companies.map(company => company.companyName);
        const addresses = companies.map(company => company.address);

        return (
            <>
                <div className="p-8">
                    <Greeting userType="retailer" />
        
                    <div className="flex space-x-4">
                        <Link href="#" className="bg-green-800 text-white py-4 px-8 rounded-full hover:bg-green-700 focus:outline-none focus:ring focus:border-green-300">
                            Manage Account
                        </Link>
                    </div>
                </div>

                <div className="flex flex-col gap-8">
                    <AddReceived />
                    
                    <Suspense >
                            <RetailerTable companyNames={companyNames} addresses={addresses}/>
                    </Suspense>
                </div>
            </>
        )
    } catch(error: any){
        console.log(error.message);
    }

    return <></>    
}

export default Page;
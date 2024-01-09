import Link from "next/link";
import Search from "@/components/search/search";
import BatchSearch from "@/components/search/batch-search";
import { Suspense } from "react";
import connectDB from "@/lib/mongodb";
import Company from "@/models/company";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";

const Page = async () => {
    
    try{
        connectDB();

        const companies = await Company.find({}, "companyName address -_id");

        const companyNames = companies.map(company => company.companyName);
        const addresses = companies.map(company => company.address);

        return (
            <div className="flex flex-col gap-8">
                <Link className="flex flex-row gap-3 items-center text-2xl font-bold" href="/user/menu">
                    <ArrowUturnLeftIcon className="h-7 w-7"/>
                    Back To Menu
                </Link>

                <Search placeholder="Search for products by batch ID"></Search>

                <Suspense >
                    <BatchSearch companyNames={companyNames} addresses={addresses}/>
                </Suspense>
            </div>
        )
    } catch (error: any){
        console.log(error.message);
    }

    return <></>
}

export default Page;
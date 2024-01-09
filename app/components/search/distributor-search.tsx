"use client"

import { useWeb3ModalProvider } from "@web3modal/ethers/react";
import { BrowserProvider, toNumber } from "ethers";
import { ethers } from "ethers";
import { pharmaceuticalAddress } from "@/config";
import Pharmaceutical from "@/lib/Pharmaceutical.json";
import { useSession } from "@/context/SessionContext";
import { useRouter, useSearchParams } from "next/navigation";

const DistributorSearch = async (
    {
        companyNames,
        addresses,
    } : {
        companyNames: string[],
        addresses: string[]
    }
) => {
    const { user } = useSession();
    const { walletProvider } = useWeb3ModalProvider();
    const router = useRouter();
    const searchParams = useSearchParams();

    const query = searchParams.get("query") || undefined

    if(!query){
        return (
            <h2 className="text-xl font-bold mt-5">KINDLY ENTER A SEARCH STRING</h2>
        )
    }

    const firstName = user?.firstName;

    if (firstName == ""){
        router.push("/signin")
    }

    const formatDate = (time: bigint) => {
        const timestamp = toNumber(time);
        const date = new Date(timestamp * 1000); // Multiply by 1000 to convert from seconds to milliseconds
        return date.toLocaleDateString(); // Adjust this based on your preferred date format
    };

    enum ProductState {
        Created = 0,
        Shipped = 1,
        Received = 2,
    }
    
    const stateToString = (state: ProductState): string => {
        switch (state) {
            case ProductState.Created:
                return 'Created';
            case ProductState.Shipped:
                return 'Shipped';
            case ProductState.Received:
                return 'Received';
            default:
                return 'Other';
        }
    };

    const addressToName = (address: string) => {
        const addressIndex = addresses.indexOf(address);

        if (addressIndex !== -1 ){
            return companyNames[addressIndex]
        } else{
            return "Default"
        }
    }

    if (walletProvider){
        const provider = new BrowserProvider(walletProvider);

        try{
            let contract = new ethers.Contract(
                pharmaceuticalAddress,
                Pharmaceutical.abi,
                provider
            );

            const products = await contract.queryProductsByDistributor(query);

            if(products.length === 0){
                return (
                    <h2 className="text-xl font-bold mt-5">QUERY NOT FOUND: TYPE ENTIRE DISTRIBUTOR NAME (CASE SENSITIVE)</h2>
                )
            }

            return (
                <div className="max-w-screen-lg text-center shadow-md shadow-green-800 p-8 mx-auto">
                    <h1 className="text-2xl font-bold mb-4">Product Table</h1>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 border-b">Number on Chain</th>
                                    <th className="py-2 px-4 border-b">Product ID</th>
                                    <th className="py-2 px-4 border-b">Batch ID</th>
                                    <th className="py-2 px-4 border-b">Drug Name</th>
                                    <th className="py-2 px-4 border-b">Manufacturer</th>
                                    <th className="py-2 px-4 border-b">Manufacture Date</th>
                                    <th className="py-2 px-4 border-b">Expiration Date</th>
                                    <th className="py-2 px-4 border-b">Distributor</th>
                                    <th className="py-2 px-4 border-b">Retailer</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product:any, index: any) => (
                                    <tr key={index} className={(index % 2 === 0) ? 'bg-gray-100' : 'bg-white'}>
                                        <td className="py-2 px-4 border-b">{toNumber(product.productNumber)}</td>
                                        <td className="py-2 px-4 border-b">{product.productId}</td>
                                        <td className="py-2 px-4 border-b">{product.batchId}</td>
                                        <td className="py-2 px-4 border-b">{product.drugName}</td>
                                        <td className="py-2 px-4 border-b">{product.manufacturerName}</td>
                                        <td className="py-2 px-4 border-b">{formatDate(product.manufactureDate)}</td>
                                        <td className="py-2 px-4 border-b">{formatDate(product.expirationDate)}</td>
                                        <td className="py-2 px-4 border-b">{product.distributorName}</td>
                                        <td className="py-2 px-4 border-b">{product.retailerName}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        } catch (error: any) {
            console.log("Error is: ", error.message)
        }
    }

    return (
        <h2 className="text-xl font-bold mt-5">TECHNICAL DIFFICULTIES CONNECTING TO BLOCKCHAIN</h2>
    )
}

export default DistributorSearch;
"use client"

import Link from "next/link";
import { useWeb3ModalProvider } from "@web3modal/ethers/react";
import { useSession } from "@/context/SessionContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BrowserProvider } from 'ethers'
import { ethers } from "ethers";
import { pharmaceuticalAddress } from "@/config";
import Pharmaceutical from "@/lib/Pharmaceutical.json";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import { getProduct } from "@/app/lib/blockchain";

const Page = () => {
    const { walletProvider } = useWeb3ModalProvider();
    const { user } = useSession();
    const router = useRouter();
    const [error, setError ] = useState(false);

    const processNewProduct = async (formData: FormData) => {
        const manufacturerName = user?.companyName;

        if(manufacturerName == "") {
            router.push("/signin")
        }

        const productId = formData.get("productId");
        const batchId = formData.get("batchId");
        const drugName = formData.get("name");
        const manufactureDate = formData.get("manufactureDate");
        const expirationDate = formData.get("expirationDate");

        const manufactureDateUnix = typeof manufactureDate === "string" ? Math.floor(new Date(manufactureDate).getTime() / 1000) : 0;
        const expirationDateUnix = typeof expirationDate === "string" ? Math.floor(new Date(expirationDate).getTime() / 1000) : 0;
        

        if (walletProvider){
            const provider = new BrowserProvider(walletProvider);
            const signer = await provider.getSigner();
            const signature = await signer?.signMessage("Publish New Pharmaceutical Product To The Blockchain")

            try {
                const contract = new ethers.Contract(
                    pharmaceuticalAddress,
                    Pharmaceutical.abi,
                    signer
                );
    
                const transaction = await contract.createProduct(
                    productId,
                    batchId,
                    drugName,
                    manufacturerName,
                    manufactureDateUnix,
                    expirationDateUnix
                );
    
                console.log("Transaction Hash:", transaction.hash);
    
                // Wait for the transaction receipt
                const receipt = await transaction.wait();
                
                console.log("Transaction Receipt:", receipt);
    
                // Check if the transaction was successful
                if (receipt.status === 1) {
                    console.log("Transaction successful!");
                    router.push("/manufacturer")
                } else {
                    console.error("Transaction failed!");
                }

            } catch (error: any) {
                console.error("Error during transaction:", error.message);
            }
        }
        
    }
   

    return (
        <form action={processNewProduct} className="flex flex-col bg-white p-8 rounded shadow-md w-full">
            <Link className="flex flex-row gap-3 items-center text-2xl font-bold" href="/manufacturer">
                <ArrowUturnLeftIcon className="h-7 w-7"/>
                Back
            </Link>
            <h2 className="text-2xl font-bold mb-4 text-center">Create New Product</h2>
            <div className="mb-4">
                <label htmlFor="productId" className="block text-gray-700 text-sm font-bold mb-2">
                    Product ID
                </label>
                <input
                type="text"
                id="productId"
                name="productId"
                className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-green-500"
                placeholder="Enter the pharmaceutical's Product ID"
                required
                />
                {/* <div>
                    {state.errors?.firstName &&
                    state.errors.firstName.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                        {error}
                        </p>
                    ))}
                </div> */}
            </div>

            <div className="mb-4">
                <label htmlFor="batchId" className="block text-gray-700 text-sm font-bold mb-2">
                    Batch ID
                </label>
                <input
                type="text"
                id="batchId"
                name="batchId"
                className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-green-500"
                placeholder="Enter the pharmaceutical's Batch ID"
                required
                />
                {/* <div>
                    {state.errors?.lastName &&
                    state.errors.lastName.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                        {error}
                        </p>
                    ))}
                </div> */}
            </div>

            <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                    Name of Pharmaceutical
                </label>
                <input
                type="text"
                id="name"
                name="name"
                className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-green-500"
                placeholder="Enter the pharmaceutical's name"
                required
                />
                {/* <div>
                    {state.errors?.lastName &&
                    state.errors.lastName.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                        {error}
                        </p>
                    ))}
                </div> */}
            </div>

            <div className="mb-4">
                <label htmlFor="manufactureDate" className="block text-gray-700 text-sm font-bold mb-2">
                    Date of Manufacture
                </label>
                <input
                type="date"
                id="manufactureDate"
                name="manufactureDate"
                className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-green-500"
                required
                />
                {/* <div>
                    {state.errors?.dob &&
                    state.errors.dob.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                        {error}
                        </p>
                    ))}
                </div> */}
            </div>

            <div className="mb-4">
                <label htmlFor="expirationDate" className="block text-gray-700 text-sm font-bold mb-2">
                    Expiration Date
                </label>
                <input
                type="date"
                id="expirationDate"
                name="expirationDate"
                className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-green-500"
                />
                {/* <div>
                    {state.errors?.dob &&
                    state.errors.dob.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                        {error}
                        </p>
                    ))}
                </div> */}
            </div>

            <button className="bg-green-800 text-white py-2 px-4 rounded-full hover:bg-green-600 
            focus:outline-none focus:ring focus:border-green-300 aria-disabled:cursor-not-allowed
            aria-disabled:opacity-50" type="submit">
                Submit
            </button>
        </form>
    )
}

export default Page;
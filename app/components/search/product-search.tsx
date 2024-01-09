"use client"

import { useWeb3ModalProvider } from "@web3modal/ethers/react";
import { BrowserProvider, toNumber } from "ethers";
import { ethers } from "ethers";
import { pharmaceuticalAddress } from "@/config";
import Pharmaceutical from "@/lib/Pharmaceutical.json";
import { useSession } from "@/context/SessionContext";
import { useRouter, useSearchParams } from "next/navigation";

const ProductSearch = async (
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

            const product = await contract.queryProductByProductId(query);

            return (
                <div className="grid grid-cols-2 gap-4">
                  <div className="mb-4">
                    <p className="font-bold">Number on Chain:</p>
                    <p>{toNumber(product.productNumber)}</p>
                  </div>
                  <div className="mb-4">
                    <p className="font-bold">Product ID:</p>
                    <p>{product.productId}</p>
                  </div>
                  <div className="mb-4">
                    <p className="font-bold">Batch ID:</p>
                    <p>{product.batchId}</p>
                  </div>
                  <div className="mb-4">
                    <p className="font-bold">Drug Name:</p>
                    <p>{product.drugName}</p>
                  </div>
                  <div className="mb-4">
                    <p className="font-bold">Manufacturer:</p>
                    <p>{product.manufacturerName}</p>
                  </div>
                  <div className="mb-4">
                    <p className="font-bold">Manufacture Date:</p>
                    <p>{formatDate(product.manufactureDate)}</p>
                  </div>
                  <div className="mb-4">
                    <p className="font-bold">Expiration Date:</p>
                    <p>{formatDate(product.expirationDate)}</p>
                  </div>
                  <div className="mb-4">
                    <p className="font-bold">Distributor:</p>
                    <p>{product.distributorName}</p>
                  </div>
                  <div className="mb-4">
                    <p className="font-bold">Retailer:</p>
                    <p>{product.retailerName}</p>
                  </div>
                </div>
              );
        } catch (error: any) {
            return (
                <h2 className="text-xl font-bold mt-5">QUERY NOT FOUND: TYPE ENTIRE PRODUCT ID (CASE SENSITIVE)</h2>
            )
        }
    }

    return (
        <h2 className="text-xl font-bold mt-5">TECHNICAL DIFFICULTIES CONNECTING TO BLOCKCHAIN</h2>
    )
}

export default ProductSearch;
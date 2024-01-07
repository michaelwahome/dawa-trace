"use client"

import { useWeb3ModalProvider } from "@web3modal/ethers/react";
import { useRouter } from "next/navigation";
import { BrowserProvider } from 'ethers'
import { ethers } from "ethers";
import { pharmaceuticalAddress } from "@/config";
import Pharmaceutical from "@/lib/Pharmaceutical.json";
import { revalidatePath } from "next/cache";

const TransferRetailer = (
    {
        retailerNames,
        addresses
    } : {
        retailerNames: string[],
        addresses: string[]
    }
) => {
    const { walletProvider } = useWeb3ModalProvider();
    const router = useRouter();

    const transferToRetailer = async (formData: FormData) => {
        const productNumber = formData.get("productNumber");
        const retailerName = formData.get("retailerName");

        const nameToAddress = (name: any) => {
            const nameIndex = retailerNames.indexOf(name);
    
            if (nameIndex !== -1 ){
                return addresses[nameIndex]
            } else{
                return "Default"
            }
        }

        const address = nameToAddress(retailerName)


        if (walletProvider){
            const provider = new BrowserProvider(walletProvider);
            const signer = await provider.getSigner();
            const signature = await signer?.signMessage(`Transfer ownership of this product to ${retailerName}`)

            try {
                const contract = new ethers.Contract(
                    pharmaceuticalAddress,
                    Pharmaceutical.abi,
                    signer
                );
    
                const transaction = await contract.transferOwnershipToRetailer(
                    productNumber,
                    address,
                    retailerName
                );
    
                console.log("Transaction Hash:", transaction.hash);
    
                // Wait for the transaction receipt
                const receipt = await transaction.wait();
                
                console.log("Transaction Receipt:", receipt);
    
                // Check if the transaction was successful
                if (receipt.status === 1) {
                    console.log("Transaction successful!");
                    revalidatePath("/distributor")
                    router.push("/distributor")
                } else {
                    console.error("Transaction failed!");
                }

                // const productNumber = receipt.events[0].args.productNumber.toNumber();

                // // Log the product number
                // console.log('Product Number:', productNumber);

                // // Query the product details using the product number
                // const productDetails = await contract.queryProduct(productNumber);

                // // Log the product details
                // console.log('Product Details:', productDetails);

                // router.push("/manufacturer");
            } catch (error: any) {
                console.error("Error during transaction:", error.message);
            }
        }
    }


    return (
        <form action={transferToRetailer} className="flex flex-col bg-white p-8 rounded shadow-md shadow-green-800 w-full">
            <h2 className="text-2xl font-bold mb-4 text-center">Transfer Ownership to Retailer</h2>
            <div className="mb-4">
                <label htmlFor="productNumber" className="block text-gray-700 text-sm font-bold mb-2">
                    Product Number
                </label>
                <input
                type="number"
                id="productNumber"
                name="productNumber"
                className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-green-500"
                placeholder="Enter the Pharmaceutical's Product Number"
                min={1}
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
                <label htmlFor="retailerName" className="block text-gray-700 text-sm font-bold mb-2">
                    Retailer Name
                </label>
                <select
                    id="retailerName"
                    name="retailerName"
                    className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-green-500"
                    required
                >
                    <option value="" disabled selected>
                        Choose a retailer
                    </option>
                    {retailerNames.map((retailer, index) => (
                        <option key={index} value={retailer}>
                            {retailer}
                        </option>
                    ))}
                </select>
                {/* <div>
                    {state.errors?.lastName &&
                    state.errors.lastName.map((error: string) => (
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

export default TransferRetailer;
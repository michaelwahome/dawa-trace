"use client"

import Link from "next/link";
import { processRegisterCompany} from "@/lib/actions";
import { useFormState, useFormStatus } from "react-dom";
import { useEffect, useState } from "react";
import { useWeb3ModalAccount} from '@web3modal/ethers/react'

const RegisterCompanyForm = () =>{
    const [account, setAccount] = useState("")

    const { address } = useWeb3ModalAccount();

    useEffect(()=> {
        if(address){
            setAccount(address)
        } else{
            setAccount("")
        }
    }, [address])

    const initialState = { message: null, errors: {} };
    const [state, dispatch] = useFormState(processRegisterCompany, initialState)

    return(
        <form action={dispatch} className="flex flex-col bg-white p-8 rounded shadow-md w-full">
            <h2 className="text-2xl font-bold mb-4 text-center">Register a Company</h2>
            <div className="mb-4">
                <label htmlFor="companyName" className="block text-gray-700 text-sm font-bold mb-2">
                Company Name
                </label>
                <input
                type="text"
                id="companyName"
                name="companyName"
                className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-green-500"
                placeholder="Enter the name of the company"
                />
                <div>
                    {state.errors?.companyName &&
                    state.errors.companyName.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                        {error}
                        </p>
                    ))}
                </div>
            </div>

            <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                Email
                </label>
                <input
                type="email"
                id="email"
                name="email"
                className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-green-500"
                placeholder="Enter your email"
                />
                <div>
                    {state.errors?.email &&
                    state.errors.email.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                        {error}
                        </p>
                    ))}
                </div>
            </div>

            <div className="mb-4">
                <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
                Phone
                </label>
                <input
                type="tel"
                id="phone"
                name="phone"
                className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-green-500"
                placeholder="Enter your phone number"
                />
                <div>
                    {state.errors?.phone &&
                    state.errors.phone.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                        {error}
                        </p>
                    ))}
                </div>
            </div>

            <div className="mb-4">
                <label htmlFor="physicalAddress" className="block text-gray-700 text-sm font-bold mb-2">
                Physical Address
                </label>
                <textarea
                id="physicalAddress"
                name="physicalAddress"
                rows={3}
                className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-green-500"
                placeholder="Enter your physical address"
                ></textarea>
                <div>
                    {state.errors?.physicalAddress &&
                    state.errors.physicalAddress.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                        {error}
                        </p>
                    ))}
                </div>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Role</label>
                <div className="flex items-center">
                <label className="mr-4">
                    <input type="radio" name="role" value="manufacturer" className="mr-1 accent-green-600" />
                    Manufacturer
                </label>
                <label className="mr-4">
                    <input type="radio" name="role" value="distributor" className="mr-1 accent-green-600" />
                    Distributor
                </label>
                <label>
                    <input type="radio" name="role" value="retailer" className="mr-1 accent-green-600" />
                    Retailer
                </label>
                </div>
                <div>
                    {state.errors?.role &&
                    state.errors.role.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                        {error}
                        </p>
                    ))}
                </div>
            </div>

            <div className="mb-4">
                <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
                    Connect your wallet
                </label>
                <input
                    type="text"
                    id="address"
                    name="address"
                    value={account}
                    className="w-full p-2 border rounded outline-none text-green-500 focus:outline-none focus:ring focus:border-green-500 mb-2"
                    placeholder="Your address will be auto-populated"
                    readOnly
                />
                <w3m-button balance="hide"/>
                <div>
                    {state.errors?.address &&
                    state.errors.address.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                        {error}
                        </p>
                    ))}
                </div>
            </div>

            <RegisterCompanyButton />

            <p className="mt-4 text-sm text-gray-600">
                Already have an account?   
                <Link href="/signin" className="text-green-800 underline">Sign in</Link>
            </p>

            <p className="mt-4 text-sm text-gray-600">
                <Link href="/signup" className="text-green-800 underline">Register as a user</Link>
            </p>
        </form>
    )
}

function RegisterCompanyButton() {
    const { pending } = useFormStatus();
   
    return (
      <button className="bg-green-800 text-white py-2 px-4 rounded-full hover:bg-green-600 
      focus:outline-none focus:ring focus:border-green-300 aria-disabled:cursor-not-allowed
      aria-disabled:opacity-50"
      type="submit"
      aria-disabled={pending}
      >
        Register
      </button>
    );
}

export default RegisterCompanyForm;
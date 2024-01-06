"use client"

import Link from "next/link";
import { processSignup } from "@/lib/actions";
import { useFormState, useFormStatus } from "react-dom";
import { useEffect, useState } from "react";
import { useWeb3ModalAccount} from '@web3modal/ethers/react'

const SignUpForm = () => {
    const [account, setAccount] = useState("")

    const { address } = useWeb3ModalAccount();

    useEffect(()=> {
        if(address){
            setAccount(address)
        } else{
            setAccount("")
        }
    }, [address])

    const initialState = { message: null, errors: {}};
    const [state, dispatch] = useFormState(processSignup, initialState)

    return(
        <form action={dispatch} className="flex flex-col bg-white p-8 rounded shadow-md w-full">
            <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
            <div className="mb-4">
                <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">
                First Name
                </label>
                <input
                type="text"
                id="firstName"
                name="firstName"
                className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-green-500"
                placeholder="Enter your first name"
                />
                <div>
                    {state.errors?.firstName &&
                    state.errors.firstName.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                        {error}
                        </p>
                    ))}
                </div>
            </div>

            <div className="mb-4">
                <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">
                Last Name
                </label>
                <input
                type="text"
                id="lastName"
                name="lastName"
                className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-green-500"
                placeholder="Enter your last name"
                />
                <div>
                    {state.errors?.lastName &&
                    state.errors.lastName.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                        {error}
                        </p>
                    ))}
                </div>
            </div>

            <div className="mb-4">
                <label htmlFor="dob" className="block text-gray-700 text-sm font-bold mb-2">
                Date of Birth
                </label>
                <input
                type="date"
                id="dob"
                name="dob"
                className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-green-500"
                />
                <div>
                    {state.errors?.dob &&
                    state.errors.dob.map((error: string) => (
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
                <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
                    Connect your wallet
                </label>
                <input
                    type="text"
                    id="address"
                    name="address"
                    value={account}
                    className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-green-500 mb-2"
                    placeholder="Your address will be auto-populated"
                    hidden
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

            <SignUpButton />

            <p className="mt-4 text-sm text-gray-600">
                Already have an account?   
                <Link href="/signin" className="text-green-800 underline">Sign in</Link>
            </p>

            <p className="mt-4 text-sm text-gray-600">
                <Link href="/registercompany" className="text-green-800 underline">Register a company</Link>
            </p>
        </form>
    )
}

function SignUpButton() {
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

export default SignUpForm;
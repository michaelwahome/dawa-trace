"use client"

import Link from "next/link";
import { useDisconnect } from "@web3modal/ethers/react";
import { useRouter } from "next/navigation";
import { useWeb3Modal } from '@web3modal/ethers/react'
import { useSession } from "@/context/SessionContext";

const SideNav = () => {
    const { disconnect } = useDisconnect();
    const { open } = useWeb3Modal();
    const  router = useRouter();
    const { logout } = useSession();

    const handleClick = async () => {
        await disconnect()
        logout()
        router.push("/signin")
    };

    const viewAccount = () => {
        open({view: "Account"})
    }

    return(
        <>
            <div className="bg-green-800 hidden md:grid grid-rows-12 h-full text-white p-4">
                <div className="mb-4">
                    <Link href="/distributor" className='font-bold text-xl'>
                        DawaTrace
                    </Link>
                </div>

                <div className="row-start-3">
                    <button onClick={viewAccount}>View Address</button>
                </div>

                <div className="row-start-5 flex flex-col">
                    <Link href="#" className='my-2'>
                        Manage Account
                    </Link>
                </div>

                <div className="row-start-11">   
                    <button onClick={handleClick}>Sign Out</button>
                </div>
            </div>

            <div className="bg-green-800 text-white flex flex-row justify-between pt-5 p-4 w-full md:hidden">
                <div className="mb-4">
                    <Link href="/distributor" className='font-bold text-xl'>
                        DawaTrace
                    </Link>
                </div>

                <div className="">
                    <button onClick={viewAccount}>View Address</button>
                </div>

                <div className="">   
                    <button onClick={handleClick}>Sign Out</button>
                </div>
            </div>
        </>
    )
}

export default SideNav;
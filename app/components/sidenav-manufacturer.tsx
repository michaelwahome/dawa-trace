"use client"

import Link from "next/link";
import { useDisconnect } from "@web3modal/ethers/react";
import { useRouter } from "next/navigation";
import { useWeb3ModalAccount} from '@web3modal/ethers/react'
import { useSession } from "@/context/SessionContext";
import { useEffect } from "react";

const SideNav = () => {
    const { disconnect } = useDisconnect();
    const { isConnected } = useWeb3ModalAccount();
    const  router = useRouter();
    const { logout} = useSession();

    const handleClick = async () => {
        await disconnect()
        logout()
        router.push("/signin")
    };

    return(
        <div className="bg-green-800 grid grid-rows-12 h-full text-white p-4">
            <div className="mb-4">
                <Link href="/manufacturer" className='text-white font-bold text-xl'>
                    DawaTrace
                </Link>
            </div>

            <w3m-account-button balance="hide" />

            <div className="row-start-3 flex flex-col">
                <Link href="/manufacturer/product" className='my-2'>
                    Create New Product
                </Link>
                <Link href="#" className='my-2'>
                    Transfer Ownership To Distributor
                </Link>
                <Link href="#" className='my-2'>
                    Manage Account
                </Link>
            </div>

            <div className="row-start-11 text-white">   
                <button onClick={handleClick}>Sign Out</button>
            </div>
        </div>
    )
}

export default SideNav;
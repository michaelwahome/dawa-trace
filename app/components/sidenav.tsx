"use client"

import Link from "next/link";
import { useDisconnect } from "@web3modal/ethers/react";
import { useRouter } from "next/navigation";
import { useWeb3ModalAccount} from '@web3modal/ethers/react'

const SideNav = () => {
    const { disconnect } = useDisconnect();
    const { address } = useWeb3ModalAccount();
    const  router = useRouter();

    const handleClick = async () => {
        await disconnect()
        console.log(address)
        router.push("/signin")
    }

    return(
        <div className="bg-green-800 grid grid-rows-12 h-full text-white p-4">
            <div className="mb-4">
                <Link href="/user" className='text-white font-bold text-xl'>
                    PharmaTrace
                </Link>
            </div>

            <div className="row-start-3 flex flex-col mb-8">
                <Link href="#" className='my-2'>
                    Search for Product
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
"use client"

import { useSession } from "@/context/SessionContext"

export const Greeting = ({userType} : {userType: string}) => {
    const { user } = useSession();

    if (userType == "user"){
        const firstName = user?.firstName;

        return (
            <h1 className="text-2xl font-bold mb-8">{firstName ? `Hello ${firstName}!` : `Hello User!`}</h1>
        )
    } else if (userType == "manufacturer"){
        const companyName = user?.companyName;

        return (
            <h1 className="text-2xl font-bold mb-8">{companyName ? `Hello ${companyName}!` : `Hello Manufacturer!`}</h1>
        )
    } else if (userType == "distributor"){
        const companyName = user?.companyName;

        return (
            <h1 className="text-2xl font-bold mb-8">{companyName ? `Hello ${companyName}!` : `Hello Distributor!`}</h1>
        )
    } else if (userType == "retailer"){
        const companyName = user?.companyName;

        return (
            <h1 className="text-2xl font-bold mb-8">{companyName ? `Hello ${companyName}!` : `Hello Retailer!`}</h1>
        )
    } else{
        return <></>
    }
    
}
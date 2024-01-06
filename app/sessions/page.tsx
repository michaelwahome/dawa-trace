"use client"

import { useSession } from '@/context/SessionContext';
import { useSearchParams, useRouter } from 'next/navigation';

const Page = () => {
    const { login } = useSession();
    let searchParams = useSearchParams();
    let router = useRouter();

    let address = searchParams.get("address")?.toString()
    let companyName = searchParams.get("companyName")?.toString()
    let role = searchParams.get("role")?.toString()
    let firstName= searchParams.get("firstName")?.toString()
    let lastName= searchParams.get("lastName")?.toString()

    if(firstName){
        let userData = {
            address: address,
            firstName: firstName,
            lastName: lastName,
            role: role
        }
        login(userData)
        switch(role){
            case "user":
                router.push("/user");
                break;
            case "admin":
                router.push("/admin");
                break;
            case "superadmin":
                router.push("/superadmin");
                break;
            default:
                console.log("User session error");
        }
    } else if(companyName){
        let userData = {
            address: address,
            companyName: companyName,
            role: role
        }
        login(userData)
        switch(role){
            case "manufacturer":
                router.push("/manufacturer");
                break;
            case "distributor":
                router.push("/distributor");
                break;
            case "retailer":
                router.push("/retailer");
                break;
            default:
                console.log("Company session error");
        }
    }else{
        console.log("Something's wrong with the sessions")
    }

    return <></>
}

export default Page;
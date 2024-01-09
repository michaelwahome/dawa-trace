"use client"

import { useSearchParams, useRouter } from 'next/navigation';

const Page = () => {
    let searchParams = useSearchParams();
    let router = useRouter();

    let path = searchParams.get("path")?.toString()

    try{
        router.push(`/${path}`);
    }catch(error: any){
        console.log("Something's wrong with the reload")
    }

    return <></>
}

export default Page;
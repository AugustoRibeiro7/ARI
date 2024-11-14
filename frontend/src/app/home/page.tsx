"use client"

import { useRouter } from "next/navigation";


export default function Home()
{
    const router = useRouter();;
    

    return(
        <div>
            <h1>HOME</h1>
        </div>
    )
}
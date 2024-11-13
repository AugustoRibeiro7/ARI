"use client"
import { Logout } from "@/components/Logout";
import { useAuth } from "@/utils/auth";
import { useRouter } from "next/navigation";


export default function Home()
{
    const router = useRouter();;
    
    //Autenticando se usuário está logado
    const token = useAuth(); 
    if(!token) return null;

    return(
        <div>
            <h1>HOME</h1>
        </div>
    )
}
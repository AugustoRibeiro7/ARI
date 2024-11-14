"use client"

import { Sidebar } from "@/components/Sidebar";
import { useAuth } from "@/utils/auth";


export default function AplicationLayout({ children }: { children: React.ReactNode }) {

    //Autenticando se usuário está logado
    const token = useAuth(); 
    if(!token) return null;

    return (
    <>
        <div className="flex min-h-[100vh]">
            <Sidebar />
            <main className="flex-grow px-8 pt-10 ">
                {children}
            </main>
        </div>
    </>

    );
  }
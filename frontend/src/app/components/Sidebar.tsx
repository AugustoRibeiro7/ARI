"use client";

import { useRouter, usePathname } from 'next/navigation';
import {House, SignOut, Pill, List, X} from 'phosphor-react';
import { useState } from 'react';
import { Logout } from './Logout';


export function Sidebar()
{

    const router = useRouter();
    const pathname = usePathname();
    const [isExpanded, setIsExpanded] = useState(false); // Estado para controlar a visibilidade no mobile

  return(
    <div className={ //div usada para ocupar tamanho real em relação aos elementos
        ` relative min-h-[100vh]
        ${isExpanded ? 'w-10' : 'w-10'} 
        md:w-[14.5rem] 
        transition-all duration-300 ease-in-out z-10 flex-shrink-0`}
    >
        <aside //tag fixed, o que nao ocupa tamanho real entre os outros elementos
            className={
            `bg-zinc-900 border-sky-900 min-h-[100vh] border-r fixed left-0 flex flex-col items-center py-10
            ${isExpanded ? 'w-[14.5rem]' : 'w-10'} 
            md:w-[14.5rem] 
            transition-all duration-300 ease-in-out z-10`}
                    
        >
            {/* Botão para abrir/fechar no mobile */}
            <div className="w-full flex justify-center p-4">
                <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="block md:hidden text-zinc-400"
                >
                {isExpanded ? <X className="w-6 h-6" /> : <List className="w-6 h-6" />}
                </button>
            </div>

            {/* Lista de botoes do Menu */}
            <div className={`flex flex-col items-center gap-6 w-full flex-grow-0 ${isExpanded || 'hidden md:flex'}`}>
                <button 
                    className={`w-[168px] h-12 px-3 py-2 rounded-lg justify-start items-center gap-3 inline-flex ${pathname === '/home' ? 'bg-zinc-800' : 'border-transparent'} `}
                    onClick={() => router.push('/home')}
                >
                    <House className={`w-8 h-8 ${pathname === '/home' ? 'text-sky-700' : 'text-zinc-500'}`} />
                    <p className={`text-zinc-300 text-base `}>Home</p>
                </button>
                <button 
                    className={`w-[168px] h-12 px-3 py-2 rounded-lg justify-start items-center gap-3 inline-flex ${pathname === '/home/remedios' ? 'bg-zinc-800' : 'border-transparent'} `}
                    onClick={() => router.push('/home/remedios')}
                >
                    <Pill className={`w-8 h-8 ${pathname === '/home/remedios' ? 'text-sky-700' : 'text-zinc-500'}`}  />
                    <p className={`text-zinc-500 text-base font-normal ${isExpanded || 'md:block hidden'}`}>Remedios</p>
                </button>
            </div>
            <div className=" w-full flex justify-between flex-grow flex-col-reverse">
                <div className={`${isExpanded || 'md:block hidden'} w-full flex justify-center`}>
                    <Logout />
                </div>
            </div>
        </aside>
    </div>
  )
}
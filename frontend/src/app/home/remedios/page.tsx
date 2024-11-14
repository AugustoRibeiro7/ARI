'use client'

import RemedioForm from '@/components/RemedioForm';
import { Trash } from 'phosphor-react';
import React, { useEffect, useState } from 'react';

export default function Remedios()
{
    const [remedios, setRemedios] = useState([]);

    // Função para buscar dados do backend
    const atualizarRemedios = async () => {
        try {
            const response = await fetch('http://localhost:3001/remedio');
            const data = await response.json();
            setRemedios(data);
        } catch (error) {
            console.error("Erro ao buscar remédios:", error);
        }
    };

    // Chama atualizarRemedios apenas uma vez ao carregar a página
    useEffect(() => {
        atualizarRemedios();
    }, []);



    const deletarRemedios = async (id)=>{
        // Requisição para o back-end
        try {
            const response = await fetch('http://localhost:3001/remedio/deletar', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({id}),
            });
            if (response.ok) {
                // Chama a função atualizarRemedios para recarregar a lista de remédios
                atualizarRemedios();


            } else {
                alert('Erro na Exclusao');
            }
        } catch (error) {
            alert('Erro na requisição:'+ error);
            console.error('Erro na requisição:', error);
        }
    }


    return(
        <div className='min-h-screen text-white'>
            <RemedioForm atualizarRemedios={atualizarRemedios} />

            <div className="mt-8 max-w-4xl mx-auto">
                <ul className="space-y-4">
                {remedios.map((remedio, index) => (
                    <li key={index} className="flex justify-between items-center bg-white text-black p-4 rounded-lg shadow-sm">
                        <div>
                            <h4 className="text-lg font-bold">{remedio.nome}</h4>
                            <p><strong>Função:</strong> {remedio.funcao}</p>
                            <p><strong>Dosagem:</strong> {remedio.dosagem} mg</p>
                        </div>
                        <button onClick={()=>deletarRemedios(remedio.id)}>
                            <Trash size={25} className='hover:text-red-900' />
                        </button>
                    </li>
                ))}
                </ul>
            </div>
        </div>
    )
}
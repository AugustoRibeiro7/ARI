"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";
import { setCookie } from 'nookies';

export default function Login() {

    // Estado para armazenar os dados do formulário
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const router = useRouter();

    // Função para lidar com o envio do formulário
    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault();  // Previne o comportamento padrão de recarregar a página

        // Requisição para o back-end
        try {
            const response = await fetch('http://localhost:3001/usuario/login', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, senha }),
            });
            if (response.ok) {
                const {token} = await response.json(); // Extraindo o corpo JSON

                // Armazene o token em um cookie
                setCookie(null, 'authToken', token, {
                  maxAge: 60 * 60, // 1 hora
                  path: '/', // Disponível em todo o site
                  sameSite: 'lax',
                });

                // Redirecionar para Home
                router.push("/home");
            } else {
                alert('Erro no login');
            }
        } catch (error) {
            alert('Erro na requisição:'+ error);
            console.error('Erro na requisição:', error);
        }

    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-black">
        <form onSubmit={handleSubmit} className="bg-gray-800 text-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-semibold text-sky-700 mb-6 text-center">Login</h2>
          
          <div className="mb-4">
            <label className="block mb-1 text-sky-700 font-medium" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Seu email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="input input-bordered w-full bg-gray-700 placeholder-gray-400 focus:outline-none focus:border-sky-700"
            />
          </div>
          
          <div className="mb-6">
            <label className="block mb-1 text-sky-700 font-medium" htmlFor="password">
              Senha
            </label>
            <input
              type="password"
              id="password"
              placeholder="Sua senha"
              value={senha}
              onChange={(e)=>setSenha(e.target.value)}
              className="input input-bordered w-full bg-gray-700 placeholder-gray-400 focus:outline-none focus:border-sky-700"
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-sky-700 hover:bg-sky-800 text-white font-semibold py-2 rounded-lg transition duration-200"
          >
            Entrar
          </button>
          
          <p className="text-center mt-4">
            <span className="text-gray-400">Não tem uma conta? </span>
            <a href="/signup" className="text-sky-700 hover:underline">
              Crie uma conta
            </a>
          </p>
        </form>
      </div>
    );
}
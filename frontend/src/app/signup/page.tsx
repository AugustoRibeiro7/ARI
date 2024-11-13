"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";


export default function SignUp()
{

  // Estado para armazenar os dados do formulário
  const [nome, setNome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const status = true;
  const router = useRouter();

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e:React.FormEvent) => {
      e.preventDefault();  // Previne o comportamento padrão de recarregar a página

      alert("nome: "+nome+' email: '+ email +" senha: "+ senha + " data: "+ dataNascimento);

      // Requisição para o back-end
      try {
          const response = await fetch('http://localhost:3001/usuario/cadastrar', {
              method: 'POST',
              headers: {
              'Content-Type': 'application/json',
              },
              body: JSON.stringify({ nome, email, senha, dataNascimento, status}),
          });
          if (response.ok) {
              alert('Cadastro bem-sucedido');

              // Redirecionar para Home
              router.push("/login");
          } else {
              alert('Erro no Cadastro');
          }
      } catch (error) {
          alert('Erro na requisição:'+ error);
          console.error('Erro na requisição:', error);
      }

  };




    return(
        <div className="flex items-center justify-center min-h-screen">
        <form onSubmit={handleSubmit} className="bg-gray-800 text-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-semibold text-sky-700 mb-6 text-center">Cadastro</h2>
          
          <div className="mb-4">
            <label className="block mb-1 text-sky-700 font-medium" htmlFor="name">
              Nome
            </label>
            <input
              type="text"
              id="name"
              placeholder="Seu nome"
              value={nome}
              onChange={(e)=>setNome(e.target.value)}
              className="input input-bordered w-full bg-gray-700 placeholder-gray-400 focus:outline-none focus:border-sky-700"
            />
          </div>
          
          <div className="mb-4">
            <label className="block mb-1 text-sky-700 font-medium" htmlFor="birthdate">
              Data de Nascimento
            </label>
            <input
              type="date"
              id="birthdate"
              value={dataNascimento}
              onChange={(e)=>setDataNascimento(e.target.value)}
              className="input input-bordered w-full bg-gray-700 placeholder-gray-400 focus:outline-none focus:border-sky-700"
            />
          </div>
          
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
            Cadastrar
          </button>
        </form>
      </div>
    )
}
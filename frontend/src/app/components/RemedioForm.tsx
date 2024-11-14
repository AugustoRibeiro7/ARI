import React, { useState } from "react";

export default function RemedioForm({ atualizarRemedios }) {
  const [nome, setNome] = useState("");
  const [funcao, setFuncao] = useState("");
  const [dosagem, setDosagem] = useState("");

  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault();
    
    // Requisição para o back-end
    try {
        const response = await fetch('http://localhost:3001/remedio/cadastrar', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nome, funcao, dosagem}),
        });
        if (response.ok) {
            // Chama a função atualizarRemedios para recarregar a lista de remédios
            atualizarRemedios();

            // Limpa os campos do formulário
            setNome('');
            setFuncao('');
            setDosagem('');

        } else {
            alert('Erro no Cadastro');
        }
    } catch (error) {
        alert('Erro na requisição:'+ error);
        console.error('Erro na requisição:', error);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-2xl text-center text-sky-700 mb-4">
        Cadastrar Remédio
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="nome" className="block text-gray-700">
            Nome do Remédio
          </label>
          <input
            id="nome"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="input input-bordered w-full "
            placeholder="Nome do remédio"
            required
          />
        </div>

        <div className="flex space-x-4">
          <div className="flex-1">
            <label htmlFor="funcao" className="block text-gray-700">
              Função
            </label>
            <input
              id="funcao"
              type="text"
              value={funcao}
              onChange={(e) => setFuncao(e.target.value)}
              className="input input-bordered w-full"
              placeholder="Função do remédio"
              required
            />
          </div>

          <div className="w-1/3">
            <label htmlFor="dosagem" className="block text-gray-700">
              Dosagem (número)
            </label>
            <input
              id="dosagem"
              type="number"
              value={dosagem}
              onChange={(e) => setDosagem(e.target.value)}
              className="input input-bordered w-full"
              placeholder="Dosagem"
              required
            />
          </div>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="btn btn-primary w-full bg-sky-700 hover:bg-sky-800 text-white"
          >
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  );
}

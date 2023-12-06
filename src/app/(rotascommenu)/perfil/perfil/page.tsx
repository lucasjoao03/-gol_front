"use client"
import React, { useState } from 'react';

interface ProfileProps {
  primeiroNome: string;
  ultimoNome: string;
  email: string;
  telefone: string;
  equipe: string;
  posicao: string;
  senhaAtual: string;
  novaSenha: string;
  repetirSenha: string;
}

const Profile: React.FC<ProfileProps> = (props) => {
  const [formData, setFormData] = useState({
    primeiroNome: '',
    ultimoNome: '',
    email: '',
    telefone: '',
    equipe: '',
    posicao: '',
    senhaAtual: '',
    novaSenha: '',
    repetirSenha: '',
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Dados do formulário:', formData);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded shadow">
        <div className="mb-8 text-center">
          <img
            src="https://engeadmin.engematica.com.br/assets/imagens/perfil/avatar_225x225.jpg"
            alt="Foto do perfil"
            className="w-32 h-32 rounded-full mx-auto"
          />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="primeiroNome">
                Primeiro Nome
              </label>
              <input
                type="text"
                id="primeiroNome"
                name="primeiroNome"
                value={formData.primeiroNome}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ultimoNome">
                Último Nome
              </label>
              <input
                type="text"
                id="ultimoNome"
                name="ultimoNome"
                value={formData.ultimoNome}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                E-mail
              </label>
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="telefone">
                Telefone
              </label>
              <input
                type="text"
                id="telefone"
                name="telefone"
                value={formData.telefone}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="equipe">
                Equipe
              </label>
              <input
                type="text"
                id="equipe"
                name="equipe"
                value={formData.equipe}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="posicao">
                Posição
              </label>
              <input
                type="text"
                id="posicao"
                name="posicao"
                value={formData.posicao}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Gravar
            </button>
          </div>
        </form>

        <div className="mt-8 border-t pt-8">
          <h2 className="text-xl font-semibold mb-4">Alterar Senha</h2>

          <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="senhaAtual">
                Senha Atual
              </label>
              <input
                type="password"
                id="senhaAtual"
                name="senhaAtual"
                value={formData.senhaAtual}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="novaSenha">
                Nova Senha
              </label>
              <input
                type="password"
                id="novaSenha"
                name="novaSenha"
                value={formData.novaSenha}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="repetirSenha">
                Repetir Nova Senha
              </label>
              <input
                type="password"
                id="repetirSenha"
                name="repetirSenha"
                value={formData.repetirSenha}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Gravar Senha
            </button>
          </div>
        </div>

        <div className="mt-8 border-t pt-8">
          <h2 className="text-xl font-semibold mb-4">Assinatura de E-mail</h2>
          {/* Adicione os campos de assinatura de e-mail aqui, se necessário */}
        </div>
      </div>
    </div>
  );
};

export default Profile;

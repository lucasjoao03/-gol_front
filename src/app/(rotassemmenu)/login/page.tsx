"use client"
import { useState, ChangeEvent, FormEvent } from 'react';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async () => {
    try {
      const response = await fetch('url-rickson', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();

        localStorage.setItem('token', data.token);

        console.log('Token:', data.token);
        console.log('Login bem-sucedido');
      } else {
        console.error('Erro de autenticação');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-green-500">
      <div className="bg-white mx-auto max-w-md py-8 px-10 shadow rounded-lg flex flex-col items-center">
        <h2 className="text-3xl font-semibold text-center text-green-500 mb-4">
          +GOL
        </h2>
        <div className="mb-4">
          <img
            src="undraw_goal_-0-v5v.svg"
            alt="Imagem de perfil"
            className="w-full h-auto"
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Usuário"
              className="appearance-none block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-50 focus:bg-white border border-gray-200 focus:border-gray-500 rounded focus:outline-none"
              onChange={handleEmailChange}
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Senha"
              className="appearance-none block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-50 focus:bg-white border border-gray-200 focus:border-gray-500 rounded focus:outline-none"
              onChange={handlePasswordChange}
            />
          </div>
          <div className="mb-4">
            <button
              className="inline-block w-full px-8 py-4 leading-none text-white bg-green-500 hover:bg-green-700 font-semibold rounded shadow"
              type="submit"
            >
              Entrar
            </button>
          </div>
     
        </form>
      </div>
    </div>
  );
};

export default Login;

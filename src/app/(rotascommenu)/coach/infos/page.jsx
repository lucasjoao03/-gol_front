'use client'

import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CoachList = () => {
    const [coaches, setCoaches] = useState([]);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        const fetchCoaches = async () => {
            const url = filter === 'all'
                ? 'http://localhost:8080/coach'
                : `http://localhost:8080/coach/${filter}`;

            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Erro HTTP: ${response.status}`);
                }
                const data = await response.json();
                setCoaches(data.content);
            } catch (error) {
                console.error("Erro ao buscar treinadores", error);
            }
        };

        fetchCoaches();
    }, [filter]);

    const handleEditClick = async (coachId) => {
        localStorage.setItem('editingCoachId', coachId);
        window.location.href = '/coach/edit';
    };

    const handleInactiveClick = async (coachId) => {
        try {
            const response = await fetch(`http://localhost:8080/coach/${coachId}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                toast.error('Treinador já inativo!');
                throw new Error(`Erro HTTP: ${response.status}`);
            }

            window.location.reload();
        } catch (error) {
            console.error("Erro ao mudar status do treinador para inativo", error);
        }
    };

    return (
        <div>
            <div className="flex justify-between mb-4">
                <div className="inline-block relative w-64">
                    <select
                        id="statusFilter"
                        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="all">Todos</option>
                        <option value="active">Ativo</option>
                        <option value="inactive">Inativo</option>
                        <option value="vacation">De Férias</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M5.8 6.5l4.2 4.2 4.2-4.2 1.4 1.4-5.6 5.6-5.6-5.6z"/>
                        </svg>
                    </div>
                </div>
            </div>
            <table className="min-w-full">
                <thead>
                    <tr>
                        <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Nome</th>
                        <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">CPF</th>
                        <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Telefone</th>
                        <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Status</th>
                        <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Data de nascimento</th>
                        <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Treinos</th>
                        <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {coaches.map(coach => (
                        <tr key={coach.id}>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{coach.name}</td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{coach.cpf}</td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{coach.phone}</td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{coach.status}</td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{coach.birthDay.join('/')}</td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                                {/* Aqui você pode mapear os treinos, se houver */}
                            </td>
                            <td>
                            <button onClick={() => handleEditClick(coach.id)}>
                                Editar
                            </button>
                            <button onClick={() => handleInactiveClick(coach.id)}>
                                    Tornar Inativo
                                </button>
                            
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <ToastContainer/>
        </div>
    );
};

export default CoachList;

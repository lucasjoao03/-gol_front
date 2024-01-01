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

    const handleTrainingClick = async (coachCpf) => {
        localStorage.setItem('editingCoachCpf', coachCpf);
        window.location.href = '/coach/trainings';
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
        <div className="p-5">
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
                        <option value="vacation">De férias</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M5.8 6.5l4.2 4.2 4.2-4.2 1.4 1.4-5.6 5.6-5.6-5.6z"/>
                        </svg>
                    </div>
                </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {coaches.map(coach => (
                    <div key={coach.id} className="flex flex-col items-center bg-white rounded-lg shadow-md p-4">
                        <img
                            src="https://engeadmin.engematica.com.br/assets/imagens/perfil/avatar_225x225.jpg"
                            alt="Profile"
                            className="rounded-full h-24 w-24 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="font-bold text-lg">{coach.name}</h3>
                            <p className="text-gray-700">Responsável: {coach.cpf}</p>
                            <p className="text-gray-700">Altura: {coach.phone}</p>
                            <p className={`inline-block rounded-full text-xs font-semibold mr-2 px-2.5 py-0.5 ${coach.status === 'ACTIVE'
                                        ? 'bg-green-100 text-green-800'
                                        : coach.status === 'VACATION'
                                        ? 'bg-yellow-100 text-yellow-800'
                                        : 'bg-red-100 text-red-800'
                                        }`}>{coach.status}
                            </p>
                            <div className="pt-3 flex justify-center gap-2"> {/* Adicionando div para os botões */}
                                <button className="bg-blue-500 hover:bg-blue-800 text-white py-1 px-3 rounded text-sm"
                                onClick={() => handleEditClick(coach.id)}>
                                Editar
                                </button>
                                <button className="bg-blue-500 hover:bg-blue-800 text-white py-1 px-3 rounded text-sm"
                                onClick={() => handleInactiveClick(coach.id)}>
                                Tornar Inativo
                                </button>
                                <button className="bg-blue-500 hover:bg-blue-800 text-white py-1 px-3 rounded text-sm"
                                onClick={() => handleTrainingClick(coach.cpf)}>
                                Ver Treinos
                                </button>
                    </div>
                        </div>
                    </div>
                ))}
            </div>
            <ToastContainer/>
        </div>
    );

};

export default CoachList;

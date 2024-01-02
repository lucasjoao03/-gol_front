'use client'

import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Athlete = () => {
    const [athletes, setAthletes] = useState([]);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        const fetchCoaches = async () => {
            const url = filter === 'all'
                ? 'http://localhost:8080/athlete'
                : `http://localhost:8080/athlete/${filter}`;

            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Erro HTTP: ${response.status}`);
                }
                const data = await response.json();
                setAthletes(data.content);
            } catch (error) {
                console.error("Erro ao buscar treinadores", error);
            }
        };

        fetchCoaches();
    }, [filter]);

    /* const handleEditClick = async (athleteId) => {
        localStorage.setItem('editingAthleteId', athleteId);
        window.location.href = '/coa/edit';
    }; */

    

    const handleInactiveClick = async (athleteId) => {
        try {
            const response = await fetch(`http://localhost:8080/athlete/${athleteId}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                toast.error('Atleta já inativo!');
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
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M5.8 6.5l4.2 4.2 4.2-4.2 1.4 1.4-5.6 5.6-5.6-5.6z"/>
                        </svg>
                    </div>
                </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {athletes.map(athlete => (
                    <div key={athlete.id} className="flex flex-col items-center bg-white rounded-lg shadow-md p-4">
                        <img
                            src="https://engeadmin.engematica.com.br/assets/imagens/perfil/avatar_225x225.jpg"
                            alt="Profile"
                            className="rounded-full h-24 w-24 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="font-bold text-lg">{athlete.name}</h3>
                            <p className="text-gray-700">Responsável: {athlete.guardian.name}</p>
                            <p className="text-gray-700">Altura: {athlete.height}</p>
                            <p className="text-gray-700">Peso: {athlete.weight}</p>
                            <p className="text-gray-700">Turma: {athlete.group.name}</p>
                            <p className={`inline-block rounded-full text-xs font-semibold mr-2 px-2.5 py-0.5
                                        ${athlete.status === 'ACTIVE'
                                        ? 'bg-blue-100 text-blue-800'
                                        :'bg-red-100 text-red-800'
                                        }`}>{athlete.status}
                            </p>
                            <button className="bg-green-500 hover:bg-green-800 text-white py-1 px-3 rounded text-sm mt-3"
                                    onClick={() => handleInactiveClick(athlete.id)}>
                                    Tornar Inativo
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <ToastContainer/>
        </div>
    );
};

export default Athlete;
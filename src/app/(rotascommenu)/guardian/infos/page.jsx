'use client'

import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CoachList = () => {
    const [guardians, setGuardians] = useState([]);

    useEffect(() => {
        const fetchCoaches = async () => {
            try {
                const response = await fetch('http://localhost:8080/guardian');
                if (!response.ok) {
                    throw new Error(`Erro HTTP: ${response.status}`);
                }
                const data = await response.json();
                setGuardians(data.content);
            } catch (error) {
                console.error("Erro ao buscar Responsáveis", error);
            }
        };

        fetchCoaches();
    }, []);

    /* const handleEditClick = async (coachId) => {
        localStorage.setItem('editingCoachId', coachId);
        window.location.href = '/coach/edit';
    }; */

    const formataCpf = (cpf) => {
        return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-${cpf.slice(9, 11)}`;
    };

    const formataPhone = (phone) => {
        return `(${phone.slice(0, 2)}) ${phone.slice(2, 3)}${phone.slice(3, 7)}-${phone.slice(7, 11)}`;
    }

    return (
        <div className="p-5">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {guardians.map(guardian => (
                    <div key={guardian.id} className="flex flex-col items-center bg-white rounded-lg shadow-md p-4">
                        <img
                            src="https://engeadmin.engematica.com.br/assets/imagens/perfil/avatar_225x225.jpg"
                            alt="Profile"
                            className="rounded-full h-24 w-24 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="font-bold text-lg">{guardian.name}</h3>
                            <p className="text-gray-700">Cpf: {formataCpf(guardian.cpf)}</p>
                            <p className="text-gray-700">Telefone: {formataPhone(guardian.phone)}</p>

                            <div className="pt-3 flex justify-center gap-2">
                                <button className="bg-green-500 hover:bg-green-800 text-white py-1 px-3 rounded text-sm"
                                    onClick={() => handleEditClick(guardian.id)}>
                                    Editar
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <ToastContainer />
        </div>
    );

};

export default CoachList;

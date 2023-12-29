"use client"
import { useEffect, useState } from 'react';

const CoachList = () => {
    const [coaches, setCoaches] = useState([]);

    useEffect(() => {
        const fetchCoaches = async () => {
            try {
                const response = await fetch('http://localhost:8080/coach');
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
    }, []);

    return (
        <table className="min-w-full">
            <thead>
                <tr>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Nome</th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">CPF</th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Telefone</th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Status</th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Data de nascimento</th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Treinos</th>
                </tr>
            </thead>
            <tbody>
                {coaches.map(coach => (
                    <tr key={coach.cpf}>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{coach.name}</td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{coach.cpf}</td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{coach.phone}</td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{coach.status}</td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{coach.birthDay}</td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{coach.schedules}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default CoachList;

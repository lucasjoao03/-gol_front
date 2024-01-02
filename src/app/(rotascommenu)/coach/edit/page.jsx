'use client'

import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CoachUpdate = () => {
    const editingCoachId = localStorage.getItem('editingCoachId');
    const [formData, setFormData] = useState({
        id: editingCoachId,
        name: '',
        cpf: '',
        phone: '',
        status: '',
        birthDay: ''
    });

    useEffect(() => {
        
        const fetchCoach = async () => {
            try {
                const response = await fetch(`http://localhost:8080/coach/${editingCoachId}`);
                const data = await response.json();
                setFormData({ id: data.id, name: data.name, cpf: data.cpf, phone: data.phone, status: data.status, birthDay: data.birthDay });
            } catch (error) {
                console.error('Erro ao buscar dados do treinador', error);
            }
        };

        fetchCoach();
    }, [editingCoachId]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }
        try {
            const response = await fetch(`http://localhost:8080/coach/${editingCoachId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                toast.error('Verifique os dados inseridos! Atualização não realizada.');

                throw new Error(`HTTP error! status: ${response.status}`);

            }else {
                toast.success('Treinador atualizado com sucesso!');
            }
        } catch (error) {
            console.error('Error:', error);
            console.error('Error Response:', errorResponse);
            toast.error('Erro ao atualizar treinador.');
        }
    };

    const validateForm = () => {
        if (!formData.name.trim()) {
            toast.error('O nome é obrigatório.');
            return false;
        }
        
        return true;
    };
    

    return (
        <div className="container mx-auto p-4">
            <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Nome
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name" type="text" placeholder="Nome" name="name" value={formData.name} onChange={handleChange} />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cpf">
                        CPF
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="cpf" type="text" placeholder="CPF" name="cpf" value={formData.cpf} onChange={handleChange} />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                        Telefone
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="phone" type="text" placeholder="Telefone" name="phone" value={formData.phone} onChange={handleChange} />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
                        Status
                    </label>
                    <select
                        className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="status" name="status" value={formData.status} onChange={handleChange}>
                        <option value="ACTIVE">Ativo</option>
                        <option value="INACTIVE">Inativo</option>
                        <option value="VACATION">Férias</option>
                    </select>
                </div>
                <div className="flex items-center justify-between">
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Atualizar
                    </button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default CoachUpdate;

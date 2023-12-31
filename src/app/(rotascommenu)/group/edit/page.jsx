'use client'

import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CoachUpdate = () => {
    const editingGroupId = localStorage.getItem('editingGroupId');
    const [formData, setFormData] = useState({
        id: editingGroupId,
        name: '',
        status: ''
       
    });

    useEffect(() => {
        
        const fetchCoach = async () => {
            try {
                const response = await fetch(`http://localhost:8080/group/${editingGroupId}`);
                const data = await response.json();
                setFormData({ id: data.id, name: data.name, status: data.status});
            } catch (error) {
                console.error('Erro ao buscar dados da turma', error);
            }
        };

        fetchCoach();
    }, [editingGroupId]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }
        try {
            const response = await fetch(`http://localhost:8080/group/${editingGroupId}`, {
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
                toast.success('Turma atualizada com sucesso!');
            }
        } catch (error) {
            console.error('Error:', error);
            console.error('Error Response:', errorResponse);
            toast.error('Erro ao atualizar turma.');
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
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Atualizar
                    </button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default CoachUpdate;
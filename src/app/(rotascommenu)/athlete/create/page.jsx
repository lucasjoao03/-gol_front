'use client'
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AlunoForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    height: '',
    weight: '',
    status: 'ACTIVE',
    birthDate: '',
    guardian: {
      cpf: '',
    },
    group: {
      id: '',
    },
  });

  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch('http://localhost:8080/group');
        if (response.ok) {
          const data = await response.json();
          setGroups(data.content);
        }
      } catch (error) {
        console.error('Erro ao buscar grupos:', error);
      }
    };

    fetchGroups();
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('guardian.')) {
      setFormData({
        ...formData,
        guardian: { ...formData.guardian, [name.split('.')[1]]: value },
      });
    } else if (name === 'group.id') {
      setFormData({
        ...formData,
        group: { id: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const formatFormData = (data) => {
    return {
      ...data,
      birthDate: new Date(data.birthDate).toISOString(),
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = formatFormData(formData);

    try {
      const response = await fetch('http://localhost:8080/athlete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        toast.success('Atleta cadastrado com sucesso!');
      } else {
        const errorData = await response.json();
        toast.error('Erro ao cadastrar o atleta!')
        console.error("Erro na resposta:", errorData);
        
      }
    } catch (error) {
      console.error("Erro ao cadastrar aluno:", error);
    }
  };

  return (
    <div>
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-semibold mb-5 text-center">Cadastro de Aluno</h2>

      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
          Nome:
        </label>
        <input
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nome do aluno"
        />
      </div>

      <div className="mb-4 grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="height" className="block text-gray-700 text-sm font-bold mb-2">
            Altura (cm):
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
            type="number"
            name="height"
            id="height"
            value={formData.height}
            onChange={handleChange}
            placeholder="Altura em cm"
          />
        </div>

        <div>
          <label htmlFor="weight" className="block text-gray-700 text-sm font-bold mb-2">
            Peso (kg):
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
            type="number"
            name="weight"
            id="weight"
            value={formData.weight}
            onChange={handleChange}
            placeholder="Peso em kg"
          />
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="birthDate" className="block text-gray-700 text-sm font-bold mb-2">
          Data de Nascimento:
        </label>
        <input
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
          type="date"
          name="birthDate"
          id="birthDate"
          value={formData.birthDate}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="guardianCpf" className="block text-gray-700 text-sm font-bold mb-2">
          CPF do Responsável:
        </label>
        <input
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
          type="text"
          name="guardian.cpf"
          id="guardianCpf"
          value={formData.guardian.cpf}
          onChange={handleChange}
          placeholder="CPF do responsável"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="groupId" className="block text-gray-700 text-sm font-bold mb-2">
          Grupo:
        </label>
        <select
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
          name="group.id"
          id="groupId"
          value={formData.group.id}
          onChange={handleChange}
        >
          <option value="">Selecione um grupo</option>
          {groups.map((group) => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Cadastrar Aluno
      </button>
    </form>
    <ToastContainer/>
    </div>
  );
};

export default AlunoForm;







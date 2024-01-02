'use client'

import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GroupList = () => {
  const [groups, setGroups] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchCoaches = async () => {
      const url = filter === 'all'
        ? 'http://localhost:8080/group'
        : `http://localhost:8080/group/${filter}`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Erro HTTP: ${response.status}`);
        }
        const data = await response.json();
        setGroups(data.content);
      } catch (error) {
        console.error("Erro ao buscar turmas", error);
      }
    };

    fetchCoaches();
  }, [filter]);

  const handleEditClick = async (groupId) => {
    localStorage.setItem('editingGroupId', groupId);
    window.location.href = '/group/edit';
  };

  const handleInactiveClick = async (groupId) => {
    try {
      const response = await fetch(`http://localhost:8080/group/${groupId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        toast.error('Turma já inativa!');
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      window.location.reload();
    } catch (error) {
      console.error("Erro ao mudar status de turma para inativa", error);
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
              <path d="M5.8 6.5l4.2 4.2 4.2-4.2 1.4 1.4-5.6 5.6-5.6-5.6z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="max-h-[500px] overflow-auto">
        <div className="flex flex-wrap">
          {groups.map((group, index) => (
            <div key={index} className="p-2 w-full md:w-1/2 lg:w-1/3">
              <div className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-between h-full">
                <div>
                  <h2 className="font-bold text-lg mb-2">{group.name}</h2>
                  <p>{group.description}</p>
                  <span className={`inline-block rounded-full text-xs font-semibold mr-2 px-2.5 py-0.5 ${group.status === 'ACTIVE'
                      ? 'bg-blue-100 text-blue-800'
                      : group.status === 'VACATION'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                    {group.status}
                  </span>
                </div>
                <div className="mt-4">
                  <button className="bg-green-500 hover:bg-green-800 text-white py-1 px-3 rounded text-sm mr-2"
                    onClick={() => handleEditClick(group.id)}>
                    Editar
                  </button>
                  <button className="bg-green-500 hover:bg-green-800 text-white py-1 px-3 rounded text-sm"
                    onClick={() => handleInactiveClick(group.id)}>
                    Inativo
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default GroupList;


'use client'

import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ScheduleForm = () => {
  const [groups, setGroups] = useState([]);
  const [coaches, setCoaches] = useState([]);
  const [formData, setFormData] = useState({
    groupId: '',
    coachId: '',
    schedules: [],
  });

  /* const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }; */

  const handleScheduleChange = (index, event) => {
    const updatedSchedules = [...formData.schedules];
    updatedSchedules[index] = {
      ...updatedSchedules[index],
      [event.target.name]: event.target.value,
    };
    setFormData({ ...formData, schedules: updatedSchedules });
  };

  const addSchedule = () => {
    setFormData({
      ...formData,
      schedules: [...formData.schedules, { dayOfWeek: '', startTime: '', endTime: '' }],
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'group.id') {
      setFormData({ ...formData, groupId: value });
    } else if (name === 'coach.id') {
      setFormData({ ...formData, coachId: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  

    useEffect(() => {
      const fetchData = async () => {
        try {
          const groupResponse = await fetch('http://localhost:8080/group');
          const coachResponse = await fetch('http://localhost:8080/coach');
  
          if (groupResponse.ok) {
            const groupData = await groupResponse.json();
            setGroups(groupData.content);
          }
  
          if (coachResponse.ok) {
            const coachData = await coachResponse.json();
            setCoaches(coachData.content);
          }
  
        } catch (error) {
          console.error('Erro ao buscar dados:', error);
        }
      };

      fetchData();
    }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/trainings/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Treino cadastrado com sucesso!');
      } else {
        toast.error('Erro ao cadastrar treino!');
        console.error('Submission failed', await response.json());
      }
    } catch (error) {
      console.error('Error submitting form', error);
    }
  };

  return (
    <div>
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 space-y-4">
      <div className="mb-6">
        <label htmlFor="coachId" className="block text-gray-700 text-sm font-bold mb-2">
          Treinador:
        </label>
        <select
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
          name="coach.id"
          id="coachId"
          value={formData.coachId}
          onChange={handleChange}
        >
          <option value="">Selecione um treinador</option>
          {coaches.map((coach) => (
            <option key={coach.id} value={coach.id}>
              {coach.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-6">
        <label htmlFor="groupId" className="block text-gray-700 text-sm font-bold mb-2">
          Grupo:
        </label>
        <select
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
          name="group.id"
          id="groupId"
          value={formData.groupId}
          onChange={handleChange}
        >
          <option value="">Selecione uma Turma</option>
          {groups.map((group) => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </select>
      </div>
      {formData.schedules.map((schedule, index) => (
        <div key={index} className="flex space-x-2">
          <select
            name="dayOfWeek"
            value={schedule.dayOfWeek}
            onChange={(e) => handleScheduleChange(index, e)}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="">Selecione um dia</option>
            <option value="MONDAY">Segunda-feira</option>
            <option value="TUESDAY">Terça-feira</option>
            <option value="WEDNESDAY">Quarta-feira</option>
            <option value="THURSDAY">Quinta-feira</option>
            <option value="FRIDAY">Sexta-feira</option>
          </select>
          <input
            type="time"
            name="startTime"
            value={schedule.startTime}
            onChange={(e) => handleScheduleChange(index, e)}
            className="p-2 border border-gray-300 rounded-md"
          />
          <input
            type="time"
            name="endTime"
            value={schedule.endTime}
            onChange={(e) => handleScheduleChange(index, e)}
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>
      ))}
      <button
        type="button"
        onClick={addSchedule}
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Horários
      </button>
      <button
        type="submit"
        className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Agendar
      </button>
    </form>
    <ToastContainer/>
    </div>
  );
};

export default ScheduleForm;


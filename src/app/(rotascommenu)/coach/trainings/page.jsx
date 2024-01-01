'use client'

import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CoachListTrainings = () => {
    const editingCoachCpf = localStorage.getItem('editingCoachCpf');
    const [coaches, setCoaches] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`http://localhost:8080/trainings/coach/${editingCoachCpf}`, {
                
            });
            if (response.ok) {
                const data = await response.json();
                setCoaches(data);
              }
          } catch (error) {
            console.error("Erro ao buscar tarefas:", error);
          }
        };
  
        fetchData();
      }, [editingCoachCpf]);

      const formatTime = (timeArray) => {
        return `${timeArray[0].toString().padStart(2, '0')}:${timeArray[1].toString().padStart(2, '0')}`;
    };

      return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-semibold mb-4">Horários de Treino</h1>
            {coaches.length > 0 ? (
                coaches.map((coach, index) => (
                    <div key={index} className="bg-white shadow-lg rounded-lg p-4 mb-4">
                        <h2 className="text-xl font-bold mb-2">Grupo: {coach.groupName}</h2>
                        {coach.schedules.map((schedule, idx) => (
                            <div key={idx} className="mb-2">
                                <p><strong>Dia da Semana:</strong> {schedule.dayOfWeek}</p>
                                <p><strong>Horário:</strong> {formatTime(schedule.startTime)} - {formatTime(schedule.endTime)}</p>
                            </div>
                        ))}
                    </div>
                ))
            ) : (
                <div className="text-center text-gray-600">Sem treinos cadastrados</div>
            )}
            <ToastContainer/>
        </div>
    );
};

export default CoachListTrainings;
import React, { useEffect, useState } from 'react';

export default function CompletedAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:7777/api/agendamentos?status=concluido', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) {
          setMensagem('Erro ao buscar agendamentos concluídos');
          return;
        }
        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        setMensagem('Erro ao conectar com o servidor');
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div>
      <h2>Agendamentos Concluídos</h2>
      {mensagem && <p>{mensagem}</p>}
      <ul>
        {appointments.length === 0 && <li>Nenhum agendamento concluído</li>}
        {appointments.map((appt) => (
          <li key={appt._id}>
            Serviço: {appt.service} | Data: {new Date(appt.date).toLocaleString()} | Observações: {appt.notes}
          </li>
        ))}
      </ul>
    </div>
  );
}

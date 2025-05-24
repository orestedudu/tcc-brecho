import { useState } from 'react';

export default function NewAppointment() {
  const [servico, setServico] = useState('');
  const [data, setData] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleAgendar = async (e) => {
  e.preventDefault();
  setMensagem('');

    try {
      const token = localStorage.getItem('token');
      console.log('Token no localStorage:', token);

      const response = await fetch('http://localhost:7777/api/agendamentos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          service: servico,
          date: data,
          notes: observacoes,
        }),
      });

      const resData = await response.json();
      console.log('Resposta da API:', resData);

      if (!response.ok) {
        return setMensagem(resData.message || 'Erro ao agendar');
      }

      setMensagem('Agendamento realizado com sucesso!');
      setServico('');
      setData('');
      setObservacoes('');
    } catch (err) {
      console.error(err);
      setMensagem('Erro ao conectar com o servidor');
    }
  };

  return (
    <form onSubmit={handleAgendar}>
      <h2>Agendar novo horário</h2>
      {mensagem && <p>{mensagem}</p>}
      <div>
        <label>Serviço:</label><br />
        <input
          type="text"
          value={servico}
          onChange={(e) => setServico(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Data e Hora:</label><br />
        <input
          type="datetime-local"
          value={data}
          onChange={(e) => setData(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Observações:</label><br />
        <textarea
          value={observacoes}
          onChange={(e) => setObservacoes(e.target.value)}
        />
      </div>
      <button type="submit">Agendar</button>
    </form>
  );
}

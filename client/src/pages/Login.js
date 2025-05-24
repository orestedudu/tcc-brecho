import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');

    try {
      const response = await fetch('http://localhost:7777/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      });

      if (!response.ok) {
        const data = await response.json();
        setErro(data.mensagem || 'Erro no login');
        return;
      }

      const data = await response.json();
      onLogin(data.token); // guarda o token no componente pai
      navigate('/home'); // redireciona para /home
    } catch {
      setErro('Erro ao conectar com o servidor');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      {erro && <p style={{ color: 'red' }}>{erro}</p>}
      <div>
        <label>Email:</label><br />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Senha:</label><br />
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
      </div>
      <button type="submit">Entrar</button>
    </form>
  );
}

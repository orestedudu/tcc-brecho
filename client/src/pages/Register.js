// src/pages/Register.js
import React, { useState } from 'react';

export default function Register() {
  const [nome, setNome] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [senha, setSenha] = React.useState('');
  const [mensagem, setMensagem] = React.useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const usuario = { nome, email, senha };

    try {
      const res = await fetch('http://localhost:7777/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuario),
      });

      const data = await res.json();

      if (res.ok) {
        setMensagem('Cadastro realizado com sucesso! Você já pode fazer login.');
        setNome('');
        setEmail('');
        setSenha('');
      } else {
        setMensagem(data.mensagem || 'Erro ao cadastrar usuário.');
      }
    } catch (error) {
      setMensagem('Erro ao conectar com o servidor.');
    }
  };

  return (
    <div>
      <h2>Registrar Usuário</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
        </div>

        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>

        <div>
          <label>Senha:</label>
          <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
        </div>

        <button type="submit">Registrar</button>
      </form>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
}

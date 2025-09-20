import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function NewCategory() {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [mensagem, setMensagem] = useState('');

  const navigate = useNavigate();

  const handleCriarCategoria = async (e) => {
    e.preventDefault();
    setMensagem('');

    try {
      const token = localStorage.getItem('token'); // se você usar autenticação

      const response = await fetch('http://localhost:7777/api/categorias/criar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          nome,
          descricao,
        }),
      });

      const resData = await response.json();

      if (!response.ok) {
        return setMensagem(resData.mensagem || 'Erro ao criar categoria');
      }

      setMensagem('Categoria criada com sucesso!');

      // Limpa os campos
      setNome('');
      setDescricao('');

      // Redireciona para a lista de categorias (opcional)
      navigate('/categorias');

    } catch (err) {
      console.error(err);
      setMensagem('Erro ao conectar com o servidor');
    }
  };

  return (
    <div 
      style={{ 
        backgroundImage: "url('/images/brecho.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
      className="d-flex justify-content-center align-items-center"
    >
      <div className="card shadow p-4 bg-light" style={{ maxWidth: '500px', width: '100%', opacity: 0.95 }}>
        <h2 className="text-center text-primary mb-4">Cadastrar Categoria</h2>

        {mensagem && (
          <div className={`alert ${mensagem.includes('sucesso') ? 'alert-success' : 'alert-danger'}`} role="alert">
            {mensagem}
          </div>
        )}

        <form onSubmit={handleCriarCategoria}>
          <div className="mb-3">
            <label className="form-label">Nome da Categoria:</label>
            <input
              type="text"
              className="form-control"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Descrição (opcional):</label>
            <textarea
              className="form-control"
              rows="3"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Cadastrar
          </button>
        </form>

        <Link to="/" className="btn btn-secondary mt-4 w-100">
          Voltar
        </Link>

      </div>
    </div>
  );
}

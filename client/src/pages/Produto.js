import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function NewProduct() {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [tamanho, setTamanho] = useState('');
  const [cor, setCor] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [mensagem, setMensagem] = useState('');

  const navigate = useNavigate();

  const handleCriarProduto = async (e) => {
    e.preventDefault();
    setMensagem('');

    try {
      const token = localStorage.getItem('token'); // se usar autenticação

      const response = await fetch('http://localhost:7777/api/produtos/criar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          nome,
          preco,
          tamanho,
          cor,
          observacoes,
        }),
      });

      const resData = await response.json();

      if (!response.ok) {
        return setMensagem(resData.mensagem || 'Erro ao criar produto');
      }

      setMensagem('Produto criado com sucesso!');

      // Limpa os campos
      setNome('');
      setPreco('');
      setTamanho('');
      setCor('');
      setObservacoes('');

      // Redireciona para a lista de produtos (ajuste conforme sua rota)
      navigate('/');

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
        <h2 className="text-center text-primary mb-4">Cadastrar Produto</h2>

        {mensagem && (
          <div className={`alert ${mensagem.includes('sucesso') ? 'alert-success' : 'alert-danger'}`} role="alert">
            {mensagem}
          </div>
        )}

        <form onSubmit={handleCriarProduto}>
          <div className="mb-3">
            <label className="form-label">Nome do Produto:</label>
            <input
              type="text"
              className="form-control"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Preço (R$):</label>
            <input
              type="number"
              step="0.01"
              className="form-control"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Tamanho:</label>
            <input
              type="text"
              className="form-control"
              value={tamanho}
              onChange={(e) => setTamanho(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Cor:</label>
            <input
              type="text"
              className="form-control"
              value={cor}
              onChange={(e) => setCor(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Observações (opcional):</label>
            <textarea
              className="form-control"
              rows="3"
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
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

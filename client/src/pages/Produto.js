import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function NewProduct() {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [tamanho, setTamanho] = useState('');
  const [cor, setCor] = useState('');
  const [observacoes, setObservacoes] = useState('');

  const [categoria, setCategoria] = useState('');
  const [categorias, setCategorias] = useState([]);

  const [mensagem, setMensagem] = useState('');
  const [carregando, setCarregando] = useState(false);

  const navigate = useNavigate();

  // Buscar categorias
  useEffect(() => {
    const buscarCategorias = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await fetch('http://localhost:7777/api/categorias/listar', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setCategorias(data);
        }

      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
      }
    };

    buscarCategorias();
  }, []);

  const handleCriarProduto = async (e) => {
    e.preventDefault();
    setMensagem('');
    setCarregando(true);

    try {
      const token = localStorage.getItem('token');

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
          categoria,
        }),
      });

      const resData = await response.json();

      if (!response.ok) {
        setMensagem(resData.mensagem || 'Erro ao criar produto');
        setCarregando(false);
        return;
      }

      setMensagem('Produto criado com sucesso!');

      // Limpar campos
      setNome('');
      setPreco('');
      setTamanho('');
      setCor('');
      setObservacoes('');
      setCategoria('');

      navigate('/');

    } catch (err) {
      console.error(err);
      setMensagem('Erro ao conectar com o servidor');
      setCarregando(false);
    }
  };

  return (
    <div className="bk-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;1,9..144,500&family=DM+Sans:wght@400;500;700&display=swap');

        .bk-page {
          min-height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          box-sizing: border-box;
          background:
            radial-gradient(circle at 15% 20%, rgba(232, 214, 212, 0.55), transparent 45%),
            radial-gradient(circle at 85% 80%, rgba(127, 85, 57, 0.28), transparent 55%),
            url('/images/brecho.png');
          background-size: cover;
          background-position: center;
          font-family: 'DM Sans', sans-serif;
        }

        .bk-tag-wrap {
          position: relative;
          width: 100%;
          max-width: 560px;
          transform: rotate(-1deg);
          transition: transform 0.35s ease;
        }
        .bk-tag-wrap:focus-within,
        .bk-tag-wrap:hover {
          transform: rotate(0deg);
        }
        @media (prefers-reduced-motion: reduce) {
          .bk-tag-wrap { transition: none; }
        }

        .bk-string {
          position: absolute;
          top: -46px;
          left: 38px;
          width: 60px;
          height: 60px;
          pointer-events: none;
        }

        .bk-card {
          position: relative;
          background: #fffdfa;
          border: 1.5px solid #e8d6d4;
          border-radius: 18px 18px 18px 4px;
          padding: 40px 36px 34px;
          box-shadow: 0 20px 45px -18px rgba(127, 85, 57, 0.35);
        }

        .bk-card::before {
          content: '';
          position: absolute;
          top: 22px;
          left: 22px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #f7f3ff;
          border: 2.5px solid #7f5539;
          box-shadow: inset 0 1px 2px rgba(0,0,0,0.15);
        }

        .bk-card::after {
          content: '';
          position: absolute;
          inset: 10px;
          border: 1.5px dashed rgba(127, 85, 57, 0.28);
          border-radius: 12px 12px 12px 2px;
          pointer-events: none;
        }

        .bk-eyebrow {
          margin: 0 0 2px 24px;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #a9806c;
          font-weight: 700;
        }

        .bk-brand {
          margin: 0 0 26px 24px;
          font-family: 'Fraunces', serif;
          font-style: italic;
          font-weight: 600;
          font-size: 30px;
          color: #7f5539;
          line-height: 1.15;
        }

        .bk-mensagem {
          margin: 0 0 18px;
          padding: 10px 14px;
          background: rgba(232, 214, 212, 0.55);
          border: 1px solid #e8d6d4;
          border-left: 3px solid #a1443b;
          border-radius: 6px;
          color: #7a3229;
          font-size: 13.5px;
          font-weight: 500;
        }

        .bk-mensagem.bk-ok {
          background: rgba(127, 85, 57, 0.08);
          border-color: #e8d6d4;
          border-left-color: #5c7a52;
          color: #4a6440;
        }

        .bk-group {
          margin-bottom: 18px;
        }

        .bk-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        @media (max-width: 480px) {
          .bk-row {
            grid-template-columns: 1fr;
          }
        }

        .bk-label {
          display: block;
          margin-bottom: 6px;
          font-size: 12.5px;
          font-weight: 700;
          letter-spacing: 0.03em;
          color: #7f5539;
        }

        .bk-input,
        .bk-select,
        .bk-textarea {
          width: 100%;
          box-sizing: border-box;
          padding: 11px 14px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14.5px;
          color: #4a3327;
          background: #f7f3ff;
          border: 1.5px solid #e8d6d4;
          border-radius: 10px;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .bk-textarea {
          resize: vertical;
          min-height: 80px;
          font-family: 'DM Sans', sans-serif;
        }

        .bk-select {
          appearance: none;
          -webkit-appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%237f5539' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 14px center;
          padding-right: 36px;
        }

        .bk-input::placeholder { color: #b7a89f; }

        .bk-input:focus,
        .bk-select:focus,
        .bk-textarea:focus {
          border-color: #7f5539;
          box-shadow: 0 0 0 3px rgba(127, 85, 57, 0.15);
        }

        .bk-price-wrap {
          position: relative;
        }

        .bk-price-prefix {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 14px;
          color: #a9806c;
          font-weight: 600;
          pointer-events: none;
        }

        .bk-price-wrap .bk-input {
          padding-left: 38px;
        }

        .bk-actions {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 28px;
        }

        .bk-submit {
          width: 100%;
          padding: 12px 16px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14.5px;
          font-weight: 700;
          letter-spacing: 0.02em;
          color: #fffdfa;
          background: #7f5539;
          border: none;
          border-radius: 999px;
          cursor: pointer;
          transition: background 0.2s ease, transform 0.15s ease;
        }

        .bk-submit:hover { background: #6a4530; }
        .bk-submit:active { transform: scale(0.98); }
        .bk-submit:disabled { opacity: 0.65; cursor: not-allowed; }
        .bk-submit:focus-visible {
          outline: 2.5px solid #7f5539;
          outline-offset: 3px;
        }

        .bk-voltar {
          display: block;
          width: 100%;
          box-sizing: border-box;
          text-align: center;
          padding: 11px 16px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 700;
          color: #7f5539;
          background: transparent;
          border: 1.5px solid #e8d6d4;
          border-radius: 999px;
          text-decoration: none;
          transition: border-color 0.2s ease, background 0.2s ease;
        }

        .bk-voltar:hover {
          border-color: #7f5539;
          background: rgba(232, 214, 212, 0.3);
        }

        .bk-voltar:focus-visible {
          outline: 2.5px solid #7f5539;
          outline-offset: 2px;
        }
      `}</style>

      <div className="bk-tag-wrap">
        <svg className="bk-string" viewBox="0 0 60 60" fill="none">
          <path
            d="M40 60 C 40 30, 10 30, 28 8"
            stroke="#7f5539"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            opacity="0.55"
          />
        </svg>

        <div className="bk-card">
          <p className="bk-eyebrow">Novo item</p>
          <h1 className="bk-brand">Cadastrar peça</h1>

          <form onSubmit={handleCriarProduto} noValidate>
            {mensagem && (
              <p className={`bk-mensagem ${mensagem.includes('sucesso') ? 'bk-ok' : ''}`}>
                {mensagem}
              </p>
            )}

            <div className="bk-group">
              <label htmlFor="nome" className="bk-label">Nome do produto</label>
              <input
                type="text"
                id="nome"
                className="bk-input"
                placeholder="ex: vestido floral"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>

            <div className="bk-group">
              <label htmlFor="categoria" className="bk-label">Categoria</label>
              <select
                id="categoria"
                className="bk-select"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                required
              >
                <option value="">Selecione uma categoria</option>
                {categorias.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.nome}
                  </option>
                ))}
              </select>
            </div>

            <div className="bk-group">
              <label htmlFor="preco" className="bk-label">Preço</label>
              <div className="bk-price-wrap">
                <span className="bk-price-prefix">R$</span>
                <input
                  type="number"
                  step="0.01"
                  id="preco"
                  className="bk-input"
                  placeholder="0,00"
                  value={preco}
                  onChange={(e) => setPreco(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="bk-row">
              <div className="bk-group">
                <label htmlFor="tamanho" className="bk-label">Tamanho</label>
                <input
                  type="text"
                  id="tamanho"
                  className="bk-input"
                  placeholder="ex: M"
                  value={tamanho}
                  onChange={(e) => setTamanho(e.target.value)}
                  required
                />
              </div>

              <div className="bk-group">
                <label htmlFor="cor" className="bk-label">Cor</label>
                <input
                  type="text"
                  id="cor"
                  className="bk-input"
                  placeholder="ex: verde"
                  value={cor}
                  onChange={(e) => setCor(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="bk-group">
              <label htmlFor="observacoes" className="bk-label">Observações</label>
              <textarea
                id="observacoes"
                className="bk-textarea"
                rows="3"
                placeholder="detalhes, estado da peça, marca..."
                value={observacoes}
                onChange={(e) => setObservacoes(e.target.value)}
              />
            </div>

            <div className="bk-actions">
              <button type="submit" className="bk-submit" disabled={carregando}>
                {carregando ? 'Cadastrando...' : 'Cadastrar'}
              </button>
              <Link to="/" className="bk-voltar">Voltar</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

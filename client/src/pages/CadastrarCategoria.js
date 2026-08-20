import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function NewCategory() {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [carregando, setCarregando] = useState(false);

  const navigate = useNavigate();

  const handleCriarCategoria = async (e) => {
    e.preventDefault();
    setMensagem('');
    setCarregando(true);

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
        setMensagem(resData.mensagem || 'Erro ao criar categoria');
        setCarregando(false);
        return;
      }

      setMensagem('Categoria criada com sucesso!');

      // Limpa os campos
      setNome('');
      setDescricao('');
      setCarregando(false);

      // Redireciona para a lista de categorias (opcional)
      navigate('/categorias/listar');

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
          padding: 32px 20px;
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
          max-width: 420px;
          transform: rotate(1.5deg);
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
          right: 38px;
          width: 60px;
          height: 60px;
          pointer-events: none;
          transform: scaleX(-1);
        }

        .bk-card {
          position: relative;
          background: #fffdfa;
          border: 1.5px solid #e8d6d4;
          border-radius: 18px 18px 4px 18px;
          padding: 40px 34px 34px;
          box-shadow: 0 20px 45px -18px rgba(127, 85, 57, 0.35);
        }

        .bk-card::before {
          content: '';
          position: absolute;
          top: 22px;
          right: 22px;
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
          border-radius: 12px 12px 2px 12px;
          pointer-events: none;
        }

        .bk-eyebrow {
          margin: 0 0 2px 0;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #a9806c;
          font-weight: 700;
        }

        .bk-brand {
          margin: 0 0 26px 0;
          font-family: 'Fraunces', serif;
          font-style: italic;
          font-weight: 600;
          font-size: 28px;
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

        .bk-label {
          display: block;
          margin-bottom: 6px;
          font-size: 12.5px;
          font-weight: 700;
          letter-spacing: 0.03em;
          color: #7f5539;
        }

        .bk-input,
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
          min-height: 90px;
          font-family: 'DM Sans', sans-serif;
        }

        .bk-input::placeholder,
        .bk-textarea::placeholder {
          color: #b7a89f;
        }

        .bk-input:focus,
        .bk-textarea:focus {
          border-color: #7f5539;
          box-shadow: 0 0 0 3px rgba(127, 85, 57, 0.15);
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
          <p className="bk-eyebrow">Organização</p>
          <h1 className="bk-brand">Cadastrar categoria</h1>

          <form onSubmit={handleCriarCategoria} noValidate>
            {mensagem && (
              <p className={`bk-mensagem ${mensagem.includes('sucesso') ? 'bk-ok' : ''}`}>
                {mensagem}
              </p>
            )}

            <div className="bk-group">
              <label htmlFor="nome" className="bk-label">Nome da categoria</label>
              <input
                type="text"
                id="nome"
                className="bk-input"
                placeholder="ex: vestidos"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>

            <div className="bk-group">
              <label htmlFor="descricao" className="bk-label">Descrição (opcional)</label>
              <textarea
                id="descricao"
                className="bk-textarea"
                rows="3"
                placeholder="breve descrição da categoria"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
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

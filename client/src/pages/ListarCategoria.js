import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function ListarCategorias() {
    const [categorias, setCategorias] = useState([]);
    const [mensagem, setMensagem] = useState('');

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const token = localStorage.getItem('token');

                const response = await fetch('http://localhost:7777/api/categorias/listar', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                const data = await response.json();

                if (!response.ok) {
                    setMensagem(data.mensagem || 'Erro ao buscar categorias');
                } else {
                    setCategorias(data);
                }
            } catch (err) {
                console.error(err);
                setMensagem('Erro ao conectar com o servidor');
            }
        };

        fetchCategorias();
    }, []);

    // 🗑️ FUNÇÃO EXCLUIR
    const excluirCategoria = async (id) => {
        const confirmar = window.confirm('Tem certeza que deseja excluir esta categoria?');

        if (!confirmar) return;

        try {
            const token = localStorage.getItem('token');

            const response = await fetch(`http://localhost:7777/api/categorias/excluir/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (!response.ok) {
                setMensagem(data.mensagem || 'Erro ao excluir categoria');
            } else {
                setMensagem('Categoria excluída com sucesso');

                // remove da lista sem recarregar
                setCategorias(categorias.filter(cat => cat._id !== id));
            }
        } catch (err) {
            console.error(err);
            setMensagem('Erro ao conectar com o servidor');
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
                    align-items: flex-start;
                    justify-content: center;
                    padding: 48px 20px;
                    box-sizing: border-box;
                    background:
                        radial-gradient(circle at 12% 15%, rgba(232, 214, 212, 0.5), transparent 45%),
                        radial-gradient(circle at 88% 85%, rgba(127, 85, 57, 0.28), transparent 55%),
                        url('/images/brecho.png');
                    background-size: cover;
                    background-position: center;
                    background-attachment: fixed;
                    font-family: 'DM Sans', sans-serif;
                }

                .bk-wrap {
                    position: relative;
                    width: 100%;
                    max-width: 800px;
                }

                .bk-string {
                    position: absolute;
                    top: -46px;
                    left: 38px;
                    width: 60px;
                    height: 60px;
                    pointer-events: none;
                    z-index: 1;
                }

                .bk-card {
                    position: relative;
                    background: #fffdfa;
                    border: 1.5px solid #e8d6d4;
                    border-radius: 18px 18px 18px 4px;
                    padding: 38px 32px 34px;
                    box-shadow: 0 24px 55px -20px rgba(127, 85, 57, 0.4);
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

                .bk-header {
                    margin: 0 0 28px 24px;
                }

                .bk-eyebrow {
                    margin: 0 0 2px;
                    font-size: 11px;
                    letter-spacing: 0.18em;
                    text-transform: uppercase;
                    color: #a9806c;
                    font-weight: 700;
                }

                .bk-brand {
                    margin: 0;
                    font-family: 'Fraunces', serif;
                    font-style: italic;
                    font-weight: 600;
                    font-size: 30px;
                    color: #7f5539;
                    line-height: 1.15;
                }

                .bk-mensagem {
                    margin: 0 0 22px;
                    padding: 10px 14px;
                    background: rgba(127, 85, 57, 0.08);
                    border: 1px solid #e8d6d4;
                    border-left: 3px solid #5c7a52;
                    border-radius: 6px;
                    color: #4a6440;
                    font-size: 13.5px;
                    font-weight: 500;
                }

                .bk-mensagem.bk-erro {
                    background: rgba(232, 214, 212, 0.55);
                    border-left-color: #a1443b;
                    color: #7a3229;
                }

                .bk-table-scroll {
                    overflow-x: auto;
                    border-radius: 12px;
                    border: 1px solid #e8d6d4;
                }

                .bk-table {
                    width: 100%;
                    border-collapse: collapse;
                    font-size: 13.5px;
                    min-width: 520px;
                }

                .bk-table thead th {
                    text-align: left;
                    padding: 12px 16px;
                    background: rgba(232, 214, 212, 0.45);
                    color: #7f5539;
                    font-weight: 700;
                    font-size: 11.5px;
                    letter-spacing: 0.05em;
                    text-transform: uppercase;
                    white-space: nowrap;
                }

                .bk-table tbody td {
                    padding: 13px 16px;
                    border-top: 1px solid #f0e6e4;
                    color: #4a3327;
                    vertical-align: middle;
                }

                .bk-table tbody tr:hover {
                    background: rgba(247, 243, 255, 0.7);
                }

                .bk-desc {
                    color: #8a7a6f;
                    max-width: 260px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                .bk-badge {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    min-width: 24px;
                    padding: 2px 9px;
                    border-radius: 999px;
                    background: rgba(127, 85, 57, 0.12);
                    color: #7f5539;
                    font-weight: 700;
                    font-size: 12.5px;
                }

                .bk-acoes {
                    display: flex;
                    gap: 8px;
                    white-space: nowrap;
                }

                .bk-btn-editar,
                .bk-btn-excluir {
                    padding: 6px 14px;
                    font-family: 'DM Sans', sans-serif;
                    font-size: 12.5px;
                    font-weight: 700;
                    border-radius: 999px;
                    cursor: pointer;
                    text-decoration: none;
                    border: 1.5px solid transparent;
                    transition: background 0.2s ease, border-color 0.2s ease;
                    display: inline-block;
                }

                .bk-btn-editar {
                    color: #7f5539;
                    background: #f7f3ff;
                    border-color: #e8d6d4;
                }
                .bk-btn-editar:hover { border-color: #7f5539; }

                .bk-btn-excluir {
                    color: #a1443b;
                    background: rgba(232, 214, 212, 0.4);
                    border-color: rgba(161, 68, 59, 0.25);
                }
                .bk-btn-excluir:hover { border-color: #a1443b; }

                .bk-vazio {
                    text-align: center;
                    padding: 40px 16px;
                    color: #a9806c;
                    font-size: 14px;
                }

                .bk-rodape {
                    display: flex;
                    gap: 12px;
                    margin-top: 26px;
                    flex-wrap: wrap;
                }

                .bk-btn-primario,
                .bk-btn-secundario {
                    padding: 11px 22px;
                    font-family: 'DM Sans', sans-serif;
                    font-size: 14px;
                    font-weight: 700;
                    border-radius: 999px;
                    text-decoration: none;
                    text-align: center;
                    transition: background 0.2s ease, border-color 0.2s ease;
                }

                .bk-btn-primario {
                    color: #fffdfa;
                    background: #7f5539;
                    border: 1.5px solid #7f5539;
                }
                .bk-btn-primario:hover { background: #6a4530; }

                .bk-btn-secundario {
                    color: #7f5539;
                    background: transparent;
                    border: 1.5px solid #e8d6d4;
                }
                .bk-btn-secundario:hover { border-color: #7f5539; background: rgba(232, 214, 212, 0.3); }

                .bk-btn-primario:focus-visible,
                .bk-btn-secundario:focus-visible,
                .bk-btn-editar:focus-visible,
                .bk-btn-excluir:focus-visible {
                    outline: 2.5px solid #7f5539;
                    outline-offset: 2px;
                }

                /* Tabela vira cartões no mobile */
                @media (max-width: 640px) {
                    .bk-table-scroll { overflow-x: visible; border: none; }
                    .bk-table { min-width: 0; }
                    .bk-table thead { display: none; }
                    .bk-table, .bk-table tbody, .bk-table tr, .bk-table td {
                        display: block;
                        width: 100%;
                    }
                    .bk-table tbody tr {
                        border: 1.5px solid #e8d6d4;
                        border-radius: 12px;
                        margin-bottom: 12px;
                        padding: 8px 4px;
                        background: #fffdfa;
                    }
                    .bk-table tbody tr:hover { background: #fffdfa; }
                    .bk-table td {
                        border-top: none;
                        padding: 6px 14px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        gap: 12px;
                    }
                    .bk-table td::before {
                        content: attr(data-label);
                        font-size: 11px;
                        font-weight: 700;
                        text-transform: uppercase;
                        letter-spacing: 0.04em;
                        color: #a9806c;
                        flex-shrink: 0;
                    }
                    .bk-desc { max-width: 60%; text-align: right; }
                    .bk-acoes { justify-content: flex-end; }
                }
            `}</style>

            <div className="bk-wrap">
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
                    <div className="bk-header">
                        <p className="bk-eyebrow">Organização</p>
                        <h1 className="bk-brand">Categorias cadastradas</h1>
                    </div>

                    {mensagem && (
                        <p className={`bk-mensagem ${mensagem.includes('Erro') ? 'bk-erro' : ''}`}>
                            {mensagem}
                        </p>
                    )}

                    {categorias.length > 0 ? (
                        <div className="bk-table-scroll">
                            <table className="bk-table">
                                <thead>
                                    <tr>
                                        <th>Nome</th>
                                        <th>Descrição</th>
                                        <th>Produtos vinculados</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categorias.map((categoria) => (
                                        <tr key={categoria._id}>
                                            <td data-label="Nome">{categoria.nome}</td>
                                            <td data-label="Descrição" className="bk-desc" title={categoria.descricao || 'Sem descrição'}>
                                                {categoria.descricao || 'Sem descrição'}
                                            </td>
                                            <td data-label="Produtos vinculados">
                                                <span className="bk-badge">{categoria.quantidadeProdutos}</span>
                                            </td>
                                            <td data-label="Ações">
                                                <div className="bk-acoes">
                                                    <Link
                                                        to={`/categorias/editar/${categoria._id}`}
                                                        className="bk-btn-editar"
                                                    >
                                                        Editar
                                                    </Link>
                                                    <button
                                                        onClick={() => excluirCategoria(categoria._id)}
                                                        className="bk-btn-excluir"
                                                    >
                                                        Excluir
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="bk-vazio">Nenhuma categoria cadastrada.</p>
                    )}

                    <div className="bk-rodape">
                        <Link to="/categorias/cadastrar" className="bk-btn-primario">
                            Cadastrar nova categoria
                        </Link>
                        <Link to="/" className="bk-btn-secundario">
                            Voltar
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

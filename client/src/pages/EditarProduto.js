import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditarProduto() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [nome, setNome] = useState('');
    const [preco, setPreco] = useState('');
    const [tamanho, setTamanho] = useState('');
    const [cor, setCor] = useState('');
    const [observacoes, setObservacoes] = useState('');
    const [mensagem, setMensagem] = useState('');

    // 🔎 Buscar produto pelo ID
    useEffect(() => {
        const buscarProduto = async () => {
            try {
                const token = localStorage.getItem('token');

                const response = await fetch(`http://localhost:7777/api/produtos/listar`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                const data = await response.json();

                if (!response.ok) {
                    setMensagem('Erro ao buscar produto');
                    return;
                }

                // encontra o produto pelo ID
                const produto = data.find(prod => prod._id === id);

                if (!produto) {
                    setMensagem('Produto não encontrado');
                    return;
                }

                setNome(produto.nome);
                setPreco(produto.preco);
                setTamanho(produto.tamanho);
                setCor(produto.cor);
                setObservacoes(produto.observacoes || '');

            } catch (err) {
                console.error(err);
                setMensagem('Erro ao carregar dados');
            }
        };

        buscarProduto();
    }, [id]);

    // ✏️ Atualizar produto
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');

            const response = await fetch(`http://localhost:7777/api/produtos/atualizar/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    nome,
                    preco,
                    tamanho,
                    cor,
                    observacoes
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setMensagem(data.mensagem || 'Erro ao atualizar produto');
            } else {
                setMensagem('Produto atualizado com sucesso!');

                setTimeout(() => {
                    navigate('/produtos/listar');
                }, 500);
            }
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
            className="d-flex justify-content-center align-items-center p-4"
        >
            <div className="card shadow p-4 bg-light" style={{ width: '100%', maxWidth: '600px', opacity: 0.95 }}>
                <h2 className="text-center text-warning mb-4">Editar Produto</h2>

                {mensagem && (
                    <div className={`alert ${mensagem.includes('Erro') ? 'alert-danger' : 'alert-success'}`}>
                        {mensagem}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Nome</label>
                        <input
                            type="text"
                            className="form-control"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Preço (R$)</label>
                        <input
                            type="number"
                            className="form-control"
                            value={preco}
                            onChange={(e) => setPreco(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Tamanho</label>
                        <input
                            type="text"
                            className="form-control"
                            value={tamanho}
                            onChange={(e) => setTamanho(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Cor</label>
                        <input
                            type="text"
                            className="form-control"
                            value={cor}
                            onChange={(e) => setCor(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Observações</label>
                        <textarea
                            className="form-control"
                            value={observacoes}
                            onChange={(e) => setObservacoes(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="btn btn-warning w-100">
                        Salvar Alterações
                    </button>
                </form>

                <button
                    onClick={() => navigate('/produtos/listar')}
                    className="btn btn-secondary w-100 mt-2"
                >
                    Voltar
                </button>
            </div>
        </div>
    );
}
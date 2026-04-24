import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditarCategoria() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [mensagem, setMensagem] = useState('');

    // 🔎 Buscar categoria pelo ID
    useEffect(() => {
        const buscarCategoria = async () => {
            try {
                const token = localStorage.getItem('token');

                const response = await fetch(`http://localhost:7777/api/categorias/listar`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                const data = await response.json();

                if (!response.ok) {
                    setMensagem('Erro ao buscar categoria');
                    return;
                }

                // encontra a categoria pelo ID
                const categoria = data.find(cat => cat._id === id);

                if (!categoria) {
                    setMensagem('Categoria não encontrada');
                    return;
                }

                setNome(categoria.nome);
                setDescricao(categoria.descricao || '');
            } catch (err) {
                console.error(err);
                setMensagem('Erro ao carregar dados');
            }
        };

        buscarCategoria();
    }, [id]);

    // ✏️ Atualizar categoria
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');

            const response = await fetch(`http://localhost:7777/api/categorias/atualizar/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ nome, descricao }),
            });

            const data = await response.json();

            if (!response.ok) {
                setMensagem(data.mensagem || 'Erro ao atualizar');
            } else {
                setMensagem('Categoria atualizada com sucesso!');

                // redireciona depois de 1 segundo
                setTimeout(() => {
                    navigate('/categorias/listar');
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
                <h2 className="text-center text-warning mb-4">Editar Categoria</h2>

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
                        <label className="form-label">Descrição</label>
                        <textarea
                            className="form-control"
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="btn btn-warning w-100">
                        Salvar Alterações
                    </button>
                </form>

                <button
                    onClick={() => navigate('/categorias/listar')}
                    className="btn btn-secondary w-100 mt-2"
                >
                    Voltar
                </button>
            </div>
        </div>
    );
}
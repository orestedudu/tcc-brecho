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
        <div
            style={{
                backgroundImage: "url('/images/brecho.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
            }}
            className="d-flex justify-content-center align-items-center p-4"
        >
            <div className="card shadow p-4 bg-light" style={{ width: '100%', maxWidth: '800px', opacity: 0.95 }}>
                <h2 className="text-center text-primary mb-4">Categorias Cadastradas</h2>

                {mensagem && (
                    <div className={`alert ${mensagem.includes('Erro') ? 'alert-danger' : 'alert-success'}`} role="alert">
                        {mensagem}
                    </div>
                )}

                {categorias.length > 0 ? (
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Descrição</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categorias.map((categoria) => (
                                    <tr key={categoria._id}>
                                        <td>{categoria.nome}</td>
                                        <td>{categoria.descricao}</td>
                                        <td>
                                            {/* ✏️ EDITAR */}
                                            <Link
                                                to={`/categorias/editar/${categoria._id}`}
                                                className="btn btn-warning btn-sm me-2"
                                            >
                                                Editar
                                            </Link>

                                            {/* 🗑️ EXCLUIR */}
                                            <button
                                                onClick={() => excluirCategoria(categoria._id)}
                                                className="btn btn-danger btn-sm"
                                            >
                                                Excluir
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-center">Nenhuma categoria cadastrada.</p>
                )}

                {/* ⚠️ Ajustei aqui também */}
                <Link to="/categorias/cadastrar" className="btn btn-primary w-100 mt-4">
                    Cadastrar Nova Categoria
                </Link>

                <Link to="/" className="btn btn-secondary w-100 mt-2">
                    Voltar
                </Link>
            </div>
        </div>
    );
}
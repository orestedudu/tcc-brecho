import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function ListarProdutos() {
    const [produtos, setProdutos] = useState([]);
    const [mensagem, setMensagem] = useState('');

    useEffect(() => {
        const fetchProdutos = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:7777/api/produtos/listar', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                const data = await response.json();

                if (!response.ok) {
                    setMensagem(data.mensagem || 'Erro ao buscar produtos');
                } else {
                    setProdutos(data);
                }
            } catch (err) {
                console.error(err);
                setMensagem('Erro ao conectar com o servidor');
            }
        };

        fetchProdutos();
    }, []);

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
                <h2 className="text-center text-primary mb-4">Produtos Cadastrados</h2>

                {mensagem && (
                    <div className={`alert ${mensagem.includes('Erro') ? 'alert-danger' : 'alert-success'}`} role="alert">
                        {mensagem}
                    </div>
                )}

                {produtos.length > 0 ? (
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Preço (R$)</th>
                                    <th>Tamanho</th>
                                    <th>Cor</th>
                                    <th>Observações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {produtos.map((produto) => (
                                    <tr key={produto._id}>
                                        <td>{produto.nome}</td>
                                        <td>{produto.preco}</td>
                                        <td>{produto.tamanho}</td>
                                        <td>{produto.cor}</td>
                                        <td>{produto.observacoes || '-'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-center">Nenhum produto cadastrado.</p>
                )}

                <Link to="/produtos" className="btn btn-primary w-100 mt-4">
                    Cadastrar Novo Produto
                </Link>

                <Link to="/" className="btn btn-secondary w-100 mt-2">
                    Voltar
                </Link>
            </div>
        </div>
    );
}

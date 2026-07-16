import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function ListarProdutos() {

    const [produtos, setProdutos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [ordenacao, setOrdenacao] = useState("nome");

    // ==========================
    // Buscar categorias
    // ==========================
    const buscarCategorias = async () => {

        try {

            const token = localStorage.getItem('token');

            const response = await fetch(
                'http://localhost:7777/api/categorias/listar',
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (response.ok) {
                setCategorias(data);
            }

        } catch (error) {
            console.error(error);
        }

    };

    // ==========================
    // Buscar produtos
    // ==========================
    const buscarProdutos = async () => {

        try {

            const token = localStorage.getItem('token');

            let url = `http://localhost:7777/api/produtos/listar?ordenacao=${ordenacao}`;

            if (categoriaSelecionada) {
                url += `&categoria=${categoriaSelecionada}`;
            }
            const response = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (!response.ok) {
                setMensagem(data.mensagem || 'Erro ao buscar produtos');
            } else {
                setProdutos(data);
            }

        } catch (error) {
            console.error(error);
            setMensagem('Erro ao conectar com o servidor');
        }

    };

    // ==========================
    // Carregar categorias
    // ==========================
    useEffect(() => {
        buscarCategorias();
    }, []);

    // ==========================
    // Buscar produtos sempre que
    // trocar a categoria
    // ==========================
    useEffect(() => {
        buscarProdutos();
    }, [categoriaSelecionada, ordenacao]);

    // ==========================
    // Excluir produto
    // ==========================
    const excluirProduto = async (id) => {

        const confirmar = window.confirm(
            'Tem certeza que deseja excluir este produto?'
        );

        if (!confirmar) return;

        try {

            const token = localStorage.getItem('token');

            const response = await fetch(
                `http://localhost:7777/api/produtos/excluir/${id}`,
                {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (!response.ok) {

                setMensagem(data.mensagem);

            } else {

                setMensagem('Produto excluído com sucesso.');

                buscarProdutos();

            }

        } catch (error) {

            console.error(error);
            setMensagem('Erro ao conectar com o servidor');

        }

    };

    return (

        <div
            style={{
                backgroundImage: "url('/images/brecho.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh'
            }}
            className="d-flex justify-content-center align-items-center p-4"
        >

            <div
                className="card shadow p-4 bg-light"
                style={{
                    width: '100%',
                    maxWidth: '1000px',
                    opacity: 0.95
                }}
            >

                <h2 className="text-center text-primary mb-4">
                    Produtos Cadastrados
                </h2>

                {mensagem && (
                    <div
                        className={`alert ${mensagem.includes('Erro')
                            ? 'alert-danger'
                            : 'alert-success'
                            }`}
                    >
                        {mensagem}
                    </div>
                )}

                {/* FILTRO */}

                <div className="row mb-4">

                    {/* Categoria */}

                    <div className="col-md-4">

                        <label className="form-label">
                            Categoria
                        </label>

                        <select
                            className="form-select"
                            value={categoriaSelecionada}
                            onChange={(e) => setCategoriaSelecionada(e.target.value)}
                        >

                            <option value="">
                                Todas as categorias
                            </option>

                            {categorias.map((categoria) => (

                                <option
                                    key={categoria._id}
                                    value={categoria._id}
                                >
                                    {categoria.nome}
                                </option>

                            ))}

                        </select>

                    </div>

                    {/* Ordenação */}

                    <div className="col-md-4">

                        <label className="form-label">
                            Ordenar por
                        </label>

                        <select
                            className="form-select"
                            value={ordenacao}
                            onChange={(e) => setOrdenacao(e.target.value)}
                        >

                            <option value="nome">
                                Nome (A → Z)
                            </option>

                            <option value="precoAsc">
                                Menor preço
                            </option>

                            <option value="precoDesc">
                                Maior preço
                            </option>

                        </select>

                    </div>

                </div>

                {produtos.length > 0 ? (

                    <div className="table-responsive">

                        <table className="table table-striped table-hover">

                            <thead>

                                <tr>

                                    <th>Nome</th>
                                    <th>Preço</th>
                                    <th>Tamanho</th>
                                    <th>Cor</th>
                                    <th>Observações</th>
                                    <th>Ações</th>

                                </tr>

                            </thead>

                            <tbody>

                                {produtos.map((produto) => (

                                    <tr key={produto._id}>

                                        <td>{produto.nome}</td>

                                        <td>
                                            R$ {Number(produto.preco).toFixed(2)}
                                        </td>

                                        <td>{produto.tamanho}</td>

                                        <td>{produto.cor}</td>

                                        <td>
                                            {produto.observacoes || '-'}
                                        </td>

                                        <td>

                                            <Link
                                                to={`/produtos/editar/${produto._id}`}
                                                className="btn btn-warning btn-sm me-2"
                                            >
                                                Editar
                                            </Link>

                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() =>
                                                    excluirProduto(produto._id)
                                                }
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

                    <p className="text-center">
                        Nenhum produto encontrado.
                    </p>

                )}

                <Link
                    to="/produtos/cadastrar"
                    className="btn btn-primary mt-3"
                >
                    Cadastrar Novo Produto
                </Link>

                <Link
                    to="/"
                    className="btn btn-secondary mt-2"
                >
                    Voltar
                </Link>

            </div>

        </div>

    );
}
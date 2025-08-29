
import { useEffect, useState } from "react";
import axios from "axios";

export default function Produtos() {
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [categoria, setCategoria] = useState("");
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    buscarProdutos();
    buscarCategorias();
  }, []);

  const buscarProdutos = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/produtos");
      setProdutos(res.data);
    } catch (error) {
      console.error("Erro ao buscar produtos", error);
    }
  };

  const buscarCategorias = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/categorias");
      setCategorias(res.data);
    } catch (error) {
      console.error("Erro ao buscar categorias", error);
    }
  };

  const criarProduto = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/produtos", {
        nome,
        preco,
        quantidade,
        categoria,
      });
      setNome("");
      setPreco("");
      setQuantidade("");
      setCategoria("");
      buscarProdutos();
    } catch (error) {
      console.error("Erro ao criar produto", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gerenciar Produtos</h1>

      <form onSubmit={criarProduto} className="mb-6">
        <input
          type="text"
          placeholder="Nome do produto"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="border p-2 mr-2 rounded"
          required
        />
        <input
          type="number"
          placeholder="Preço"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          className="border p-2 mr-2 rounded"
          required
        />
        <input
          type="number"
          placeholder="Quantidade"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
          className="border p-2 mr-2 rounded"
          required
        />

        {/* Seleção de categoria */}
        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          className="border p-2 mr-2 rounded"
          required
        >
          <option value="">Selecione a categoria</option>
          {categorias.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.nome}
            </option>
          ))}
        </select>

        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          Cadastrar
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-2">Produtos cadastrados:</h2>
      <ul className="list-disc pl-5">
        {produtos.map((prod) => (
          <li key={prod._id}>
            <strong>{prod.nome}</strong> – R${prod.preco} – Qtd: {prod.quantidade}  
            <br />
            <span className="text-sm text-gray-600">
              Categoria: {prod.categoria?.nome || "Sem categoria"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

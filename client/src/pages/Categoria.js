import { useEffect, useState } from "react";
import axios from "axios";

export default function Categorias() {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [editandoId, setEditandoId] = useState(null);

  useEffect(() => {
    buscarCategorias();
  }, []);

  const buscarCategorias = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/categorias");
      setCategorias(res.data);
    } catch (error) {
      console.error("Erro ao buscar categorias", error);
    }
  };

  const salvarCategoria = async (e) => {
    e.preventDefault();
    try {
      if (editandoId) {
        await axios.put(`http://localhost:3000/api/categorias/${editandoId}`, {
          nome,
          descricao,
        });
      } else {
        await axios.post("http://localhost:3000/api/categorias", {
          nome,
          descricao,
        });
      }
      setNome("");
      setDescricao("");
      setEditandoId(null);
      buscarCategorias();
    } catch (error) {
      console.error("Erro ao salvar categoria", error);
    }
  };

  const editarCategoria = (categoria) => {
    setNome(categoria.nome);
    setDescricao(categoria.descricao);
    setEditandoId(categoria._id);
  };

  const excluirCategoria = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir esta categoria?")) {
      try {
        await axios.delete(`http://localhost:3000/api/categorias/${id}`);
        buscarCategorias();
      } catch (error) {
        console.error("Erro ao excluir categoria", error);
      }
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Gerenciar Categorias
      </h1>

      {/* Formulário */}
      <form
        onSubmit={salvarCategoria}
        className="bg-white p-6 rounded-2xl shadow-md mb-8 flex flex-col md:flex-row items-center gap-4"
      >
        <input
          type="text"
          placeholder="Nome da categoria"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="border p-3 rounded w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          type="text"
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          className="border p-3 rounded w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow"
          >
            {editandoId ? "Salvar Alterações" : "Cadastrar"}
          </button>
          {editandoId && (
            <button
              type="button"
              onClick={() => {
                setNome("");
                setDescricao("");
                setEditandoId(null);
              }}
              className="bg-gray-400 hover:bg-gray-500 text-white px-5 py-2 rounded-lg shadow"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      {/* Lista de categorias */}
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">
        Categorias cadastradas
      </h2>

      {categorias.length === 0 ? (
        <p className="text-gray-500">Nenhuma categoria cadastrada.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {categorias.map((cat) => (
            <div
              key={cat._id}
              className="bg-white p-5 rounded-2xl shadow flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-bold text-gray-800">
                  {cat.nome}
                </h3>
                <p className="text-gray-600 text-sm">{cat.descricao}</p>
              </div>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => editarCategoria(cat)}
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
                >
                  Editar
                </button>
                <button
                  onClick={() => excluirCategoria(cat._id)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

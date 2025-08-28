import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Categorias() {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editando, setEditando] = useState(null); // guarda id da categoria em edição

  // Buscar categorias do backend
  const fetchCategorias = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/categorias");
      setCategorias(res.data);
    } catch (error) {
      console.error("Erro ao carregar categorias:", error);
    }
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  // Cadastrar ou atualizar categoria
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nome.trim()) return alert("O nome da categoria é obrigatório!");

    setLoading(true);
    try {
      if (editando) {
        // Atualizar
        await axios.put(`http://localhost:5000/api/categorias/${editando}`, {
          nome,
          descricao,
        });
        alert("Categoria atualizada com sucesso!");
      } else {
        // Criar
        await axios.post("http://localhost:5000/api/categorias", {
          nome,
          descricao,
        });
        alert("Categoria cadastrada com sucesso!");
      }

      setNome("");
      setDescricao("");
      setEditando(null);
      fetchCategorias();
    } catch (error) {
      console.error("Erro ao salvar categoria:", error);
      alert("Erro ao salvar categoria");
    } finally {
      setLoading(false);
    }
  };

  // Preparar formulário para edição
  const handleEdit = (categoria) => {
    setNome(categoria.nome);
    setDescricao(categoria.descricao || "");
    setEditando(categoria._id);
  };

  // Excluir categoria
  const handleDelete = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir esta categoria?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/categorias/${id}`);
      alert("Categoria excluída com sucesso!");
      fetchCategorias();
    } catch (error) {
      console.error("Erro ao excluir categoria:", error);
      alert("Erro ao excluir categoria");
    }
  };

  // Cancelar edição
  const cancelarEdicao = () => {
    setNome("");
    setDescricao("");
    setEditando(null);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-purple-700">
        Cadastro de Categorias
      </h1>

      {/* Formulário */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-2xl p-4 mb-6"
      >
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Nome da Categoria</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-purple-500 outline-none"
            placeholder="Ex: Calçados"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Descrição</label>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-purple-500 outline-none"
            placeholder="Ex: Tênis, sandálias e sapatos"
          />
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-700 transition disabled:opacity-50"
          >
            {loading
              ? "Salvando..."
              : editando
              ? "Atualizar Categoria"
              : "Cadastrar Categoria"}
          </button>

          {editando && (
            <button
              type="button"
              onClick={cancelarEdicao}
              className="bg-gray-400 text-white px-4 py-2 rounded-xl hover:bg-gray-500 transition"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      {/* Lista de Categorias */}
      <h2 className="text-xl font-semibold mb-2">Categorias Cadastradas</h2>
      {categorias.length === 0 ? (
        <p className="text-gray-500">Nenhuma categoria cadastrada.</p>
      ) : (
        <ul className="space-y-2">
          {categorias.map((cat) => (
            <li
              key={cat._id}
              className="bg-gray-100 p-3 rounded-lg flex justify-between items-center"
            >
              <div>
                <span className="font-bold">{cat.nome}</span>
                {cat.descricao && (
                  <p className="text-sm text-gray-600">{cat.descricao}</p>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(cat)}
                  className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 text-sm"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(cat._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 text-sm"
                >
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Home() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState(null);

  // Ao carregar a página, pegar o nome do usuário salvo
  useEffect(() => {
    const storedUser = localStorage.getItem('userName');
    if (storedUser) {
      setUserName(storedUser);
    }
  }, []);

  // Função de logout
  const handleLogout = () => {
    localStorage.removeItem('userName');
    localStorage.removeItem('token'); // caso use token JWT
    setUserName(null);
    navigate('/login');
  };

  return (
    <div
      style={{
        backgroundImage: "url('/images/brecho.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        position: 'relative',
      }}
      className="d-flex justify-content-center align-items-center"
    >
      {/* Card central */}
      <div
        className="card shadow p-4 bg-light"
        style={{ maxWidth: '400px', width: '100%', opacity: 0.95 }}
      >
        <h1 className="card-title text-center mb-4 text-primary">
          Bem-vindo(a)!
        </h1>
        <nav>
          <ul className="list-unstyled">
            <li className="mb-3">
              <Link to="/agendar" className="btn btn-primary w-100">
                Agendar um serviço
              </Link>
            </li>
            <li className="mb-3">
              <Link
                to="/agendamentos/pendentes"
                className="btn btn-warning w-100"
              >
                Ver agendamentos pendentes
              </Link>
            </li>
            <li className="mb-3">
              <Link
                to="/agendamentos/concluidos"
                className="btn btn-success w-100"
              >
                Ver agendamentos concluídos
              </Link>
            </li>
            {/* Novo botão de adicionar categoria */}
            <li className="mb-3">
              <Link
                to="/categorias"
                className="btn btn-info w-100"
              >
                Adicionar Categoria
              </Link>
            </li>
            {/* Novo botão de gerenciar produtos */}
            <li className="mb-3">
              <Link
                to="/produtos"
                className="btn btn-secondary w-100"
              >
                Gerenciar Produtos
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Botão no canto inferior direito */}
      {userName ? (
        <div
          className="btn-group position-absolute"
          style={{ bottom: '20px', right: '20px' }}
        >
          <button
            type="button"
            className="btn btn-dark dropdown-toggle d-flex align-items-center gap-2"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="bi bi-person-circle"></i>
            {userName}
          </button>
          <ul className="dropdown-menu dropdown-menu-end">
            <li>
              <button
                className="dropdown-item text-danger"
                onClick={handleLogout}
              >
                Sair
              </button>
            </li>
          </ul>
        </div>
      ) : (
        <Link
          to="/login"
          className="btn btn-dark position-absolute d-flex align-items-center gap-2"
          style={{ bottom: '20px', right: '20px' }}
        >
          <i className="bi bi-person-circle"></i>
          Login
        </Link>
      )}
    </div>
  );
}

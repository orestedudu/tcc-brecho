import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <h1>Bem-vindo(a)!</h1>
      <nav>
        <ul>
          <li>
            <Link to="/agendar">Agendar um serviço</Link>
          </li>
          <li>
            <Link to="/agendamentos/pendentes">Ver agendamentos pendentes</Link>
          </li>
          <li>
            <Link to="/agendamentos/concluidos">Ver agendamentos concluídos</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

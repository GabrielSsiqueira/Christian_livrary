import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="container mt-5">
      <div className="p-5 bg-light rounded-3">
        <h1 className="fw-bold">Bem-vindo à Livraria</h1>
        <p className="lead">
          Explore, compre e leia seus livros digitais em um só lugar.
        </p>

        <Link to="/catalogo" className="btn btn-primary btn-lg">
          Ver Catálogo
        </Link>
      </div>
    </div>
  );
}

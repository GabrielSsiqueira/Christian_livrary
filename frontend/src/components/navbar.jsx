import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, signOut, loading } = useAuth();

  if (loading) return null; // evita render prematuro

  return (
    <nav className="navbar navbar-dark bg-dark px-3">
      <span className="navbar-brand fw-bold">
        Sistema Livraria
      </span>

      <div className="dropdown">
        <button
          className="btn btn-dark dropdown-toggle d-flex align-items-center gap-2"
          type="button"
          data-bs-toggle="dropdown"
        >
          <img
            src="https://ui-avatars.com/api/?name=User&background=0D6EFD&color=fff"
            alt="Usuário"
            width="32"
            height="32"
            className="rounded-circle"
          />
          <span>{user?.nome || 'Visitante'}</span>
        </button>

        <ul className="dropdown-menu dropdown-menu-end">
          {user ? (
            <>
              <li>
                <Link className="dropdown-item" to="/perfil">
                  Perfil: {user.tipo}
                </Link>
              </li>

              <li>
                <Link className="dropdown-item" to="/biblioteca">
                  Minha Biblioteca
                </Link>
              </li>

              <li><hr className="dropdown-divider" /></li>

              <li>
                <button
                  className="dropdown-item text-danger"
                  onClick={signOut}
                >
                  <i className="bi bi-box-arrow-right me-1"></i>
                  Sair
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link className="dropdown-item" to="/">
                Entrar
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

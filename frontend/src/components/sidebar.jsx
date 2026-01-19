import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Sidebar() {
  const location = useLocation();

  const { user } = useAuth();

  const isActive = (path) =>
    location.pathname === path ? 'active fw-bold' : '';

  return (
    <div
      className="bg-light border-end"
      style={{ width: '240px', minHeight: '100vh' }}
    >
      <ul className="nav nav-pills flex-column p-3 gap-1">

        

        

        


        {user?.tipo === 'cliente' && (
          <>
         
          <h6 className="text-uppercase text-muted">Cliente</h6>

          <li className="nav-item">
            <Link className={`nav-link ${isActive('/home')}`} to="/home">
              Início
            </Link>
          </li>

          <li className="nav-item ">
          
            <Link className={`nav-link ${isActive('/catalogo')}`} to="/catalogo">
            <i className={'bi bi-book me-2'} ></i>
              Catálogo
            </Link>
          </li>
          

          <li className="nav-item">
            <Link to="/minha-biblioteca" className={`nav-link ${isActive('/minha-biblioteca')}`}>
              Minha Biblioteca
            </Link>
          </li>

          <li className="nav-item">
            <Link className={`nav-link ${isActive('/')}`} to="/">
              <i className={'bi bi-person-circle'}></i>
              Sair
            </Link>
          </li>
          
          </>

          
        )}

        {user?.tipo === 'admin' && (
          <>
          <h6 className="text-uppercase text-muted">Admin</h6>

          <Link className={`nav-link ${isActive('/admin')}`} to="/admin">
            Dashboard
          </Link>

          <Link className={`nav-link ${isActive('/admin/categorias')}`} to="/admin/categorias">
            Categorias
          </Link>

          <Link className={`nav-link ${isActive('/admin/livros')}`} to="/admin/livros">
            Livros
          </Link>

          <Link className={`nav-link ${isActive('/admin/usuarios')}`} to="/admin/usuarios">
            Usuários
          </Link>

          <Link className={`nav-link ${isActive('/admin/compra')}`} to="/admin/compra">
            Compra
          </Link>

          </>
        )}

        
      </ul>
    </div>
  );
}

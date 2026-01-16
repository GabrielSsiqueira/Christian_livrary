import { useEffect, useState } from 'react';
import { getCategorias } from '../api/categoriaApi';
import { useNavigate } from 'react-router-dom';

export default function Catalogo() {
  const [categorias, setCategorias] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCategorias().then(res => setCategorias(res.data));
  }, []);

  return (
    <div className="container">
      <h3 className="mb-4">Categorias</h3>

      <div className="row">
        {categorias.map(c => (
          <div className="col-md-3 mb-4" key={c.id}>
            <div className="card h-100 shadow-sm">

              {c.imagem && (
                <img
                  src={`http://localhost:3000/uploads/categorias/${c.imagem}`}
                  className="card-img-top"
                  alt={c.titulo}
                  style={{ height: 160, objectFit: 'cover' }}
                />
              )}

              <div className="card-body text-center d-flex flex-column">
                <h5 className="card-title">{c.titulo}</h5>

                <p className="card-text text-muted flex-grow-1">
                  {c.descricao}
                </p>

                <button
                  className="btn btn-outline-primary mt-2"
                  onClick={() => navigate(`/categoria/${c.id}`)}
                >
                  Ver livros
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

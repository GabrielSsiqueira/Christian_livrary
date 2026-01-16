import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getLivrosPorCategoria } from '../api/livroApi';

export default function LivrosPorCategoria() {
  const { id } = useParams();
  const [livros, setLivros] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getLivrosPorCategoria(id).then(res => setLivros(res.data));
  }, [id]);

  return (
    <div className="container">
      <h3 className="mb-4">Livros</h3>

      <div className="row">
        {livros.map(l => (
          <div className="col-md-3 mb-4" key={l.id}>
            <div className="card h-100 shadow-sm">
              {l.capa && (
                <img
                  src={`http://localhost:3000/uploads/capas/${l.imagem}`}
                  className="card-img-top"
                  style={{ height: 180, objectFit: 'cover' }}
                  alt={l.titulo}
                />
              )}

              <div className="card-body">
                <h6>{l.titulo}</h6>
                <p className="text-muted">{l.autor}</p>
                <p className="fw-bold">R$ {l.preco}</p>
              </div>

              <div className="card-footer bg-white border-0">
                <button
                  className="btn btn-outline-primary w-100"
                  onClick={() => navigate(`/livro/${l.id}`)}
                >
                  Ver detalhes
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {livros.length === 0 && (
        <p className="text-muted">Nenhum livro nesta categoria.</p>
      )}
    </div>
  );
}

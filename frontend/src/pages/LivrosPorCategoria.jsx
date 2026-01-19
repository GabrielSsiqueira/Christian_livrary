import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getLivrosPorCategoria } from '../api/livroApi';

export default function LivrosPorCategoria() {
  const { id } = useParams();
  const [livros, setLivros] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if(!id) return;

    console.log("id da categoria", id);
    getLivrosPorCategoria(id)
    .then((res) => {
      setLivros(res.data);
    })
    .catch((err) => {
      console.error("error ao buscar livros", err);
    })
    .finally(() => {
      setLoading(false);
    })
  },[id])

  if(loading) return <p>Carregando livros</p>;

  return (
    <div className="container">
      <h3 className="mb-4">Livros</h3>

      <div className="row">
        {livros.map(l => (
          <div className="col-md-3 mb-4" key={l.id}>
            <div className="card h-100 shadow-sm">
              {l.capa ? (
                <img
                  src={`${import.meta.env.VITE_API_URL}/uploads/capas/${l.capa}`}
                  className="card-img-top"
                  style={{ height: 180, objectFit: 'cover' }}
                  alt={l.titulo}
                />
              ):(
                'Sem Imagem'
              )}

              <div className="card-body">
                <h6 className="text-center">{l.titulo}</h6>
                <p className="text-muted">{l.autor}</p>
                <p className="fw-bold text-center">R$ {l.preco}</p>
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

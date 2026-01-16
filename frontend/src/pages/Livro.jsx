import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../api/api';

import { useAuth } from '../context/AuthContext';
import { criarCompra } from '../api/compraApi';





export default function Livro() {
  const { user } = useAuth();

  const comprar = async () => {
    await criarCompra({
      user_id: user.id,
      livros: [livro.id]
    });

    alert('Compra realizada! Aguarde pagamento.');
  };

  const { id } = useParams();
  const [livro, setLivro] = useState(null);

  useEffect(() => {
    api.get(`/livros/${id}`).then(res => setLivro(res.data));
  }, [id]);

  if (!livro) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-3">Carregando livro...</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row g-5">
        
        {/* Capa */}
        <div className="col-md-4">
          <img
            src={`http://localhost:3000/uploads/${livro.imagem}`}
            alt={livro.titulo}
            className="img-fluid rounded shadow"
          />
        </div>

        {/* Detalhes */}
        <div className="col-md-8">
          <h1 className="fw-bold">{livro.titulo}</h1>
          <p className="text-muted mb-1">Autor: {livro.autor}</p>

          <h3 className="text-primary my-3">
            R$ {livro.preco.toFixed(2)}
          </h3>

          <p className="mt-4">{livro.descricao}</p>

          <div className="d-flex gap-3 mt-4">
            <button className="btn btn-success" onClick={comprar}>
              Comprar
            </button>


            <button className="btn btn-outline-secondary btn-lg">
              Adicionar à Biblioteca
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import {
  getLivros,
  createLivro,
  updateLivro,
  deleteLivro
} from '../../api/livroApi';
import { getCategorias } from '../../api/categoriaApi';
import LivroForm from '../../components/LivroForm';

export default function Livros() {
  const [livros, setLivros] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [editando, setEditando] = useState(null);

  const load = () => {
    getLivros().then(res => setLivros(res.data));
    getCategorias().then(res => setCategorias(res.data));
  };

  useEffect(load, []);

  const salvar = async (data) => {
    editando
      ? await updateLivro(editando.id, data)
      : await createLivro(data);

    setEditando(null);
    load();
  };

  return (
    <div>
      <h3>Livros</h3>

      <LivroForm
        onSubmit={salvar}
        categorias={categorias}
        livro={editando}
      />

      <table className="table table-hover mt-4">
        <thead>
          <tr>
            <th>Título</th>
            <th>Autor</th>
            <th>Preço</th>
            <th>Capa</th>
            <th>Arquivo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {livros.map(l => (
            <tr key={l.id}>
              <td>{l.titulo}</td>
              <td>{l.autor}</td>
              <td>R$ {l.preco}</td>
              <td>
                {l.imagem && (
                  <img
                    src={`http://localhost:3000/uploads/capas/${l.imagem}`}
                    width="50"
                    alt=""
                  />
                )}
              </td>

              <td>
                <a
                  href={`http://localhost:3000/uploads/livros/${l.arquivo}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-sm btn-outline-primary"
                >
                  Abrir
                </a>
              </td>

              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => setEditando(l)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => deleteLivro(l.id).then(load)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

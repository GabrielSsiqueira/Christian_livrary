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

      <table className="table table-hover table-striped table-bordered mt-4">
        <thead>
          <tr>
            <th>Id</th>
            <th>Título</th>
            <th>Autor</th>
            <th>Preço</th>
            <th>Capa</th>
            <th>Arquivo</th>
            <th>Categoria</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {livros.map(l => (
            <tr key={l.id}>
              <td>{l.id}</td>
              <td>{l.titulo}</td>
              <td>{l.autor}</td>
              <td>R$ {l.preco}</td>
              <td>{l.capa ? (
                <img src={`${import.meta.env.VITE_API_URL}/uploads/capas/${l.capa}`} width={50} alt="" />
              ): (
                'sem imagem'
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
              <td>{l.categoria_id}</td>

              <td className="btn-group">
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => setEditando(l)}
                >
                  <i className="bi bi-pencil-square" />
                </button>

                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => deleteLivro(l.id).then(load)}
                >
                  <i className="bi bi-trash-fill" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

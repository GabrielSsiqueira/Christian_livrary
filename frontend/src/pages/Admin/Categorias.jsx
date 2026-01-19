import { useEffect, useState } from 'react';
import {
  getCategorias,
  createCategoria,
  updateCategoria,
  deleteCategoria
} from '../../api/categoriaApi';
import CategoriaForm from '../../components/CategoriaForm';

export default function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [editando, setEditando] = useState(null);

  const load = () => {
    getCategorias().then(res => setCategorias(res.data));
  };

  useEffect(load, []);

  const salvar = async (formData) => {
    try {
      if (editando) {
        await updateCategoria(editando.id, formData);
      } else {
        await createCategoria(formData);
      }

      setEditando(null);
      load();
    } catch (err) {
      alert('Erro ao salvar categoria');
      console.error(err);
    }
  };


  return (
    <div>
      <h3>Categorias</h3>

      <CategoriaForm onSubmit={salvar} categoria={editando} />

      <table className="table table-hover table-bordered table-striped mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Descrição</th>
            <th>Imagem</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map(c => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.titulo}</td>
              <td>{c.descricao}</td>
              <td>
                {c.imagem ? (
                  <img className="rounded-circle object-fit-cover" src={`${import.meta.env.VITE_API_URL}/uploads/categorias/${c.imagem}`} width={30} height={30} />
                ): (
                  'sem imagem'
                )}
              </td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => setEditando(c)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => deleteCategoria(c.id).then(load)}
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

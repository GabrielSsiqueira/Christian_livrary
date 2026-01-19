import { useEffect, useState } from 'react';
import {
  listarUsuarios,
  atualizarUsuario,
  excluirUsuario
} from '../../api/usuarioApi';

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [editando, setEditando] = useState(null);

  const load = () => {
    listarUsuarios().then(res => setUsuarios(res.data));
  };

  useEffect(load, []);

  const salvar = async (e) => {
    e.preventDefault();
    await atualizarUsuario(editando.id, editando);
    setEditando(null);
    load();
  };

  return (
    <div>
      <h3>Usuários</h3>

      {editando && (
        <form onSubmit={salvar} className="row g-2 mb-3">
          <div className="col-md-3">
            <input className="form-control"
              value={editando.nome}
              onChange={e => setEditando({ ...editando, nome: e.target.value })}
              placeholder="Nome" />
          </div>

          <div className="col-md-3">
            <input className="form-control"
              value={editando.email}
              onChange={e => setEditando({ ...editando, email: e.target.value })}
              placeholder="Email" />
          </div>

          <div className="col-md-2">
            <select className="form-select"
              value={editando.tipo}
              onChange={e => setEditando({ ...editando, tipo: e.target.value })}
            >
              <option value="cliente">Cliente</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="col-md-2">
            <input type="password" className="form-control"
              placeholder="Nova senha (opcional)"
              onChange={e => setEditando({ ...editando, senha: e.target.value })}
            />
          </div>

          <div className="col-md-2 d-grid">
            <button className="btn btn-success">Salvar</button>
          </div>
        </form>
      )}

      <table className="table table-hover table-striped table-bordered">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Tipo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.nome}</td>
              <td>{u.email}</td>
              <td>
                <span className={`badge bg-${u.tipo === 'admin' ? 'danger' : 'secondary'}`}>
                  {u.tipo}
                </span>
              </td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => setEditando(u)}
                >
                  Editar
                </button>

                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => excluirUsuario(u.id).then(load)}
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

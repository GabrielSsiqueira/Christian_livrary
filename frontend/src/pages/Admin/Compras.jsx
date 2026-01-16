import { useEffect, useState } from 'react';
import { listarCompras, atualizarStatus } from '../../api/compraApi';

export default function Compras() {
  const [compras, setCompras] = useState([]);

  const load = () => {
    listarCompras().then(res => setCompras(res.data));
  };

  useEffect(load, []);

  return (
    <div>
      <h3>Compras</h3>

      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Total</th>
            <th>Status</th>
            <th>Itens</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {compras.map(c => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>R$ {c.total}</td>
              <td>
                <span className={`badge bg-${c.status === 'pago' ? 'success' : 'warning'}`}>
                  {c.status}
                </span>
              </td>
              <td>
                <ul>
                  {c.ItemCompras.map(i => (
                    <li key={i.id}>{i.Livro.titulo}</li>
                  ))}
                </ul>
              </td>
              <td>
                {c.status === 'pendente' && (
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => atualizarStatus(c.id, 'pago').then(load)}
                  >
                    Marcar como pago
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

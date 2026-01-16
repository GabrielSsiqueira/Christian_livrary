import api from './api';

export const criarCompra = (data) =>
  api.post('/compras', data);

export const listarCompras = () =>
  api.get('/compras');

export const atualizarStatus = (id, status) =>
  api.put(`/compras/${id}/status`, { status });

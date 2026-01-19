import api from './api';

export const listarUsuarios = () =>
  api.get('/usuarios/list');

export const atualizarUsuario = (id, data) =>
  api.put(`/usuarios/${id}`, data);

export const excluirUsuario = (id) =>
  api.delete(`/usuarios/${id}`);

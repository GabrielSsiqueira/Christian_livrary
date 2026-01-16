import api from './api';

export const createLivro = (data) =>
  api.post('/livros', data);

export const updateLivro = (id, data) =>
  api.put(`/livros/${id}`, data);

export const deleteLivro = (id) =>
  api.delete(`/livros/${id}`);

export const getLivros = () =>
  api.get('/livros');

export const getLivrosPorCategoria = (id) =>
  api.get(`/livros/categoria/${id}`);

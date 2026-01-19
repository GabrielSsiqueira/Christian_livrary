import api from './api';

export const createLivro = (data) =>
  api.post('/livros/create', data);

export const updateLivro = (id, data) =>
  api.put(`/livros/update/${id}`, data);

export const getLivrosPorId = (id) => 
  api.get(`/livros/${id}`);

export const deleteLivro = (id) =>
  api.delete(`/livros/delete/${id}`);

export const getLivros = () =>
  api.get('/livros/list');

export const getLivrosPorCategoria = (id) =>
  api.get(`/livros/categoria/${id}`);

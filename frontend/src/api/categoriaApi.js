import api from './api';

export const getCategorias = () => api.get('/categorias/list');
export const createCategoria = (data) => api.post('/categorias/create', data);
export const updateCategoria = (id, data) => api.put(`/categorias/${id}`, data);
export const deleteCategoria = (id) => api.delete(`/categorias/${id}`);

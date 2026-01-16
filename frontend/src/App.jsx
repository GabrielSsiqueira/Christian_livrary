import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout';
import AdminLayout from './layouts/AdminLayout';
import AdminRoute from './routes/AdminRoute';

import Home from './pages/Home';
import Catalogo from './pages/Catalogo';
import Livro from './pages/Livro';
import LivrosPorCategoria from './pages/LivrosPorCategoria';

import Login from './pages/Login';
import Register from './pages/Register';

import Dashboard from './pages/Admin/Dashboard';
import Categorias from './pages/Admin/Categorias';
import Livros from './pages/Admin/Livros';
import Usuarios from './pages/Admin/Usuarios';
import Compras from './pages/Admin/Compras';

import { AuthProvider } from './context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* Públicas */}
          <Route path="/home" element={<Layout><Home /></Layout>} />
          <Route path="/catalogo" element={<Layout><Catalogo /></Layout>} />
          <Route path="/livro/:id" element={<Layout><Livro /></Layout>} />
          <Route path="/categoria/:id" element={<Layout><LivrosPorCategoria /></Layout>} />
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Admin (ocultas e protegidas) */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminLayout>
                  <Dashboard />
                </AdminLayout>
              </AdminRoute>
            }
          />

          <Route
            path="/admin/categorias"
            element={
              <AdminRoute>
                <AdminLayout>
                  <Categorias />
                </AdminLayout>
              </AdminRoute>
            }
          />

          <Route
            path="/admin/livros"
            element={
              <AdminRoute>
                <AdminLayout>
                  <Livros />
                </AdminLayout>
              </AdminRoute>
            }
          />

          <Route
            path="/admin/usuarios"
            element={
              <AdminRoute>
                <AdminLayout>
                  <Usuarios />
                </AdminLayout>
              </AdminRoute>
            }
          />

          <Route
            path="/admin/compras"
            element={
              <AdminRoute>
                <AdminLayout>
                  <Compras />
                </AdminLayout>
              </AdminRoute>
            }
          />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

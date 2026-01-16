import { useState } from 'react';
import { login } from '../api/authApi';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const submit = async e => {
    e.preventDefault();
    const res = await login({ email, senha });
    signIn(res.data);
    navigate('/home');
  };

  return (
    <div className="container vh-100 d-flex align-items-center justify-content-center">
      <div className="card shadow" style={{ width: 360 }}>
        <div className="card-body">
          <h4 className="mb-3 text-center">Entrar</h4>

          <form onSubmit={submit}>
            <input className="form-control mb-3"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required />

            <input type="password" className="form-control mb-3"
              placeholder="Senha"
              value={senha}
              onChange={e => setSenha(e.target.value)}
              required />

            <button className="btn btn-primary w-100">
              Entrar
            </button>
          </form>

          <div className="text-center mt-3">
            <Link to="/register">Não tem conta? Cadastre-se</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { register } from '../api/authApi';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const submit = async e => {
    e.preventDefault();
    await register({ nome, email, senha });
    navigate('/login');
  };

  return (
    <div className="container vh-100 d-flex align-items-center justify-content-center">
      <div className="card shadow" style={{ width: 380 }}>
        <div className="card-body">
          <h4 className="mb-3 text-center">Cadastro</h4>

          <form onSubmit={submit}>
            <input className="form-control mb-3"
              placeholder="Nome"
              value={nome}
              onChange={e => setNome(e.target.value)}
              required />

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

            <button className="btn btn-success w-100">
              Criar conta
            </button>
          </form>

          <div className="text-center mt-3">
            <Link to="/login">Já tem conta? Entrar</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

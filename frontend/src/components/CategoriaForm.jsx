import { useEffect, useState } from 'react';

export default function CategoriaForm({ onSubmit, categoria }) {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [imagem, setImagem] = useState(null);

  useEffect(() => {
    if (categoria) {
      setTitulo(categoria.titulo || '');
      setDescricao(categoria.descricao || '');
      setImagem(null); // arquivo não vem do backend
    }
  }, [categoria]);

  const submit = e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('descricao', descricao);
    if (imagem) formData.append('imagem', imagem);

    // 🔥 LOG CORRETO DO FORMDATA
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    onSubmit(formData);

    setTitulo('');
    setDescricao('');
    setImagem(null);

  };

  return (
    <form onSubmit={submit} className="row g-3 mb-4" encType="multipart/form-data">

      <div className="col-md-4">
        <input
          className="form-control"
          placeholder="Título da categoria"
          value={titulo}
          onChange={e => setTitulo(e.target.value)}
          required
        />
      </div>

      <div className="col-md-4">
        <input
          className="form-control"
          placeholder="Descrição"
          value={descricao}
          onChange={e => setDescricao(e.target.value)}
        />
      </div>

      <div className="col-md-3">
        <input
          type="file"
          className="form-control"
          accept="image/*"
          onChange={e => setImagem(e.target.files[0])}
        />
      </div>

      <div className="col-md-1 d-grid">
        <button className="btn btn-primary">
          {categoria ? 'Atualizar' : 'Salvar'}
        </button>
      </div>

    </form>
  );
}

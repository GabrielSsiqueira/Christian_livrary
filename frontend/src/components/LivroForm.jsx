import { useEffect, useState } from 'react';

export default function LivroForm({ onSubmit, categorias, livro }) {
  const [form, setForm] = useState({
    titulo: '',
    descricao: '',
    autor: '',
    preco: '',
    categoria_id: '',
  });

  const [capa, setCapa] = useState(null);
  const [arquivo, setArquivo] = useState(null);

  useEffect(() => {
    if (livro) {
      setForm({
        titulo: livro.titulo || '',
        descricao: livro.descricao || '',
        autor: livro.autor || '',
        preco: livro.preco || '',
        categoria_id: livro.categoria_id || '',
      });
      setCapa(null);
      setArquivo(null);
    }
  }, [livro]);

  const submit = e => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(form).forEach(key =>
      formData.append(key, form[key])
    );

    if (capa) formData.append('capa', capa);
    if (arquivo) formData.append('arquivo', arquivo);

    onSubmit(formData);

    setForm({
      titulo: '',
      descricao: '',
      autor: '',
      preco: '',
      categoria_id: '',
    });
    setCapa(null);
    setArquivo(null);
  };

  return (
    <form onSubmit={submit} className="row g-3 mb-4" encType="multipart/form-data">

      <div className="col-md-3">
        <input className="form-control" placeholder="Título"
          value={form.titulo}
          onChange={e => setForm({ ...form, titulo: e.target.value })}
          required />
      </div>

      <div className="col-md-3">
        <input className="form-control" placeholder="Autor"
          value={form.autor}
          onChange={e => setForm({ ...form, autor: e.target.value })}
          required />
      </div>

      <div className="col-md-2">
        <input type="number" className="form-control" placeholder="Preço"
          value={form.preco}
          onChange={e => setForm({ ...form, preco: e.target.value })}
          required />
      </div>

      <div className="col-md-2">
        <select className="form-select"
          value={form.categoria_id}
          onChange={e => setForm({ ...form, categoria_id: e.target.value })}
          required>
          <option value="">Categoria</option>
          {categorias.map(c => (
            <option key={c.id} value={c.id}>{c.titulo}</option>
          ))}
        </select>
      </div>

      <div className="col-md-2">
        <input type="file" className="form-control"
          accept="image/*"
          onChange={e => setCapa(e.target.files[0])} />
      </div>

      <div className="col-md-3">
        <input type="file" className="form-control"
          accept=".pdf,.epub"
          onChange={e => setArquivo(e.target.files[0])} />
      </div>

      <div className="col-md-2 d-grid">
        <button className="btn btn-success">
          {livro ? 'Atualizar' : 'Cadastrar'}
        </button>
      </div>

    </form>
  );
}

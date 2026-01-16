import { useEffect, useState } from 'react';
import { getDashboard } from '../../api/dashboardApi';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getDashboard().then(res => setData(res.data));
  }, []);

  if (!data) return <p>Carregando...</p>;

  return (
    <div>
      <h3 className="mb-4">Dashboard Administrativo</h3>

      {/* KPIs */}
      <div className="row mb-4">
        <KPI title="Usuários" value={data.totalUsuarios} />
        <KPI title="Livros" value={data.totalLivros} />
        <KPI title="Compras" value={data.totalCompras} />
        <KPI title="Faturamento" value={`R$ ${data.faturamento}`} />
      </div>

      <div className="row">
        <div className="col-md-6">
          <h5>Compras por mês</h5>
          <Bar
            data={{
              labels: data.comprasPorMes.map(i => i.mes),
              datasets: [{
                label: 'Compras',
                data: data.comprasPorMes.map(i => i.total)
              }]
            }}
          />
        </div>

        <div className="col-md-6">
          <h5>Livros mais vendidos</h5>
          <Doughnut
            data={{
              labels: data.livrosMaisVendidos.map(
                i => i.Livro.titulo
              ),
              datasets: [{
                data: data.livrosMaisVendidos.map(i => i.total)
              }]
            }}
          />
        </div>
      </div>
    </div>
  );
}

function KPI({ title, value }) {
  return (
    <div className="col-md-3">
      <div className="card shadow-sm">
        <div className="card-body text-center">
          <h6 className="text-muted">{title}</h6>
          <h4 className="fw-bold">{value}</h4>
        </div>
      </div>
    </div>
  );
}

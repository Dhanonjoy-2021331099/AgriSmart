'use client';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function LineChart({ chartData }){
  const data = {
    labels: chartData.labels || [],
    datasets: (chartData.datasets || []).map((ds, idx)=>({
      label: ds.label,
      data: ds.data,
      tension: 0.3,
      borderWidth: 2,
      fill: false
    }))
  };
  const options = { responsive:true, plugins:{legend:{position:'top'}} };
  return <div style={{height:320}}><Line data={data} options={options} /></div>;
}

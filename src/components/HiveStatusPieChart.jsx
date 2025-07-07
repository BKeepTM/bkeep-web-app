import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const centerTextPlugin = {
  id: 'centerText',
  beforeDraw: (chart) => {
    const { width, height, ctx } = chart;
    const { datasets } = chart.data;
    const total = datasets[0].data.reduce((a, b) => a + b, 0);
    const online = datasets[0].data[0];

    ctx.save();
    ctx.font = 'bold 18px sans-serif';
    ctx.fillStyle = '#212121';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`Aktivni`, width / 2, height / 2.3);
    ctx.fillText(`${online} / ${total}`, width / 2, height / 2);
    ctx.restore();
  }
};

export default function HiveStatusPieChart({ hives }) {
  const online = hives.filter(h => h.status === 'online').length;
  const offline = hives.length - online;

  const chartData = {
    labels: ['Online', 'Offline'],
    datasets: [
      {
        label: 'Status panjev',
        data: [online, offline],
        backgroundColor: ['#E0AA3E', '#212121'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    cutout: '60%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#212121',
        },
      },
    },
  };

  return (
    <div style={{ width: '100%', maxWidth: 400, margin: '0 auto' }}>
      <Pie data={chartData} options={options} plugins={[centerTextPlugin]} />
    </div>
  );
}

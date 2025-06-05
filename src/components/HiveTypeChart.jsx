import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { PolarArea } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import axios from 'axios';

ChartJS.register(
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend
);


const options = {
  responsive: true,
  plugins: {
    legend: { position: 'left' },
    title: { display: true, text: 'Št. panjev po tipu:' },
  },
  scales: {
    r: {
      beginAtZero: true,
      ticks: {
        stepSize: 1,
        callback: function (value) {
          return Number.isInteger(value) ? value : '';
        },
      },
    },
  },
};

function HiveTypeChart() {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: json } = await axios.get(`${apiUrl}/hive/list`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('site')}` },
        });

        const typeCounts = {};

        json.forEach(hive => {
          const type = hive.type;
          typeCounts[type] = (typeCounts[type] || 0) + 1;
        });

        const labels = Object.keys(typeCounts);
        const data = Object.values(typeCounts);
        const backgroundColors = labels.map(() => randomColor());

        setChartData({
          labels,
          datasets: [
            {
              label: 'Število panjev',
              data,
              backgroundColor: backgroundColors,
            },
          ],
        });
      } catch (error) {
        console.error('Napaka pri pridobivanju podatkov z API-ja:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div style={{ width: '50%', maxWidth: 470}}>
      <PolarArea data={chartData} options={options}/>
    </div>
  );
}

function randomColor() {
  const r = Math.floor(150 + Math.random() * 55); 
  const g = Math.floor(150 + Math.random() * 55);
  const b = Math.floor(150 + Math.random() * 55);
  return `rgb(${r}, ${g}, ${b})`;
}

export default HiveTypeChart;

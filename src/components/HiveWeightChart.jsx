import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import HiveIcon from '@mui/icons-material/Hive';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: { position: 'top' },
    title: { display: true, text: 'Teža v panjih skozi čas' },
  },
  scales: {
    x: { stacked: true },
    y: { stacked: true },
  },
};

function HiveWeightChart() {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [combinedWeight, setCombinedWeight] = useState(0);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: json } = await axios.get(`${apiUrl}/hiveWeight/list`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('site')}` },
        });

        const hiveMap = {};
        const latestWeights = {};

        json.forEach(entry => {
          const date = new Date(entry.time_weight);
          const timeLabel = date.toLocaleDateString();

          if (!hiveMap[entry.id_hive]) {
            hiveMap[entry.id_hive] = {
              label: `${entry.name}`,
              data: {},
              color: randomColor(),
            };
          }
          hiveMap[entry.id_hive].data[timeLabel] = entry.weight;

          if (
            !latestWeights[entry.id_hive] ||
            new Date(latestWeights[entry.id_hive].time_weight) < date
          ) {
            latestWeights[entry.id_hive] = entry;
          }
        });

        const allLabels = Array.from(
        new Set(json.map(e => new Date(e.time_weight).toISOString().split('T')[0]))
        )
        .sort((a, b) => new Date(a) - new Date(b)) 
        .map(dateStr => new Date(dateStr).toLocaleDateString());


        const datasets = Object.values(hiveMap).map(hive => ({
          label: hive.label,
          backgroundColor: hive.color,
          data: allLabels.map(label => hive.data[label] || 0),
        }));

        setChartData({ labels: allLabels, datasets });

        const totalWeight = Object.values(latestWeights).reduce(
          (sum, entry) => sum + entry.weight,
          0
        );
        setCombinedWeight(totalWeight);
      } catch (error) {
        console.error('Napaka pri pridobivanju podatkov z API-ja:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div style={{ maxWidth: 900 }}>
      <Bar options={options} data={chartData} />
      <Typography
        variant="subtitle1"
        gutterBottom
        sx={{ color: 'black', mt: 2, alignItems: 'center', gap: 1 }}
      >
        Zadnje izmerjena skupna teža <HiveIcon sx={{ fontSize: '1.2rem', verticalAlign: 'middle' }} />{' '}
        {combinedWeight.toFixed(2)} kg
      </Typography>
    </div>
  );
}

function randomColor() {
  const r = Math.floor(150 + Math.random() * 55);
  const g = Math.floor(150 + Math.random() * 55);
  const b = Math.floor(150 + Math.random() * 55);
  return `rgb(${r},${g},${b})`;
}

export default HiveWeightChart;

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
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Teža v panjih',
    },
  },
};

function HiveWeightChart() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [combinedWeight, setCombinedWeight] = useState(0);

  
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: json } = await axios.get(`${apiUrl}/hiveWeight/list`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('site')}`,
        },
      });

        const hiveMap = {};
        let totalWeight = 0;

        json.forEach(entry => {
          const time = new Date(entry.time_weight).toLocaleDateString();
          if (!hiveMap[entry.id_hive]) {
            hiveMap[entry.id_hive] = { label: `Panj ${entry.id_hive}`, data: {}, color: randomColor() };
          }
          hiveMap[entry.id_hive].data[time] = entry.weight;
          totalWeight += entry.weight;
        });

        console.log("Skupna teza", totalWeight)
        setCombinedWeight(totalWeight)

        const allLabels = Array.from(
          new Set(json.map(e => new Date(e.time_weight).toLocaleDateString()))
        ).sort();

        const datasets = Object.values(hiveMap).map(hive => ({
          label: hive.label,
          backgroundColor: hive.color,
          data: allLabels.map(label => hive.data[label] || 0),
        }));

        setChartData({
          labels: allLabels,
          datasets,
        });

      } catch (error) {
        console.error('Napaka pri pridobivanju podatkov z API-ja:', error);
      }
    }

    fetchData();
  }, []);

 return (
  <div>
    <Bar options={options} data={chartData} />
  <Typography variant="subtitle1" gutterBottom sx={{ color: 'white', alignItems: 'center', gap: 1 }}>
  Skupna teža <HiveIcon sx={{ fontSize: '1.2rem', verticalAlign: 'middle' }} /> {combinedWeight.toFixed(2)} kg
  </Typography>
  </div>
);}

function randomColor() {
  const r = Math.floor(150 + Math.random() * 55); 
  const g = Math.floor(150 + Math.random() * 55);
  const b = Math.floor(150 + Math.random() * 55);
  return `rgb(${r}, ${g}, ${b})`;
}


export default HiveWeightChart;

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
import { useParams } from 'react-router-dom';

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
      text: 'Teža v panju [kg]',
    },
  },
};

function HiveWeightChartSingle() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
   const {id} = useParams();

  
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: json } = await axios.get(`${apiUrl}/hiveWeight/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('site')}`,
        },
      });

        const hiveMap = {};

        json.forEach(entry => {
          const time = new Date(entry.time_weight).toLocaleDateString();
          if (!hiveMap[entry.id_hive]) {
            hiveMap[entry.id_hive] = { label: `${entry.name}`, data: {}, color: randomColor() };
          }
          hiveMap[entry.id_hive].data[time] = entry.weight;

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
  </div>
);}

function randomColor() {
  const r = Math.floor(150 + Math.random() * 55); 
  const g = Math.floor(150 + Math.random() * 55);
  const b = Math.floor(150 + Math.random() * 55);
  return `rgb(${r}, ${g}, ${b})`;
}


export default HiveWeightChartSingle;

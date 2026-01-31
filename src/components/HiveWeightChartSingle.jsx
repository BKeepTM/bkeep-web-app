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
import { useParams } from 'react-router-dom';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function HiveWeightChartSingle() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  const [chartOptions, setChartOptions] = useState({});

  const { id } = useParams();
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
            hiveMap[entry.id_hive] = {
              label: entry.name,
              data: {},
              color: randomColor(),
            };
          }

          hiveMap[entry.id_hive].data[time] = entry.weight;
        });

        const allLabels = Array.from(
          new Set(
            json.map(e =>
              new Date(e.time_weight).toISOString().split('T')[0]
            )
          )
        )
          .sort((a, b) => new Date(a) - new Date(b))
          .map(dateStr => new Date(dateStr).toLocaleDateString());

        const datasets = Object.values(hiveMap).map(hive => ({
          label: hive.label,
          backgroundColor: hive.color,
          data: allLabels.map(label => hive.data[label] || 0),
        }));

        const allValues = datasets.flatMap(d => d.data);
        const min = Math.min(...allValues);
        const max = Math.max(...allValues);

        const padding = (max - min) * 0.1;

        setChartData({
          labels: allLabels,
          datasets,
        });

        setChartOptions({
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
          scales: {
            y: {
              min: min - padding,
              max: max + padding,
              beginAtZero: false,
            },
          },
        });

      } catch (error) {
        console.error('Napaka pri pridobivanju podatkov z API-ja:', error);
      }
    }

    fetchData();
  }, [id]);

  return (
    <div>
      <Bar options={chartOptions} data={chartData} />
    </div>
  );
}

function randomColor() {
  const r = Math.floor(150 + Math.random() * 55);
  const g = Math.floor(150 + Math.random() * 55);
  const b = Math.floor(150 + Math.random() * 55);
  return `rgb(${r}, ${g}, ${b})`;
}

export default HiveWeightChartSingle;

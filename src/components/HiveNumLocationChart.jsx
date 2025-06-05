import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import axios from 'axios';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: { position: 'left' },
    title: { display: true, text: 'Št. panjev po lokacijah:' },
  }
}

function HiveNumLocationChart() {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: json } = await axios.get(`${apiUrl}/hive/list`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('site')}` },
        });

        const locationCounts = {};

        json.forEach(hive => {
          const location = hive.location;
          locationCounts[location] = (locationCounts[location] || 0) + 1;
        });

        const labels = Object.keys(locationCounts);
        const data = Object.values(locationCounts);
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
    <div style={{ width: '50%', maxWidth: 500 }}>
      <Doughnut data={chartData} options={options}/>
    </div>
  );
}

function randomColor() {
  const r = Math.floor(150 + Math.random() * 55); 
  const g = Math.floor(150 + Math.random() * 55);
  const b = Math.floor(150 + Math.random() * 55);
  return `rgb(${r}, ${g}, ${b})`;
}

export default HiveNumLocationChart;

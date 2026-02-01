
import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  Title
} from 'chart.js';
import { Radar, Bar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Filler,
  Tooltip,
  Legend
);

interface RadarChartProps {
  labels: string[];
  data: number[];
  label: string;
  compareData?: number[];
  compareLabel?: string;
}

export const CompetencyRadar: React.FC<RadarChartProps> = ({ labels, data, label, compareData, compareLabel }) => {
  const chartData = {
    labels,
    datasets: [
      {
        label,
        data,
        backgroundColor: 'rgba(0, 102, 51, 0.2)',
        borderColor: '#006633',
        borderWidth: 2,
        pointBackgroundColor: '#006633',
      },
      ...(compareData ? [{
        label: compareLabel || '비교',
        data: compareData,
        backgroundColor: 'rgba(255, 200, 0, 0.2)',
        borderColor: '#FFC800',
        borderWidth: 2,
        pointBackgroundColor: '#FFC800',
      }] : [])
    ],
  };

  const options = {
    scales: {
      r: {
        angleLines: { display: true },
        suggestedMin: 50,
        suggestedMax: 100
      }
    },
    maintainAspectRatio: false,
  };

  return <div className="h-64 md:h-80"><Radar data={chartData} options={options} /></div>;
};

export const CompetencyBar: React.FC<RadarChartProps> = ({ labels, data, label }) => {
  const chartData = {
    labels,
    datasets: [
      {
        label,
        data,
        backgroundColor: '#006633',
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: { beginAtZero: true, max: 100 }
    },
    maintainAspectRatio: false,
  };

  return <div className="h-64 md:h-80"><Bar data={chartData} options={options} /></div>;
};

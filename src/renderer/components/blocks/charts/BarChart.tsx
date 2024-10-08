import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface BarChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
      borderWidth: number;
    }[];
  };
  options?: any;
}

const BarChart: React.FC<BarChartProps> = ({ data, options }) => {
  return <Bar data={data} options={options} />;
};

export { BarChart };

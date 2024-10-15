import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface BarChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
    }[];
  };
  options?: any;
  className?: string;
}

const BarChart: React.FC<BarChartProps> = ({ data, options, className }) => {
  return <Bar data={data} options={options} className={className} />;
};

export { BarChart };

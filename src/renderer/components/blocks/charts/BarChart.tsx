import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, Plugin } from 'chart.js';
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
  plugins?: Plugin<'bar'>[];
  options?: any;
  className?: string;
}

const BarChart: React.FC<BarChartProps> = ({ data, options, className, plugins }) => {
  return <Bar data={data} options={options} className={className} plugins={plugins} />;
};

export { BarChart };

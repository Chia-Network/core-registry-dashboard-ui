import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
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
  className?: string;
}

const PieChart: React.FC<PieChartProps> = ({ data, options, className }) => {
  return <Pie data={data} options={options} className={className} />;
};

export { PieChart };

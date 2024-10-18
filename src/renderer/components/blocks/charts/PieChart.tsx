import { Chart as ChartJS, ArcElement, Tooltip, Legend, Plugin } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
    }[];
  };
  plugins?: Plugin<'pie'>[];
  options?: any;
  className?: string;
}

const PieChart: React.FC<PieChartProps> = ({ data, options, className, plugins }) => {
  return <Pie data={data} options={options} className={className} plugins={plugins} />;
};

export { PieChart };

import { BarChart, Card, GlossaryModal } from '@/components';
import { ProjectsCount } from '@/schemas/ProjectsCount.schema';
import { useUrlHash } from '@/hooks';
import { IssuedCarbonByMethodology } from '@/schemas/IssuedCarbonByMethodology.schema';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart } from 'chart.js';

Chart.register(ChartDataLabels);

interface ProjectViewProps {
  projectsCountData: ProjectsCount[];
  projectsCountIsLoading: boolean;
  issuedCarbonByMethodologyData: IssuedCarbonByMethodology;
  IssuedCarbonByMethodologyLoading: boolean;
}

const chartData = {
  labels: ['Company A', 'Company B', 'Company C'],
  datasets: [
    {
      label: 'Payment Amount',
      data: [500, 750, 1200],
      backgroundColor: ['#53D9D9', '#002B49', '#0067A0'],
      borderWidth: 1,
    },
  ],
};

const chartOptions = {
  indexAxis: 'y',
  plugins: {
    legend: {
      display: false,
    },
    responsive: true,
    datalabels: {
      color: '#fff',
      anchor: 'end',
      align: 'start',
      clamp: true,
      formatter: (_value, context) => {
        const label = context.chart.data.labels[context.dataIndex];
        const splitLabel = label.split(':')[0].trim();
        return `${splitLabel}`;
      },
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: 'transparent',
        callback: (value, index) => (index === 0 ? value : ''),
      },
    },
    y: {
      grid: {
        display: false,
      },
      ticks: {
        color: 'transparent',
        callback: (value, index) => (index === 0 ? value : ''),
      },
    },
  },
};
const allowedStatuses = ['Registered', 'Authorized', 'Approved'];

const ProjectsView: React.FC<ProjectViewProps> = ({
  projectsCountData,
  projectsCountIsLoading = false,
  issuedCarbonByMethodologyData,
  IssuedCarbonByMethodologyLoading = false,
}) => {
  const [active, setActive] = useUrlHash('glossary');

  const openModal = () => {
    setActive(true);
  };

  const filteredData = projectsCountData.filter((status) => allowedStatuses.includes(status.projectStatus));

  const sortedMethodologies = issuedCarbonByMethodologyData.issuedTonsCo2
    .filter((item) => item.tonsCo2)
    .sort((a, b) => (b.tonsCo2 || 0) - (a.tonsCo2 || 0))
    .slice(0, 3);

  const issuedCarbonByMethodologyChartData = {
    labels: sortedMethodologies.map((item) => {
      const truncatedMethodology =
        item.methodology.length > 35 ? item.methodology.slice(0, 35) + '...' : item.methodology;

      return truncatedMethodology;
    }),
    datasets: [
      {
        label: 'tonsCo2',
        data: sortedMethodologies.map((item) => item.tonsCo2),
        backgroundColor: ['#53D9D9', '#002B49', '#0067A0'],
        borderWidth: 1,
      },
    ],
  };

  if (projectsCountIsLoading || IssuedCarbonByMethodologyLoading) {
    return null;
  }

  return (
    <div className="flex flex-col gap-16 m-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {filteredData?.map((status) => (
          <Card key={status.projectStatus}>
            <div className="flex flex-col gap-4 p-4 text-center">
              <h3 className="text-7xl bold">{status.count}</h3>
              <h4 className="text-lg font-semibold">
                <a
                  href="#glossary"
                  onClick={() => openModal()}
                  className={`${
                    status.projectStatus.toLowerCase() === 'approved'
                      ? 'text-lime-500 text-left dark:text-green-400'
                      : status.projectStatus.toLowerCase() === 'authorized'
                        ? 'text-left text-sky-400 dark:text-blue-500'
                        : 'text-gray-900 dark:text-white'
                  } underline`}
                >
                  Projects {status.projectStatus}
                </a>
              </h4>
            </div>
          </Card>
        ))}
        <GlossaryModal onClose={() => setActive(false)} open={active} />
      </div>
      {/* This is sample graph. Update it with the actual data */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="flex items-center p-4 bg-white border border-gray-200 rounded-lg shadow-md dark:border-gray-700 dark:bg-gray-800">
          <BarChart data={issuedCarbonByMethodologyChartData} options={chartOptions} />
        </div>
        <div className="flex items-center p-4 bg-white border border-gray-200 rounded-lg shadow-md dark:border-gray-700 dark:bg-gray-800">
          <BarChart data={chartData} options={chartOptions} />
        </div>
        <div className="flex items-center p-4 bg-white border border-gray-200 rounded-lg shadow-md dark:border-gray-700 dark:bg-gray-800">
          <BarChart data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export { ProjectsView };

import { BarChart, Card, GlossaryModal } from '@/components';
import { ProjectsCount } from '@/schemas/ProjectsCount.schema';
import { useUrlHash } from '@/hooks';
import { IssuedCarbonByMethodology, IssuedCarbonByProjectType } from '@/schemas/IssuedCarbon.schema';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart } from 'chart.js';

Chart.register(ChartDataLabels);

interface ProjectViewProps {
  projectsCountData: ProjectsCount[];
  projectsCountIsLoading: boolean;
  issuedCarbonByMethodologyData: IssuedCarbonByMethodology;
  issuedCarbonByMethodologyLoading: boolean;
  issuedCarbonByProjectTypeData: IssuedCarbonByProjectType;
  issuedCarbonByProjectTypeLoading: boolean;
}

const chartOptionsBase = {
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
        return label?.split(':')[0].trim() || '';
      },
    },
    title: {
      display: true,
      text: '',
      font: {
        size: 18,
      },
      position: 'bottom',
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: {
        color: 'transparent',
        callback: (value, index) => (index === 0 ? value : ''),
      },
    },
    y: {
      grid: { display: false },
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
  issuedCarbonByMethodologyLoading = false,
  issuedCarbonByProjectTypeData,
  issuedCarbonByProjectTypeLoading = false,
}) => {
  const [active, setActive] = useUrlHash('glossary');

  const openModal = () => setActive(true);

  const filteredData = projectsCountData.filter((status) => allowedStatuses.includes(status.projectStatus));

  const generateChartData = (data: { projectType?: string; methodology?: string; tonsCo2: number }[]) => {
    return data
      .filter((item) => item.tonsCo2 > 0 && (item.methodology || item.projectType))
      .sort((a, b) => (b.tonsCo2 || 0) - (a.tonsCo2 || 0))
      .slice(0, 3)
      .reduce(
        (acc, item) => {
          const label = item.methodology || item.projectType;
          if (label) {
            acc.labels.push(label.length > 35 ? label.slice(0, 35) + '...' : label);
            acc.data.push(item.tonsCo2);
          }
          return acc;
        },
        { labels: [] as string[], data: [] as number[] },
      );
  };

  const createChartData = (issuedData: { issuedTonsCo2: any }) => {
    const { labels, data } = generateChartData(issuedData.issuedTonsCo2);
    return {
      labels,
      datasets: [
        {
          label: 'tonsCo2',
          data,
          backgroundColor: ['#53D9D9', '#002B49', '#0067A0'],
          borderWidth: 1,
        },
      ],
    };
  };

  const charts = [
    {
      data: createChartData(issuedCarbonByMethodologyData),
      title: 'Issued Carbon by Methodology',
    },
    {
      data: createChartData(issuedCarbonByProjectTypeData),
      title: 'Issued Carbon by Project Type',
    },
    {
      data: {
        labels: ['Company A', 'Company B', 'Company C'],
        datasets: [
          {
            label: 'Payment Amount',
            data: [500, 750, 1200],
            backgroundColor: ['#53D9D9', '#002B49', '#0067A0'],
            borderWidth: 1,
          },
        ],
      },
      title: 'Sample Graph',
    },
  ];

  if (projectsCountIsLoading || issuedCarbonByMethodologyLoading || issuedCarbonByProjectTypeLoading) {
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
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {charts.map(({ data, title }, index) => (
          <div
            key={index}
            className="flex items-center p-4 bg-white border border-gray-200 rounded-lg shadow-md dark:border-gray-700 dark:bg-gray-800"
          >
            <BarChart
              data={data}
              options={{
                ...chartOptionsBase,
                plugins: {
                  ...chartOptionsBase.plugins,
                  title: {
                    ...chartOptionsBase.plugins.title,
                    text: title,
                  },
                },
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export { ProjectsView };

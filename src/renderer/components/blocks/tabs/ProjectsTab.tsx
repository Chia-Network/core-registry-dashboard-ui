import {
  ApprovedProjectsCard,
  AuthorizedProjectsCard,
  BarChart,
  Card,
  GlossaryModal,
  PieChart,
  RegisteredProjectsCard,
} from '@/components';
import { useUrlHash } from '@/hooks';
import { IssuedCarbonByMethodology, IssuedCarbonByProjectType } from '@/schemas/IssuedCarbon.schema';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart } from 'chart.js';
import { ProjectsHostedCount } from '@/schemas/ProjectsHostedCount.schema';

Chart.register(ChartDataLabels);

interface ProjectTabProps {
  projectsHostedCountData: ProjectsHostedCount;
  projectsHostedCountLoading: boolean;
  issuedCarbonByMethodologyData: IssuedCarbonByMethodology;
  issuedCarbonByMethodologyLoading: boolean;
  issuedCarbonByProjectTypeData: IssuedCarbonByProjectType;
  issuedCarbonByProjectTypeLoading: boolean;
}

const barChartOptionsBase = {
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

const pieChartOptionsBase = {
  plugins: {
    legend: {
      display: true,
    },
    responsive: true,
    datalabels: {
      color: 'white',
      formatter: () => '',
    },
  },
};

const COLORS = {
  BAR: ['#53D9D9', '#002B49', '#0067A0'],
  PIE: ['#53D9D9', '#002B49'],
};

const ProjectsTab: React.FC<ProjectTabProps> = ({
  projectsHostedCountData,
  projectsHostedCountLoading = false,
  issuedCarbonByMethodologyData,
  issuedCarbonByMethodologyLoading = false,
  issuedCarbonByProjectTypeData,
  issuedCarbonByProjectTypeLoading = false,
}) => {
  const [active, setActive] = useUrlHash('glossary');

  const openModal = () => setActive(true);

  const generateBarChartData = (data: { projectType?: string; methodology?: string; tonsCo2: number }[]) => {
    const filtered = data
      .filter((item) => item.tonsCo2 > 0 && (item.methodology || item.projectType))
      .sort((a, b) => (b.tonsCo2 || 0) - (a.tonsCo2 || 0))
      .slice(0, 3);

    const labels = filtered.map((item) => {
      const label = item.methodology || item.projectType;
      return label ? (label.length > 35 ? label.slice(0, 35) + '...' : label) : '';
    });

    const chartData = filtered.map((item) => item.tonsCo2);

    return createChartData(labels, chartData, 'tonsCo2', COLORS.BAR);
  };
  const selfHostedCount = projectsHostedCountData.selfHostedProjectCount;
  const externallyHostedCount = projectsHostedCountData.externallyHostedProjectCount;

  const createChartData = (labels: string[], data: number[], label: string, backgroundColor: string[]) => ({
    labels,
    datasets: [
      {
        label,
        data,
        backgroundColor,
        borderWidth: 1,
      },
    ],
  });

  const charts = [
    {
      data: generateBarChartData(issuedCarbonByMethodologyData.issuedTonsCo2),
      title: 'Issued Carbon by Methodology',
      type: 'bar',
    },
    {
      data: generateBarChartData(issuedCarbonByProjectTypeData.issuedTonsCo2),
      title: 'Issued Carbon by Project Type',
      type: 'bar',
    },
    {
      data: createChartData(
        ['Externally Hosted Projects', 'Self Hosted Projects'],
        [externallyHostedCount, selfHostedCount],
        'Count',
        COLORS.PIE,
      ),
      type: 'pie',
    },
  ];
  if (projectsHostedCountLoading || issuedCarbonByMethodologyLoading || issuedCarbonByProjectTypeLoading) {
    return null;
  }

  return (
    <div className="flex flex-col gap-16 m-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <RegisteredProjectsCard onGlossaryClick={() => openModal()} />
        <AuthorizedProjectsCard onGlossaryClick={() => openModal()} />
        <ApprovedProjectsCard onGlossaryClick={() => openModal()} />
        <GlossaryModal onClose={() => setActive(false)} open={active} />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {charts.map(({ data, title, type }, index) => (
          <Card key={index} className="justify-center max-h-[450px]">
            {type === 'bar' ? (
              <BarChart
                data={data}
                options={{
                  ...barChartOptionsBase,
                  plugins: {
                    ...barChartOptionsBase.plugins,
                    title: {
                      ...barChartOptionsBase.plugins.title,
                      text: title,
                    },
                  },
                }}
              />
            ) : (
              <PieChart
                data={data}
                options={{
                  ...pieChartOptionsBase,
                  plugins: {
                    ...pieChartOptionsBase.plugins,
                    title: {
                      display: false,
                    },
                  },
                }}
              />
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export { ProjectsTab };

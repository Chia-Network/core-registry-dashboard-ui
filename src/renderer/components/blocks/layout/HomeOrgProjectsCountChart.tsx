import { Card, PieChart, SkeletonCard } from '@/components';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart } from 'chart.js';
import { generatePieChartData, pieChartOptionsBase } from '@/utils/chart-utils';
import { useGetProjectsCountQuery } from '@/api';
import { FormattedMessage } from 'react-intl';
import { ProjectsHostedCount } from '@/schemas/ProjectsHostedCount.schema';

Chart.register(ChartDataLabels);
const backgroundColors = ['rgba(83, 217, 217, 0.7)', 'rgba(0, 43, 73, 0.7)'];
const borderColors = ['#53D9D9', '#002B49'];

const HomeOrgProjectsCountChart = () => {
  const {
    data: homeOrgProjectsCountData,
    isLoading: homeOrgProjectsCountLoading,
    error: homeOrgProjectsCountError,
  } = useGetProjectsCountQuery({
    hostRegistry: true,
  });

  if (homeOrgProjectsCountLoading) {
    return <SkeletonCard />;
  }

  if (homeOrgProjectsCountError) {
    return (
      <p className="capitalize">
        <FormattedMessage id={'unable-to-load-contents'} />
      </p>
    );
  }

  if (!homeOrgProjectsCountData) {
    return (
      <p className="capitalize">
        <FormattedMessage id={'no-records-found'} />
      </p>
    );
  }

  const hostedCountData = homeOrgProjectsCountData.data as ProjectsHostedCount;
  const selfHostedCount = hostedCountData.selfHostedProjectCount || 0;
  const externallyHostedCount = hostedCountData.externallyHostedProjectCount || 0;

  const chartData = generatePieChartData(
    ['Externally Hosted Projects', 'Self Hosted Projects'],
    [externallyHostedCount, selfHostedCount],
    backgroundColors,
    borderColors,
    'Count',
  );

  return (
    <Card className="items-center">
      <PieChart
        data={chartData}
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
    </Card>
  );
};

export { HomeOrgProjectsCountChart };

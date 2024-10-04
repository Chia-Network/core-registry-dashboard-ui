import { Card, PieChart, SkeletonCard } from '@/components';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart } from 'chart.js';
import { generatePieChartData, pieChartOptionsBase } from '@/utils/chart-utils';
import { useGetProjectsCountQuery } from '@/api';
import { FormattedMessage } from 'react-intl';
import { useQueryParamState } from '@/hooks';
import { ProjectsHostedCount } from '@/schemas/ProjectsHostedCount.schema';

Chart.register(ChartDataLabels);

const HomeOrgProjectsCountChart = () => {
  const [hostRegistry /* set func here */] = useQueryParamState('hostRegistry', 'true');
  const {
    data: homeOrgProjectsCountData,
    isLoading: homeOrgProjectsCountLoading,
    error: homeOrgProjectsCountError,
  } = useGetProjectsCountQuery({
    hostRegistry: hostRegistry ? Boolean(hostRegistry) : undefined,
  });

  if (homeOrgProjectsCountLoading) {
    return <SkeletonCard />;
  }

  if (homeOrgProjectsCountError) {
    return <FormattedMessage id={'unable-to-load-contents'} />;
  }

  if (!homeOrgProjectsCountData) {
    return <FormattedMessage id={'no-records-found'} />;
  }

  const hostedCountData = homeOrgProjectsCountData.data as ProjectsHostedCount;
  const selfHostedCount = hostedCountData.selfHostedProjectCount || 0;
  const externallyHostedCount = hostedCountData.externallyHostedProjectCount || 0;

  const chartData = generatePieChartData(
    ['Externally Hosted Projects', 'Self Hosted Projects'],
    [externallyHostedCount, selfHostedCount],
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

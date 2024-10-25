import { Card, PieChart, SkeletonCard } from '@/components';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart } from 'chart.js';
import { createChartDataWithSingleDataset, createNoDataPlugin, pieChartOptionsBase } from '@/utils/chart-utils';
import { useGetProjectsCountQuery } from '@/api';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import { ProjectsHostedCount } from '@/schemas/ProjectsHostedCount.schema';
import { capitalizeText, convertKeyToLabel } from '@/utils/text-utils';

Chart.register(ChartDataLabels);

const HomeOrgProjectsCountChart = () => {
  const {
    data: homeOrgProjectsCountData,
    isLoading: homeOrgProjectsCountLoading,
    error: homeOrgProjectsCountError,
  } = useGetProjectsCountQuery({
    hostRegistry: true,
  });
  const intl: IntlShape = useIntl();

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

  const hostedCountData = homeOrgProjectsCountData?.data
    ? (homeOrgProjectsCountData?.data as ProjectsHostedCount)
    : {
        selfHostedProjectCount: 0,
        externallyHostedProjectCount: 0,
      };

  const chartData = createChartDataWithSingleDataset(
    Object.keys(hostedCountData)?.map((key) => convertKeyToLabel(key) || ''),
    Object.values(hostedCountData)?.map((value) => value ?? 0),
    capitalizeText(intl.formatMessage({ id: 'count' })),
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
        plugins={[createNoDataPlugin(intl)]}
      />
    </Card>
  );
};

export { HomeOrgProjectsCountChart };

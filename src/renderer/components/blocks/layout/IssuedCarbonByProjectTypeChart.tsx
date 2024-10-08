import { BarChart, Card, SkeletonCard } from '@/components';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart } from 'chart.js';
import { barChartOptionsBase, generateBarChartData } from '@/utils/chart-utils';
import { useGetIssuedCarbonByProjectTypeQuery } from '@/api';
import { FormattedMessage } from 'react-intl';

Chart.register(ChartDataLabels);

const IssuedCarbonByProjectTypeChart = () => {
  const {
    data: issuedCarbonByProjectTypeData,
    isLoading: issuedCarbonByProjectTypeLoading,
    error: issuedCarbonByProjectTypeError,
  } = useGetIssuedCarbonByProjectTypeQuery({});

  if (issuedCarbonByProjectTypeLoading) {
    return <SkeletonCard />;
  }

  if (issuedCarbonByProjectTypeError) {
    return (
      <p className="capitalize">
        <FormattedMessage id={'unable-to-load-contents'} />
      </p>
    );
  }

  if (!issuedCarbonByProjectTypeData) {
    return (
      <p className="capitalize">
        <FormattedMessage id={'no-records-found'} />
      </p>
    );
  }

  const chartData = generateBarChartData(issuedCarbonByProjectTypeData.data.issuedTonsCo2, 'projectType');

  return (
    <Card>
      <BarChart
        data={chartData}
        options={{
          ...barChartOptionsBase,
          plugins: {
            ...barChartOptionsBase.plugins,
            title: {
              ...barChartOptionsBase.plugins.title,
              text: 'Issued Carbon by Project Type',
            },
          },
        }}
      />
    </Card>
  );
};

export { IssuedCarbonByProjectTypeChart };

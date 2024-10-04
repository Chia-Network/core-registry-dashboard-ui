import { BarChart, Card, SkeletonCard } from '@/components';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart } from 'chart.js';
import { barChartOptionsBase, generateBarChartData } from '@/utils/chart-utils';
import { useGetIssuedCarbonByMethodologyQuery } from '@/api';
import { FormattedMessage } from 'react-intl';

Chart.register(ChartDataLabels);

const IssuedCarbonByMethodologyChart = () => {
  const {
    data: issuedCarbonByMethodologyData,
    isLoading: issuedCarbonByMethodologyLoading,
    error: issuedCarbonByMethodologyError,
  } = useGetIssuedCarbonByMethodologyQuery({});

  if (issuedCarbonByMethodologyLoading) {
    return <SkeletonCard />;
  }

  if (issuedCarbonByMethodologyError) {
    return <FormattedMessage id={'unable-to-load-contents'} />;
  }

  if (!issuedCarbonByMethodologyData) {
    return <FormattedMessage id={'no-records-found'} />;
  }

  const chartData = generateBarChartData(issuedCarbonByMethodologyData.data.issuedTonsCo2, 'methodology');

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
              text: 'Issued Carbon by Methodology',
            },
          },
        }}
      />
    </Card>
  );
};

export { IssuedCarbonByMethodologyChart };

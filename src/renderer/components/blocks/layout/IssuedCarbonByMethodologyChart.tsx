import { BarChart, Card, SkeletonCard } from '@/components';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart } from 'chart.js';
import { barChartOptionsBase, createChartDataWithSingleDataset } from '@/utils/chart-utils';
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
    return (
      <p className="capitalize">
        <FormattedMessage id={'unable-to-load-contents'} />
      </p>
    );
  }

  if (!issuedCarbonByMethodologyData) {
    return (
      <p className="capitalize">
        <FormattedMessage id={'no-records-found'} />
      </p>
    );
  }

  const filteredData = issuedCarbonByMethodologyData.data.issuedTonsCo2
    .filter((item) => item.tonsCo2 > 0 && item.methodology)
    .sort((a, b) => b.tonsCo2 - a.tonsCo2)
    .slice(0, 3);

  const labels = filteredData?.map((item) => {
    const label = item?.methodology || '';
    return label?.length > 35 ? label.slice(0, 35) + '...' : label;
  });

  const chartDataArray = filteredData.map((item) => item.tonsCo2);

  const chartData = createChartDataWithSingleDataset(labels, chartDataArray, 'tonsCo2');

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

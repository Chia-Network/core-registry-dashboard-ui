import { BarChart, Card, SkeletonCard } from '@/components';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart } from 'chart.js';
import { barChartOptionsBase, createChartDataWithSingleDataset, createNoDataPlugin } from '@/utils/chart-utils';
import { useGetIssuedCarbonByProjectTypeQuery } from '@/api';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';

Chart.register(ChartDataLabels);

const IssuedCarbonByProjectTypeChart = () => {
  const {
    data: issuedCarbonByProjectTypeData,
    isLoading: issuedCarbonByProjectTypeLoading,
    error: issuedCarbonByProjectTypeError,
  } = useGetIssuedCarbonByProjectTypeQuery({});
  const intl: IntlShape = useIntl();

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

  const filteredData = issuedCarbonByProjectTypeData.data.issuedTonsCo2
    .filter((item) => item.tonsCo2 > 0 && item.projectType)
    .sort((a, b) => b.tonsCo2 - a.tonsCo2)
    .slice(0, 3);

  const labels = filteredData?.map((item) => {
    const label = item?.projectType || '';
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
              text: 'Issued Carbon by Project Type',
            },
          },
        }}
        plugins={[createNoDataPlugin(intl)]}
      />
    </Card>
  );
};

export { IssuedCarbonByProjectTypeChart };

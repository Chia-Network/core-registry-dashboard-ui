import { BarChart, Card, SkeletonCard } from '@/components';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart } from 'chart.js';
import { barChartOptionsBase, createChartDataWithSingleDataset, createNoDataPlugin } from '@/utils/chart-utils';
import { useGetIssuedCarbonByMethodologyQuery } from '@/api';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import { capitalizeText } from '../../../utils/text-utils';

Chart.register(ChartDataLabels);

const IssuedCarbonByMethodologyChart = () => {
  const {
    data: issuedCarbonByMethodologyData,
    isLoading: issuedCarbonByMethodologyLoading,
    error: issuedCarbonByMethodologyError,
  } = useGetIssuedCarbonByMethodologyQuery({});
  const intl: IntlShape = useIntl();

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

  const chartData = createChartDataWithSingleDataset(
    labels,
    chartDataArray,
    capitalizeText(intl.formatMessage({ id: 'tons-co2' })),
  );

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
              text: capitalizeText(intl.formatMessage({ id: 'issued-carbon-by-methodology' })),
            },
          },
        }}
        plugins={[createNoDataPlugin(intl)]}
      />
    </Card>
  );
};

export { IssuedCarbonByMethodologyChart };

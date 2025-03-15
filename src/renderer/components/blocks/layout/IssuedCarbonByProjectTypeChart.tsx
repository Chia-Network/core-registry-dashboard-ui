import { BarChart, Card, SkeletonCard } from '@/components';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart } from 'chart.js';
import { barChartOptionsBase, createChartDataWithSingleDataset, createNoDataPlugin } from '@/utils/chart-utils';
import { useGetIssuedCarbonByProjectTypeQuery } from '@/api';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import { capitalizeText } from '@/utils/text-utils';

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

  const issuedData = issuedCarbonByProjectTypeData?.data?.issuedTonsCo2 ?? [];

  const filteredData = issuedData
    .filter((item) => item?.tonsCo2 !== undefined && item?.tonsCo2 !== null && item?.tonsCo2 > 0 && item?.projectType)
    .sort((a, b) => (b?.tonsCo2 || 0) - (a?.tonsCo2 || 0))
    .slice(0, 3);

  const labels =
    filteredData?.map((item) => {
      const label = item?.projectType || '';
      return label?.length > 35 ? label.slice(0, 35) + '...' : label;
    }) ?? [];

  const chartDataArray = filteredData.map((item) => item?.tonsCo2 || 0);

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
              text:
                capitalizeText(intl.formatMessage({ id: 'carbon-credits-issued-in-the-last-10-years' })) + ' (tC02e)',
            },
          },
        }}
        plugins={[createNoDataPlugin(intl)]}
      />
    </Card>
  );
};

export { IssuedCarbonByProjectTypeChart };

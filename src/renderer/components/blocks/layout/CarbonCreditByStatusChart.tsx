import { useGetTonsCo2Query } from '@/api/cadt/v1/tonsCo2.api';
import { Card, SkeletonCard, Select, BarChart } from '@/components';
import { useQueryParamState } from '@/hooks';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { barChartOptionsBase, createChartDataWithMultipleDatasets, createNoDataPlugin } from '@/utils/chart-utils';
import { generateYearsRange } from '@/utils/date-utils';
import { capitalizeText } from '@/utils/text-utils';
import { useMemo } from 'react';
import { TonsCo2 } from '@/schemas/TonsCo2.schema';

ChartJS.register(ArcElement, Tooltip, Legend);

const CarbonCreditByStatusChart: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [unitStatus] = useQueryParamState('carbonCreditUnitStatus', 'all');
  const [vintageYear, setVintageYear] = useQueryParamState('vintageYear', String(currentYear));
  const intl: IntlShape = useIntl();

  const {
    data: carbonCreditByStatusData,
    isLoading: carbonCreditByStatusLoading,
    error: carbonCreditByStatusError,
  } = useGetTonsCo2Query({ unitStatus, vintageYear });

  const yearSelectorLabelsValues = useMemo(
    () =>
      generateYearsRange(10).map((selection) => {
        return { label: `${intl.formatMessage({ id: 'vintage' })} ${selection.label}`, value: selection.value };
      }),
    [intl],
  );

  if (carbonCreditByStatusLoading) {
    return <SkeletonCard />;
  }

  if (carbonCreditByStatusError) {
    return (
      <p className="capitalize">
        <FormattedMessage id={'unable-to-load-contents'} />
      </p>
    );
  }

  if (!carbonCreditByStatusData) {
    return (
      <p className="capitalize">
        <FormattedMessage id={'no-records-found'} />
      </p>
    );
  }

  const datasetData =
    carbonCreditByStatusData?.data
      ?.map((item: TonsCo2) => {
        return {
          label: item?.unitStatus || '',
          data: [item?.tonsCo2 || 0],
        };
      })
      .filter((item) => item?.label) || [];
  const chartData = createChartDataWithMultipleDatasets(
    [capitalizeText(intl.formatMessage({ id: 'tons-co2' }))],
    datasetData,
  );

  const handleYearChange = (value: string | number) => {
    setVintageYear(value as string);
  };

  return (
    <Card>
      <div className="flex flex-col justify-between h-full">
        <div className="grid justify-end">
          <Select
            name="year"
            options={yearSelectorLabelsValues}
            initialValue={vintageYear}
            onChange={handleYearChange}
          />
        </div>
        <div className="flex flex-col justify-center h-full">
          <BarChart
            className="h-full"
            data={chartData}
            options={{
              ...barChartOptionsBase,
              plugins: {
                ...barChartOptionsBase.plugins,
                legend: { show: true },
                title: {
                  ...barChartOptionsBase.plugins.title,
                  text: capitalizeText(intl.formatMessage({ id: 'carbon-credits-by-status' })),
                },
              },
            }}
            plugins={[createNoDataPlugin(intl)]}
          />
        </div>
      </div>
    </Card>
  );
};

export { CarbonCreditByStatusChart };

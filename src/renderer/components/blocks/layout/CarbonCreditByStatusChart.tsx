import { useGetTonsCo2Query } from '@/api/cadt/v1/tonsCo2.api';
import { PieChart, Card, SkeletonCard, Select } from '@/components';
import { useQueryParamState } from '@/hooks';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { createChartDataWithSingleDataset, createNoDataPlugin, pieChartOptionsBase } from '@/utils/chart-utils';
import { generateYearsRange } from '@/utils/date-utils';
import { capitalizeText } from '@/utils/text-utils';
import { useMemo } from 'react';

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

  const labels = carbonCreditByStatusData?.data?.map((item: any) => item?.unitStatus) || [];
  const datasetData = carbonCreditByStatusData?.data?.map((item: any) => item?.tonsCo2) || [];
  const chartData = createChartDataWithSingleDataset(
    labels,
    datasetData,
    capitalizeText(intl.formatMessage({ id: 'tons-co2' })),
  );

  const handleYearChange = (value: string | number) => {
    setVintageYear(value as string);
  };

  return (
    <Card>
      <div className="grid justify-end">
        <Select name="year" options={yearSelectorLabelsValues} initialValue={vintageYear} onChange={handleYearChange} />
      </div>
      <PieChart
        className="max-h-[420px]"
        data={chartData}
        options={{
          ...pieChartOptionsBase,
          plugins: {
            ...pieChartOptionsBase.plugins,
            title: {
              ...pieChartOptionsBase.plugins.title,
              text: capitalizeText(intl.formatMessage({ id: 'carbon-credits-by-status' })),
            },
          },
        }}
        plugins={[createNoDataPlugin(intl)]}
      />
    </Card>
  );
};

export { CarbonCreditByStatusChart };

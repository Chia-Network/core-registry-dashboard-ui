import { useGetTonsCo2Query } from '@/api/cadt/v1/tonsCo2.api';
import { PieChart, Card, SkeletonCard, Select } from '@/components';
import { useQueryParamState } from '@/hooks';
import { FormattedMessage } from 'react-intl';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { createChartDataWithSingleDataset, pieChartOptionsBase } from '@/utils/chart-utils';
import { generateYearsRange } from '@/utils/date-utils';

ChartJS.register(ArcElement, Tooltip, Legend);

const CarbonCreditByStatusChart = () => {
  const [unitStatus] = useQueryParamState('carbonCreditUnitStatus', 'all');
  const [vintageYear, setVintageYear] = useQueryParamState('vintageYear', undefined);

  const {
    data: carbonCreditByStatusData,
    isLoading: carbonCreditByStatusLoading,
    error: carbonCreditByStatusError,
  } = useGetTonsCo2Query({ unitStatus, vintageYear });

  const labels = carbonCreditByStatusData?.data.map((item: any) => item.unitStatus) || [];
  const datasetData = carbonCreditByStatusData?.data.map((item: any) => item.tonsCo2) || [];
  const chartData = createChartDataWithSingleDataset(labels, datasetData, 'TonsCo2');

  const handleYearChange = (value) => {
    setVintageYear(value);
  };

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

  return (
    <Card>
      <div className="grid justify-end">
        <Select name="year" options={generateYearsRange(10)} initialValue={vintageYear} onChange={handleYearChange} />
      </div>
      <PieChart
        className="max-h-[450px]"
        data={chartData}
        options={{
          ...pieChartOptionsBase,
          plugins: {
            ...pieChartOptionsBase.plugins,
            title: {
              ...pieChartOptionsBase.plugins.title,
              text: 'Carbon Credits by Status',
            },
          },
        }}
      />
    </Card>
  );
};

export { CarbonCreditByStatusChart };

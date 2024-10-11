import { useGetTonsCo2Query } from '@/api/cadt/v1/tonsCo2.api';
import { PieChart, Card, SkeletonCard, Select } from '@/components';
import { useQueryParamState } from '@/hooks';
import { FormattedMessage } from 'react-intl';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { generatePieChartData, pieChartOptionsBase } from '@/utils/chart-utils';
import { useEffect, useState } from 'react';

ChartJS.register(ArcElement, Tooltip, Legend);
const borderColors = ['rgba(75, 192, 192, 1)', 'rgba(0, 43, 73, 1)', 'rgba(0, 103, 160, 1)'];
const backgroundColors = ['rgba(75, 192, 192, 0.7)', 'rgba(0, 43, 73, 0.7)', 'rgba(0, 103, 160, 0.7)'];

const generateLastTenYears = (): { label: string; value: string }[] => {
  const currentYear = `${new Date().getFullYear()}`;
  return Array.from({ length: 10 }, (_, index) => {
    const year = parseInt(currentYear) - index;
    return { label: year.toString(), value: `${year}` };
  });
};

const CarbonCreditByStatusChart = () => {
  const [unitStatus] = useQueryParamState('unitStatus', 'all');
  const [vintageYear] = useQueryParamState('vintageYear', undefined);
  const [selectedYear, setSelectedYear] = useState<string>(`${new Date().getFullYear()}`);

  const {
    data: carbonCreditByStatusData,
    isLoading: carbonCreditByStatusLoading,
    error: carbonCreditByStatusError,
  } = useGetTonsCo2Query({ unitStatus, vintageYear: selectedYear });

  useEffect(() => {
    if (vintageYear) {
      setSelectedYear(vintageYear);
    }
  }, [vintageYear]);

  const labels = carbonCreditByStatusData?.data.map((item: any) => item.unitStatus) || [];
  const datasetData = carbonCreditByStatusData?.data.map((item: any) => item.tonsCo2) || [];
  const chartData = generatePieChartData(labels, datasetData, backgroundColors, borderColors, 'TonsCo2');

  const handleYearChange = (value) => {
    setSelectedYear(value);
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
      <p className="capitalize">
        <FormattedMessage id={'carbon-credits-by-status'} />
      </p>
      <div className="grid justify-end">
        <Select name="year" options={generateLastTenYears()} initialValue={selectedYear} onChange={handleYearChange} />
      </div>
      <PieChart
        className="max-h-[450px]"
        data={chartData}
        options={{
          ...pieChartOptionsBase,
          plugins: {
            ...pieChartOptionsBase.plugins,
            title: {
              display: false,
              text: 'Carbon Credits by Status',
            },
          },
        }}
      />
    </Card>
  );
};

export { CarbonCreditByStatusChart };

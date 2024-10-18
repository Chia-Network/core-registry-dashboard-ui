import { useGetTonsCo2Query } from '@/api/cadt/v1/tonsCo2.api';
import { BarChart, Card, Select, SkeletonCard } from '@/components';
import { useQueryParamState } from '@/hooks';
import { FormattedMessage } from 'react-intl';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import {
  createChartDataWithMultipleDatasets,
  createNoDataPlugin,
  stackedBarChartOptionsBase,
} from '@/utils/chart-utils';
import { TonsCo2 } from '@/schemas/TonsCo2.schema';
import { generateYearsRange } from '@/utils/date-utils';
import { IntlShape, useIntl } from 'react-intl';
import { capitalizeText } from '@/utils/text-utils';

ChartJS.register(ArcElement, Tooltip, Legend);

const processCarbonDataByYearAndType = (data: TonsCo2[], unitStatus: string | undefined, unitType: string) => {
  const groupedData: Record<string, Record<string, number>> = {};
  data.forEach((item) => {
    const isUnitStatusMatch = item.unitStatus === unitStatus;
    const isUnitTypeMatch = unitType === 'all' || item.unitType === unitType;
    if ((!unitStatus || isUnitStatusMatch) && isUnitTypeMatch) {
      const { vintageYear, unitType, tonsCo2 } = item;
      if (vintageYear && !groupedData[vintageYear]) {
        groupedData[vintageYear] = {};
      }
      if (vintageYear && unitType && !groupedData[vintageYear][unitType]) {
        groupedData[vintageYear][unitType] = 0;
      }
      if (vintageYear && unitType && tonsCo2) {
        groupedData[vintageYear][unitType] += tonsCo2;
      }
    }
  });

  return groupedData;
};

const IssuedCarbonYearlyChart: React.FC = () => {
  const [vintageYearRangeStart] = useQueryParamState('vintageYearRangeStart', `${new Date().getFullYear() - 9}`);
  const [vintageYearRangeEnd] = useQueryParamState('vintageYearRangeEnd', `${new Date().getFullYear()}`);
  const [unitStatus, setUnitStatus] = useQueryParamState('issuedCarbonUnitStatus', undefined);
  const [unitType] = useQueryParamState('unitType', 'all');
  const intl: IntlShape = useIntl();

  const {
    data: carbonCreditByStatusData,
    isLoading: carbonCreditByStatusLoading,
    error: carbonCreditByStatusError,
  } = useGetTonsCo2Query({ unitType, vintageYearRangeStart, vintageYearRangeEnd, unitStatus });

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

  const unitStatusOptions = [
    { label: intl.formatMessage({ id: 'retired' }), value: 'Retired' },
    { label: intl.formatMessage({ id: 'held' }), value: 'Held' },
    { label: intl.formatMessage({ id: 'cancelled' }), value: 'Cancelled' },
  ];

  const lastTenYears = generateYearsRange(10)
    .map((year) => year.label)
    .reverse();
  const carbonData = processCarbonDataByYearAndType(carbonCreditByStatusData.data, unitStatus, unitType);

  const unitTypes = Array.from(
    new Set(carbonCreditByStatusData.data.map((item) => item.unitType).filter((item) => Boolean(item))),
  ) as string[];

  const datasets = unitTypes.map((type) => ({
    label: type,
    data: lastTenYears.map((year) => carbonData[year]?.[type] || 0),
  }));

  const chartData2 = createChartDataWithMultipleDatasets(lastTenYears, datasets);

  return (
    <Card>
      <div className="grid justify-end">
        <Select
          name="status"
          options={unitStatusOptions}
          initialValue={unitStatus}
          onChange={(value) => {
            setUnitStatus(String(value));
          }}
        />
      </div>
      <BarChart
        data={chartData2}
        options={{
          ...stackedBarChartOptionsBase,
          plugins: {
            ...stackedBarChartOptionsBase.plugins,
            title: {
              ...stackedBarChartOptionsBase,
              text: capitalizeText(intl.formatMessage({ id: 'issued-carbon-last-10-years' })),
            },
          },
        }}
        plugins={[createNoDataPlugin(intl)]}
      />
    </Card>
  );
};

export { IssuedCarbonYearlyChart };

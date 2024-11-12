import { CarbonCreditByStatusChart, IssuedCarbonYearlyChart } from '@/components';

const UnitsTab = () => {
  return (
    <div className="flex flex-col gap-16 m-4">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <IssuedCarbonYearlyChart />
        <CarbonCreditByStatusChart />
      </div>
    </div>
  );
};

export { UnitsTab };

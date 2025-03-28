import { CarbonCreditByStatusChart, IssuedCarbonYearlyChart } from '@/components';

const UnitsTab = () => {
  return (
    <div className="flex flex-col gap-16 m-4">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <IssuedCarbonYearlyChart />
        </div>
        <CarbonCreditByStatusChart />
      </div>
    </div>
  );
};

export { UnitsTab };

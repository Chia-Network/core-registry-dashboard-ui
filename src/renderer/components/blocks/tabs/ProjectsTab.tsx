import {
  ApprovedProjectsCard,
  AuthorizedProjectsCard,
  GlossaryModal,
  HomeOrgProjectsCountChart,
  IssuedCarbonByMethodologyChart,
  IssuedCarbonByProjectTypeChart,
  RegisteredProjectsCard,
} from '@/components';
import { useUrlHash } from '@/hooks';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart } from 'chart.js';

Chart.register(ChartDataLabels);

const ProjectsTab = () => {
  const [active, setActive] = useUrlHash('glossary');

  const openGlossaryModal = () => setActive(true);

  return (
    <div className="flex flex-col gap-16 m-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <RegisteredProjectsCard onGlossaryClick={() => openGlossaryModal()} />
        <AuthorizedProjectsCard onGlossaryClick={() => openGlossaryModal()} />
        <ApprovedProjectsCard onGlossaryClick={() => openGlossaryModal()} />
        <GlossaryModal onClose={() => setActive(false)} open={active} />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 max-h-[450px]">
        <IssuedCarbonByMethodologyChart />
        <IssuedCarbonByProjectTypeChart />
        <HomeOrgProjectsCountChart />
      </div>
    </div>
  );
};

export { ProjectsTab };

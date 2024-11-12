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
  const [glossaryModalActive, setGlossaryModalActive] = useUrlHash('glossary');

  const openGlossaryModal = () => setGlossaryModalActive(true);

  return (
    <div className="flex flex-col gap-16 m-4">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <RegisteredProjectsCard onGlossaryClick={() => openGlossaryModal()} />
        <AuthorizedProjectsCard onGlossaryClick={() => openGlossaryModal()} />
        <ApprovedProjectsCard onGlossaryClick={() => openGlossaryModal()} />
        <GlossaryModal onClose={() => setGlossaryModalActive(false)} open={glossaryModalActive} />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <IssuedCarbonByMethodologyChart />
        <IssuedCarbonByProjectTypeChart />
        <HomeOrgProjectsCountChart />
      </div>
    </div>
  );
};

export { ProjectsTab };

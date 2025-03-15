import {
  ApprovedProjectsCard,
  AuthorizedProjectsCard,
  GlossaryModal,
  CarbonCreditsIssuedByMethodologyChart,
  IssuedCarbonByProjectTypeChart,
  RegisteredProjectsCard,
  TotalProjectsCountCard,
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
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
        <TotalProjectsCountCard onGlossaryClick={() => openGlossaryModal()} />
        <RegisteredProjectsCard onGlossaryClick={() => openGlossaryModal()} />
        <AuthorizedProjectsCard onGlossaryClick={() => openGlossaryModal()} />
        <ApprovedProjectsCard onGlossaryClick={() => openGlossaryModal()} />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <CarbonCreditsIssuedByMethodologyChart />
        <IssuedCarbonByProjectTypeChart />
      </div>
      <GlossaryModal onClose={() => setGlossaryModalActive(false)} open={glossaryModalActive} />
    </div>
  );
};

export { ProjectsTab };

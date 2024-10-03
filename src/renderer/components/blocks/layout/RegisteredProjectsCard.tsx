import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useGetProjectsCountQuery } from '@/api';
import { Card, SkeletonCard } from '@/components';
import { ProjectsStatusCount } from '@/schemas/ProjectsStatusCount.schema';
import { useQueryParamState } from '@/hooks';

interface RegisteredProjectsCardProps {
  onGlossaryClick: () => void;
}

const RegisteredProjectsCard: React.FC<RegisteredProjectsCardProps> = ({ onGlossaryClick }) => {
  const [projectStatusCount /* set func here */] = useQueryParamState('status', 'true');
  const {
    data: projectsStatusCountData,
    isLoading: projectsStatusCountLoading,
    error: projectsStatusCountError,
  } = useGetProjectsCountQuery({
    status: projectStatusCount ? Boolean(projectStatusCount) : undefined,
  });

  if (projectsStatusCountLoading) {
    return <SkeletonCard />;
  }

  if (projectsStatusCountError) {
    return <FormattedMessage id={'unable-to-load-contents'} />;
  }

  if (!projectsStatusCountData) {
    return <FormattedMessage id={'no-records-found'} />;
  }

  const projectStatusData = projectsStatusCountData.data as ProjectsStatusCount[];
  const statusCount = projectStatusData.find((s) => s.projectStatus === 'Registered')?.count || 0;

  return (
    <Card>
      <div className="flex flex-col gap-4 p-4 text-center">
        <h3 className="text-7xl bold">{statusCount}</h3>
        <h4 className="text-lg font-semibold">
          <a href="#glossary" onClick={onGlossaryClick} className="underline text-sky-800 dark:text-white">
            Projects Registered
          </a>
        </h4>
      </div>
    </Card>
  );
};

export { RegisteredProjectsCard };

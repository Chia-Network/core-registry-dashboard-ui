import React from 'react';
import { FormattedMessage, useIntl, IntlShape } from 'react-intl';
import { useGetProjectsCountQuery } from '@/api';
import { Card, SkeletonCard } from '@/components';
import { ProjectsStatusCount } from '@/schemas/ProjectsStatusCount.schema';

interface AuthorizedProjectsCardProps {
  onGlossaryClick: () => void;
}

const AuthorizedProjectsCard: React.FC<AuthorizedProjectsCardProps> = ({ onGlossaryClick }) => {
  const {
    data: projectsStatusCountData,
    isLoading: projectsStatusCountLoading,
    error: projectsStatusCountError,
  } = useGetProjectsCountQuery({
    status: true,
  });
  const intl: IntlShape = useIntl();

  if (projectsStatusCountLoading) {
    return <SkeletonCard />;
  }

  if (projectsStatusCountError) {
    return (
      <p className="capitalize">
        <FormattedMessage id={'unable-to-load-contents'} />
      </p>
    );
  }

  if (!projectsStatusCountData) {
    return (
      <p className="capitalize">
        <FormattedMessage id={'no-records-found'} />
      </p>
    );
  }

  const projectStatusData = projectsStatusCountData.data as ProjectsStatusCount[];
  const statusCount = projectStatusData.find((s) => s.projectStatus === 'Authorized')?.count || 0;

  return (
    <Card>
      <div className="flex flex-col gap-4 p-4 text-center">
        <h3 className="text-7xl bold">{statusCount}</h3>
        <h4 className="text-lg font-semibold">
          <a href="#glossary" onClick={onGlossaryClick} className="text-left underline text-sky-400 dark:text-blue-500">
            {intl.formatMessage({ id: 'projects-authorized' })}
          </a>
        </h4>
      </div>
    </Card>
  );
};

export { AuthorizedProjectsCard };

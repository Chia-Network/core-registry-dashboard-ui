import React, { useMemo } from 'react';
import { FormattedMessage, useIntl, IntlShape } from 'react-intl';
import { useGetProjectsCountQuery } from '@/api';
import { Card, SkeletonCard } from '@/components';
import { ProjectsStatusCount } from '@/schemas/ProjectsStatusCount.schema';

interface RegisteredProjectsCardProps {
  onGlossaryClick: () => void;
}

const TotalProjectsCountCard: React.FC<RegisteredProjectsCardProps> = ({ onGlossaryClick }) => {
  const {
    data: projectsStatusCountData,
    isLoading: projectsStatusCountLoading,
    error: projectsStatusCountError,
  } = useGetProjectsCountQuery({ status: true });
  const intl: IntlShape = useIntl();

  const totalCount = useMemo(() => {
    const data: ProjectsStatusCount[] | null = projectsStatusCountData?.data as ProjectsStatusCount[];
    return data ? data.reduce((acc, element) => acc + element.count, 0) : 0;
  }, [projectsStatusCountData?.data]);

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

  return (
    <Card>
      <div className="flex flex-col gap-4 p-4 text-center">
        <h3 className="text-7xl bold">{totalCount}</h3>
        <h4 className="text-lg font-semibold">
          <a href="#glossary" onClick={onGlossaryClick} className="underline capitalize text-sky-800 dark:text-white">
            {intl.formatMessage({ id: 'total-projects' })}
          </a>
        </h4>
      </div>
    </Card>
  );
};

export { TotalProjectsCountCard };

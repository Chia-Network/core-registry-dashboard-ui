import React from 'react';
import { useGetProjectsCountQuery } from '@/api';
import { FormattedMessage } from 'react-intl';
import { IndeterminateProgressOverlay, ProjectsView, SkeletonProjectsView, Tabs, UnitsView } from '@/components';

const Dashboard: React.FC = () => {
  const {
    data: projectsCountData,
    isLoading: projectsCountLoading,
    isFetching: projectsCountFetching,
    error: projectsCountError,
  } = useGetProjectsCountQuery({ status: true });

  if (projectsCountLoading) {
    return <SkeletonProjectsView />;
  }

  if (projectsCountError) {
    return <FormattedMessage id={'unable-to-load-contents'} />;
  }

  if (!projectsCountData) {
    return <FormattedMessage id={'no-records-found'} />;
  }

  return (
    <>
      {projectsCountFetching && <IndeterminateProgressOverlay />}
      <Tabs aria-label="Default tabs" className="pt-4">
        <Tabs.Item title={<FormattedMessage id="projects-view" />} id="projects-view">
          {projectsCountLoading ? (
            <SkeletonProjectsView />
          ) : (
            <ProjectsView data={projectsCountData?.data || []} isLoading={projectsCountLoading} />
          )}
        </Tabs.Item>

        <Tabs.Item title={<FormattedMessage id="units-view" />} id="units-view">
          <div className="p-4">
            <UnitsView />
          </div>
        </Tabs.Item>
      </Tabs>
    </>
  );
};

export { Dashboard };

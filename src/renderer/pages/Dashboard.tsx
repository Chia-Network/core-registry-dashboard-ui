import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useGetIssuedCarbonByMethodologyQuery, useGetProjectsCountQuery } from '@/api';
import { IndeterminateProgressOverlay, ProjectsView, SkeletonProjectsView, Tabs, UnitsView } from '@/components';

const Dashboard: React.FC = () => {
  const {
    data: projectsCountData,
    isLoading: projectsCountLoading,
    isFetching: projectsCountFetching,
    error: projectsCountError,
  } = useGetProjectsCountQuery({ status: true });

  const {
    data: IssuedCarbonByMethodologyData,
    isLoading: IssuedCarbonByMethodologyLoading,
    isFetching: IssuedCarbonByMethodologyFetching,
    error: IssuedCarbonByMethodologyError,
  } = useGetIssuedCarbonByMethodologyQuery({});

  if (projectsCountLoading || IssuedCarbonByMethodologyLoading) {
    return <SkeletonProjectsView />;
  }

  if (projectsCountError || IssuedCarbonByMethodologyError) {
    return <FormattedMessage id={'unable-to-load-contents'} />;
  }

  if (!projectsCountData || !IssuedCarbonByMethodologyData) {
    return <FormattedMessage id={'no-records-found'} />;
  }

  console.log('IssuedCarbonByMethodologyData in d', IssuedCarbonByMethodologyData, IssuedCarbonByMethodologyData.data);
  return (
    <>
      {projectsCountFetching && IssuedCarbonByMethodologyFetching && <IndeterminateProgressOverlay />}
      <Tabs aria-label="Default tabs" className="pt-4">
        <Tabs.Item title={<FormattedMessage id="projects-view" />} id="projects-view">
          {projectsCountLoading ? (
            <SkeletonProjectsView />
          ) : (
            <ProjectsView
              projectsCountData={projectsCountData?.data || []}
              projectsCountIsLoading={projectsCountLoading}
              issuedCarbonByMethodologyData={IssuedCarbonByMethodologyData?.data || { issuedTonsCo2: [] }}
              IssuedCarbonByMethodologyLoading={IssuedCarbonByMethodologyLoading}
            />
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

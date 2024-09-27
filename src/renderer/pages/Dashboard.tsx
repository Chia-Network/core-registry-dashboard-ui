import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  useGetIssuedCarbonByMethodologyQuery,
  useGetIssuedCarbonByProjectTypeQuery,
  useGetProjectsCountQuery,
} from '@/api';
import { IndeterminateProgressOverlay, ProjectsView, SkeletonProjectsView, Tabs, UnitsView } from '@/components';

const Dashboard: React.FC = () => {
  const {
    data: projectsCountData,
    isLoading: projectsCountLoading,
    isFetching: projectsCountFetching,
    error: projectsCountError,
  } = useGetProjectsCountQuery({ status: true });

  const {
    data: issuedCarbonByMethodologyData,
    isLoading: issuedCarbonByMethodologyLoading,
    isFetching: issuedCarbonByMethodologyFetching,
    error: issuedCarbonByMethodologyError,
  } = useGetIssuedCarbonByMethodologyQuery({});

  const {
    data: issuedCarbonByProjectTypeData,
    isLoading: issuedCarbonByProjectTypeLoading,
    isFetching: issuedCarbonByProjectTypeFetching,
    error: issuedCarbonByProjectTypeError,
  } = useGetIssuedCarbonByProjectTypeQuery({});

  if (projectsCountLoading || issuedCarbonByMethodologyLoading || issuedCarbonByProjectTypeLoading) {
    return <SkeletonProjectsView />;
  }

  if (projectsCountError || issuedCarbonByMethodologyError || issuedCarbonByProjectTypeError) {
    return <FormattedMessage id={'unable-to-load-contents'} />;
  }

  if (!projectsCountData || !issuedCarbonByMethodologyData || !issuedCarbonByProjectTypeData) {
    return <FormattedMessage id={'no-records-found'} />;
  }

  return (
    <>
      {projectsCountFetching && issuedCarbonByMethodologyFetching && issuedCarbonByProjectTypeFetching && (
        <IndeterminateProgressOverlay />
      )}
      <Tabs aria-label="Default tabs" className="pt-4">
        <Tabs.Item title={<FormattedMessage id="projects-view" />} id="projects-view">
          {projectsCountLoading ? (
            <SkeletonProjectsView />
          ) : (
            <ProjectsView
              projectsCountData={projectsCountData?.data || []}
              projectsCountIsLoading={projectsCountLoading}
              issuedCarbonByMethodologyData={issuedCarbonByMethodologyData?.data || { issuedTonsCo2: [] }}
              issuedCarbonByMethodologyLoading={issuedCarbonByMethodologyLoading}
              issuedCarbonByProjectTypeData={issuedCarbonByProjectTypeData?.data || { issuedTonsCo2: [] }}
              issuedCarbonByProjectTypeLoading={issuedCarbonByProjectTypeLoading}
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

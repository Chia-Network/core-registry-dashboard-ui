import React, { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import {
  useGetIssuedCarbonByMethodologyQuery,
  useGetIssuedCarbonByProjectTypeQuery,
  useGetProjectsCountQuery,
} from '@/api';
import { SkeletonCard, IndeterminateProgressOverlay, ProjectsTab, Tabs, UnitsTab } from '@/components';
import { useQueryParamState } from '@/hooks';
import { ProjectsHostedCount } from '@/schemas/ProjectsHostedCount.schema';

const Dashboard: React.FC = () => {
  const [hostRegistry /* set func here */] = useQueryParamState('hostRegistry', 'true');

  const {
    data: projectsHostedCountData,
    isLoading: projectsHostedCountLoading,
    error: projectsHostedCountError,
  } = useGetProjectsCountQuery({
    hostRegistry: hostRegistry ? Boolean(hostRegistry) : undefined,
  });

  const {
    data: issuedCarbonByMethodologyData,
    isLoading: issuedCarbonByMethodologyLoading,
    error: issuedCarbonByMethodologyError,
  } = useGetIssuedCarbonByMethodologyQuery({});

  const {
    data: issuedCarbonByProjectTypeData,
    isLoading: issuedCarbonByProjectTypeLoading,
    error: issuedCarbonByProjectTypeError,
  } = useGetIssuedCarbonByProjectTypeQuery({});

  const contentsLoading = useMemo<boolean>(() => {
    return projectsHostedCountLoading || issuedCarbonByMethodologyLoading || issuedCarbonByProjectTypeLoading;
  }, [projectsHostedCountLoading, issuedCarbonByMethodologyLoading, issuedCarbonByProjectTypeLoading]);

  if (contentsLoading) {
    return <SkeletonCard />;
  }

  if (projectsHostedCountError || issuedCarbonByMethodologyError || issuedCarbonByProjectTypeError) {
    return <FormattedMessage id={'unable-to-load-contents'} />;
  }

  if (!projectsHostedCountData && !issuedCarbonByMethodologyData && !issuedCarbonByProjectTypeData) {
    return <FormattedMessage id={'no-records-found'} />;
  }

  return (
    <>
      {contentsLoading && <IndeterminateProgressOverlay />}
      <Tabs aria-label="Default tabs" className="pt-4">
        <Tabs.Item title={<FormattedMessage id="projects-view" />} id="projects-view">
          {contentsLoading ? (
            <SkeletonCard />
          ) : (
            <ProjectsTab
              projectsHostedCountData={projectsHostedCountData?.data as ProjectsHostedCount}
              projectsHostedCountLoading={projectsHostedCountLoading}
              issuedCarbonByMethodologyData={
                issuedCarbonByMethodologyData?.data || { issuedTonsCo2: [], context: 'Methodology' }
              }
              issuedCarbonByMethodologyLoading={issuedCarbonByMethodologyLoading}
              issuedCarbonByProjectTypeData={
                issuedCarbonByProjectTypeData?.data || { issuedTonsCo2: [], context: 'ProjectType' }
              }
              issuedCarbonByProjectTypeLoading={issuedCarbonByProjectTypeLoading}
            />
          )}
        </Tabs.Item>

        <Tabs.Item title={<FormattedMessage id="units-view" />} id="units-view">
          <div className="p-4">
            <UnitsTab />
          </div>
        </Tabs.Item>
      </Tabs>
    </>
  );
};

export { Dashboard };

import React, { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import {
  useGetIssuedCarbonByMethodologyQuery,
  useGetIssuedCarbonByProjectTypeQuery,
  useGetProjectsCountQuery,
} from '@/api';
import { CardSkeleton, IndeterminateProgressOverlay, ProjectsTab, Tabs, UnitsTab } from '@/components';
import { useQueryParamState } from '@/hooks';
import { ProjectsStatusCount } from '@/schemas/ProjectsStatusCount.schema';
import { ProjectsHostedCount } from '@/schemas/ProjectsHostedCount.schema';

const Dashboard: React.FC = () => {
  const [status /* set func here */] = useQueryParamState('status', 'true');
  const [hostRegistry /* set func here */] = useQueryParamState('hostRegistry', 'true');

  const {
    data: projectsStatusCountData,
    isLoading: projectsStatusCountLoading,
    error: projectsStatusCountError,
  } = useGetProjectsCountQuery({
    status: status ? Boolean(status) : undefined,
  });

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
    return (
      projectsStatusCountLoading ||
      projectsHostedCountLoading ||
      issuedCarbonByMethodologyLoading ||
      issuedCarbonByProjectTypeLoading
    );
  }, [
    projectsStatusCountLoading,
    projectsHostedCountLoading,
    issuedCarbonByMethodologyLoading,
    issuedCarbonByProjectTypeLoading,
  ]);

  if (contentsLoading) {
    return <CardSkeleton />;
  }

  if (
    projectsStatusCountError ||
    projectsHostedCountError ||
    issuedCarbonByMethodologyError ||
    issuedCarbonByProjectTypeError
  ) {
    return <FormattedMessage id={'unable-to-load-contents'} />;
  }

  if (
    !projectsStatusCountData &&
    !projectsHostedCountData &&
    !issuedCarbonByMethodologyData &&
    !issuedCarbonByProjectTypeData
  ) {
    return <FormattedMessage id={'no-records-found'} />;
  }

  return (
    <>
      {contentsLoading && <IndeterminateProgressOverlay />}
      <Tabs aria-label="Default tabs" className="pt-4">
        <Tabs.Item title={<FormattedMessage id="projects-view" />} id="projects-view">
          {contentsLoading ? (
            <CardSkeleton />
          ) : (
            <ProjectsTab
              projectsStatusCountData={(projectsStatusCountData?.data as ProjectsStatusCount[]) || []}
              projectsStatusCountLoading={projectsStatusCountLoading}
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

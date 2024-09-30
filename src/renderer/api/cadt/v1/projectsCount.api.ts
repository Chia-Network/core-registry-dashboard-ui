import { isNil } from 'lodash';
import { cadtApi } from './index';
import { ProjectsStatusCount } from '@/schemas/ProjectsStatusCount.schema';
import { ProjectsHostedCount } from '@/schemas/ProjectsHostedCount.schema';

interface GetProjectsCountParams {
  status?: boolean;
  hostRegistry?: boolean;
}

interface GetProjectsStatusCountResponse {
  data: ProjectsStatusCount[];
  success: boolean;
}

interface GetProjectsHostedCountResponse {
  data: ProjectsHostedCount;
  success: boolean;
}

const projectsCountApi = cadtApi.injectEndpoints({
  endpoints: (builder) => ({
    getProjectsCount: builder.query<
      GetProjectsStatusCountResponse | GetProjectsHostedCountResponse,
      GetProjectsCountParams
    >({
      query: ({ status, hostRegistry }: GetProjectsCountParams) => {
        const params: GetProjectsCountParams = {};
        console.log(status, hostRegistry);
        if (isNil(status) && isNil(hostRegistry)) {
          throw new Error('Either status or hostRegistry must be provided');
        }

        if (!isNil(status) && !isNil(hostRegistry)) {
          throw new Error('Both status and hostRegistry cannot be provided at the same time');
        }

        if (!isNil(status)) params.status = status;
        if (!isNil(hostRegistry)) params.hostRegistry = hostRegistry;

        return {
          url: `/v1/statistics/projects`,
          params,
          method: 'GET',
        };
      },
    }),
  }),
});

export const { useGetProjectsCountQuery } = projectsCountApi;

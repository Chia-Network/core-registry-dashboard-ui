import { ProjectsCount } from '@/schemas/ProjectsCount.schema';
import { cadtApi } from './index';

interface GetProjectsCountParams {
  status?: boolean;
  hostRegistry?: boolean;
}

interface GetProjectsCountResponse {
  data: ProjectsCount[];
}

const projectsCount = cadtApi.injectEndpoints({
  endpoints: (builder) => ({
    getProjectsCount: builder.query<GetProjectsCountResponse, GetProjectsCountParams>({
      query: (params: GetProjectsCountParams) => {
        return {
          url: `/v1/statistics/projects`,
          params,
          method: 'GET',
        };
      },
    }),
  }),
});

export const { useGetProjectsCountQuery } = projectsCount;

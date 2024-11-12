import { cadtApi } from './index';
import { IssuedCarbonByProjectType } from '@/schemas/IssuedCarbon.schema';

interface GetIssuedCarbonByProjectTypeParams {
  projectType?: string;
  projectTypeList?: string[];
  vintageYearRangeStart?: string;
  vintageYearRangeEnd?: string;
  vintageYear?: string;
}

interface GetIssuedCarbonByProjectTypeResponse {
  data: IssuedCarbonByProjectType;
  success: boolean;
}

const issuedCarbonByProjectType = cadtApi.injectEndpoints({
  endpoints: (builder) => ({
    getIssuedCarbonByProjectType: builder.query<
      GetIssuedCarbonByProjectTypeResponse,
      GetIssuedCarbonByProjectTypeParams
    >({
      query: ({
        projectType,
        projectTypeList,
        vintageYearRangeStart,
        vintageYearRangeEnd,
        vintageYear,
      }: GetIssuedCarbonByProjectTypeParams) => {
        const params: GetIssuedCarbonByProjectTypeParams = {};

        if (projectType && projectTypeList) {
          throw new Error('Either projectType or projectTypeList must be provided, but not both.');
        }

        if ((vintageYearRangeStart && !vintageYearRangeEnd) || (!vintageYearRangeStart && vintageYearRangeEnd)) {
          throw new Error('vintageYearRangeStart and vintageYearRangeEnd must be provided together.');
        }

        if (vintageYear && (vintageYearRangeStart || vintageYearRangeEnd)) {
          throw new Error(
            'Either vintageYear or vintageYearRange (vintageYearRangeStart and vintageYearRangeEnd) must be provided, but not both.',
          );
        }

        if (projectType) {
          params.projectType = projectType;
        } else if (projectTypeList) {
          params.projectTypeList = projectTypeList;
        }

        if (vintageYear) {
          params.vintageYear = vintageYear;
        } else if (vintageYearRangeStart && vintageYearRangeEnd) {
          params.vintageYearRangeStart = vintageYearRangeStart;
          params.vintageYearRangeEnd = vintageYearRangeEnd;
        }

        return {
          url: '/v1/statistics/issuedCarbonByProjectType',
          params: params,
          method: 'GET',
        };
      },
      keepUnusedDataFor: 600,
    }),
  }),
});

export const { useGetIssuedCarbonByProjectTypeQuery } = issuedCarbonByProjectType;

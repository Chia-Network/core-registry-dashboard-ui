import { cadtApi } from './index';
import { IssuedCarbonByMethodology } from '@/schemas/IssuedCarbonByMethodology.schema';

interface GetIssuedCarbonByMethodologyParams {
  methodology?: string;
  methodologyList?: string[];
  vintageYearRangeStart?: string;
  vintageYearRangeEnd?: string;
  vintageYear?: string;
}

interface GetIssuedCarbonByMethodologyResponse {
  data: IssuedCarbonByMethodology;
  success: boolean;
}

const issuedCarbonByMethodology = cadtApi.injectEndpoints({
  endpoints: (builder) => ({
    getIssuedCarbonByMethodology: builder.query<
      GetIssuedCarbonByMethodologyResponse,
      GetIssuedCarbonByMethodologyParams
    >({
      query: ({
        methodology,
        methodologyList,
        vintageYearRangeStart,
        vintageYearRangeEnd,
        vintageYear,
      }: GetIssuedCarbonByMethodologyParams) => {
        const params: GetIssuedCarbonByMethodologyParams = {};

        if (methodology && methodologyList) {
          throw new Error('Either methodology or methodologyList must be provided, but not both.');
        }

        if ((vintageYearRangeStart && !vintageYearRangeEnd) || (!vintageYearRangeStart && vintageYearRangeEnd)) {
          throw new Error('vintageYearRangeStart and vintageYearRangeEnd must be provided together.');
        }

        if (vintageYear && (vintageYearRangeStart || vintageYearRangeEnd)) {
          throw new Error(
            'Either vintageYear or vintageYearRange (vintageYearRangeStart and vintageYearRangeEnd) must be provided, but not both.',
          );
        }

        if (methodology) {
          params.methodology = methodology;
        } else if (methodologyList) {
          params.methodologyList = methodologyList;
        }

        if (vintageYear) {
          params.vintageYear = vintageYear;
        } else if (vintageYearRangeStart && vintageYearRangeEnd) {
          params.vintageYearRangeStart = vintageYearRangeStart;
          params.vintageYearRangeEnd = vintageYearRangeEnd;
        }

        return {
          url: '/v1/statistics/issuedCarbonByMethodology',
          params: params,
          method: 'GET',
        };
      },
    }),
  }),
});

export const { useGetIssuedCarbonByMethodologyQuery } = issuedCarbonByMethodology;

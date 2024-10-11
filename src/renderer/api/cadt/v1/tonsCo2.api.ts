import { cadtApi } from './index';

interface TonsCo2Params {
  unitStatus?: string;
  unitStatusList?: string[];
  vintageYearRangeStart?: string;
  vintageYearRangeEnd?: string;
  vintageYear?: string;
  unitType?: string;
  unitTypeList?: string[];
}

interface TonsCo2Response {
  data: any;
}

const tonsCo2Api = cadtApi.injectEndpoints({
  endpoints: (builder) => ({
    getTonsCo2: builder.query<TonsCo2Response, TonsCo2Params>({
      query: ({
        unitStatus,
        unitStatusList,
        vintageYearRangeStart,
        vintageYearRangeEnd,
        vintageYear,
        unitType,
        unitTypeList,
      }: TonsCo2Params) => {
        const params: TonsCo2Params = {};

        if (unitStatus && unitStatusList) {
          throw new Error('Either unitStatus or unitStatusList must be provided, but not both.');
        }

        if (unitType && unitTypeList) {
          throw new Error('Either unitType or unitTypeList must be provided, but not both.');
        }

        if ((vintageYearRangeStart && !vintageYearRangeEnd) || (!vintageYearRangeStart && vintageYearRangeEnd)) {
          throw new Error('vintageYearRangeStart and vintageYearRangeEnd must be provided together.');
        }

        if (vintageYear && (vintageYearRangeStart || vintageYearRangeEnd)) {
          throw new Error(
            'Either vintageYear or vintageYearRange (vintageYearRangeStart and vintageYearRangeEnd) must be provided, but not both.',
          );
        }

        if (unitStatus) {
          params.unitStatus = unitStatus;
        } else if (unitStatusList) {
          params.unitStatusList = unitStatusList;
        }

        if (unitType) {
          params.unitType = unitType;
        } else if (unitTypeList) {
          params.unitTypeList = unitTypeList;
        }

        if (vintageYear) {
          params.vintageYear = vintageYear;
        } else if (vintageYearRangeStart && vintageYearRangeEnd) {
          params.vintageYearRangeStart = vintageYearRangeStart;
          params.vintageYearRangeEnd = vintageYearRangeEnd;
        }

        return {
          url: `/v1/statistics/tonsCo2`,
          params,
          method: 'GET',
        };
      },
      keepUnusedDataFor: 600,
    }),
  }),
});

export const { useGetTonsCo2Query } = tonsCo2Api;

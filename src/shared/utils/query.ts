import { QueryClient, UseQueryResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      notifyOnChangeProps: ['data', 'fetchStatus'],
      retry: false,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    },
  },
});

type FortmattedAxiosResponse = AxiosResponse<{
  result: any;
  errorCode: number;
  errorDetails: string;
  message: string;
}>;

type FortmattedQueryResult = UseQueryResult<FortmattedAxiosResponse, any>;

export type PrettifyResult<T> = {
  result: T | null;
  loading: boolean;
} & Omit<FortmattedQueryResult, 'data'>;

export type PrettifyQueryManyResult<T> = {
  items: T[];
  total: number;
  loading: boolean;
} & Omit<FortmattedQueryResult, 'data'>;

export const prettifyQueryResult = <T = any>(result: FortmattedQueryResult): PrettifyResult<T> => {
  const { data: axiosResponse, ...rest } = result;

  return {
    result: axiosResponse?.data?.result,
    loading: rest.fetchStatus === 'fetching',
    ...rest,
  };
};

export const prettifyQueryManyResult = <T = any>(
  queryResult: FortmattedQueryResult
): PrettifyQueryManyResult<T> => {
  const { data: axiosResponse, ...rest } = queryResult;

  return {
    items: axiosResponse?.data?.result?.data || [],
    total: axiosResponse?.data?.result?.meta?.itemCount || 0,
    loading: rest.fetchStatus === 'fetching',
    ...rest,
  };
};

export const makeRequest = async (api: Promise<FortmattedAxiosResponse>, select?: string) => {
  try {
    const axiosResponse = await api;
    if (select) {
      if (axiosResponse?.data?.result[select]) {
        return axiosResponse?.data?.result[select];
      }
      return null;
    }
    return axiosResponse?.data?.result;
  } catch (error) {
    console.log(error);
  }
};

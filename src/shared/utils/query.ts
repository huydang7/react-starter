import { QueryClient, UseMutationResult, UseQueryResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      notifyOnChangeProps: ['data', 'status'],
      retry: false,
      refetchOnWindowFocus: false,
      enabled: false,
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
type FortmattedMutationResult = UseMutationResult<FortmattedAxiosResponse, any>;

export type PrettifyResult<T> = {
  result: T | null;
  loading: boolean;
} & Omit<FortmattedQueryResult, 'data'>;

export type PrettifyMutationResult<T> = {
  result: T | null;
  loading: boolean;
} & Omit<FortmattedMutationResult, 'data'>;

export type PrettifyQueryManyResult<T> = {
  rows: T[];
  total: number;
  loading: boolean;
} & Omit<FortmattedQueryResult, 'data'>;

export const prettifyQueryResult = <T = any>(result: FortmattedQueryResult): PrettifyResult<T> => {
  const { data: axiosResponse, ...rest } = result;

  return {
    result: axiosResponse?.data?.result,
    loading: rest.status === 'loading',
    ...rest,
  };
};

export const prettifyQueryManyResult = <T = any>(
  queryResult: FortmattedQueryResult
): PrettifyQueryManyResult<T> => {
  const { data: axiosResponse, ...rest } = queryResult;

  return {
    rows: axiosResponse?.data?.result?.rows || [],
    total: axiosResponse?.data?.result?.count || 0,
    loading: rest.status === 'loading',
    ...rest,
  };
};

export const prettifyMutationResult = <T = any>(
  result: FortmattedMutationResult
): PrettifyMutationResult<T> => {
  const { data: axiosResponse, ...rest } = result;

  return {
    result: axiosResponse?.data?.result,
    loading: rest.status === 'loading',
    ...rest,
  };
};

export const makeRequest = async (api: Promise<AxiosResponse<any, any>>, select?: string) => {
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

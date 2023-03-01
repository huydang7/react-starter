import { QueryClient, UseQueryResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
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

type PrettifyResult<T> = {
  result: T | null;
} & Omit<FortmattedQueryResult, "data">;

type PrettifyQueryManyResult<T> = {
  rows: T[];
  count: number;
  total: number;
} & Omit<FortmattedQueryResult, "data">;

export const prettifyResult = <T = any>(
  result: FortmattedQueryResult
): PrettifyResult<T> => {
  const { data: axiosResponse, ...rest } = result;

  return {
    result: axiosResponse?.data?.result,
    ...rest,
  };
};

export const prettifyQueryMany = <T = any>(
  queryResult: FortmattedQueryResult
): PrettifyQueryManyResult<T> => {
  const { data: axiosResponse, ...rest } = queryResult;

  return {
    rows: axiosResponse?.data?.result?.rows || [],
    count: axiosResponse?.data?.result?.count || 0,
    total: axiosResponse?.data?.result?.count || 0,
    ...rest,
  };
};

export const makeRequest = async (
  api: Promise<AxiosResponse<any, any>>,
  select?: string
) => {
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

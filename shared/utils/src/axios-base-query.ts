import { BaseQueryFn } from '@rtk-incubator/rtk-query';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

export const axiosBaseQuery = (
  { baseUrl }: { baseUrl: string } = { baseUrl: '' }
): BaseQueryFn<{
  url: string;
  method: AxiosRequestConfig['method'];
  data?: AxiosRequestConfig['data'];
  params?: AxiosRequestConfig['params'];
  paramsSerializer?: AxiosRequestConfig['paramsSerializer'];
}> => async ({ url, method, data, params, paramsSerializer }) => {
  try {
    const result = await axios({ url: baseUrl + url, method, data, params, paramsSerializer });
    return { data: result.data };
  } catch (axiosError) {
    const err = axiosError as AxiosError;
    return { error: { status: err.response?.status, data: err.response?.data } };
  }
};

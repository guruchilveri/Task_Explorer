import apiService from '../../apiService';
import { AuthEndpoints } from '../../endPoints';
import { AxiosError } from 'axios';

export interface ILoginResponse {
  completed: boolean
  id: number
  title: string
  userId: number
};

export const performLoginOperation = async () => {
  try {
    const response = await apiService<ILoginResponse>('GET', AuthEndpoints.login);
    return response;

  } catch (error) {
    const axiosError = error as AxiosError;
    throw axiosError;
  }
};
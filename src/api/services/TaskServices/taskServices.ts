import apiService from '../../apiService';
import { TaskEndpoints } from '../../endPoints';
import { AxiosError } from 'axios';

export interface ITask {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

export const getAllTasks = async () => {
  try {
    const response = await apiService<ITask[]>('GET', TaskEndpoints.getAllTasks);
    return response;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw axiosError;
  }
};

export const getTaskById = async (taskId: number) => {
  try {
    const response = await apiService<ITask>('GET', TaskEndpoints.getTask(taskId));
    return response;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw axiosError;
  }
};
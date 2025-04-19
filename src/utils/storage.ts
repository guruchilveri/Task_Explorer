import AsyncStorage from '@react-native-async-storage/async-storage';
import { ITask } from '../api/services/TaskServices/taskServices';

const STORAGE_KEYS = {
  TASKS: '@task_explorer_tasks',
  LAST_FETCH: '@task_explorer_last_fetch',
  USERS: '@task_explorer_users',
  CURRENT_USER: '@task_explorer_current_user',
};

export const storeTasks = async (tasks: ITask[]) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
    await AsyncStorage.setItem(STORAGE_KEYS.LAST_FETCH, new Date().toISOString());
  } catch (error) {
    console.error('Error storing tasks:', error);
  }
};

export const getStoredTasks = async (): Promise<ITask[]> => {
  try {
    const tasksString = await AsyncStorage.getItem(STORAGE_KEYS.TASKS);
    return tasksString ? JSON.parse(tasksString) : [];
  } catch (error) {
    console.error('Error retrieving tasks:', error);
    return [];
  }
};

export const updateStoredTask = async (updatedTask: ITask) => {
  try {
    const tasks = await getStoredTasks();
    const updatedTasks = tasks.map(task =>
      task.id === updatedTask.id ? updatedTask : task
    );
    await storeTasks(updatedTasks);
    return updatedTasks;
  } catch (error) {
    console.error('Error updating task:', error);
    return null;
  }
};

export const getLastFetchTime = async (): Promise<Date | null> => {
  try {
    const lastFetch = await AsyncStorage.getItem(STORAGE_KEYS.LAST_FETCH);
    return lastFetch ? new Date(lastFetch) : null;
  } catch (error) {
    console.error('Error getting last fetch time:', error);
    return null;
  }
};

interface User {
  name: string;
  email: string;
  password: string;
}

export const storeUser = async (user: User) => {
  try {
    const users = await getUsers();
    const existingUser = users.find(u => u.email === user.email);
    if (existingUser) {
      throw new Error('User already exists');
    }
    users.push(user);
    await AsyncStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    return true;
  } catch (error) {
    console.error('Error storing user:', error);
    throw error;
  }
};

export const getUsers = async (): Promise<User[]> => {
  try {
    const usersString = await AsyncStorage.getItem(STORAGE_KEYS.USERS);
    return usersString ? JSON.parse(usersString) : [];
  } catch (error) {
    console.error('Error retrieving users:', error);
    return [];
  }
};

export const validateUser = async (email: string, password: string): Promise<User | null> => {
  try {
    const users = await getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    return user || null;
  } catch (error) {
    console.error('Error validating user:', error);
    return null;
  }
};
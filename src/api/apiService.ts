import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { debugLog } from '../Components';

// Base URL for your API
const API_BASE_URL = 'https://jsonplaceholder.typicode.com/'; // Replace with your actual API base URL

// Create an axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to get the token (you can replace this with your actual logic)
const getToken = (): string | null => {
  // Retrieve token from AsyncStorage, Redux, or Context (example)
  return 'your-access-token'; // Replace with actual token fetching logic
};

// Common function to perform API requests
const apiService = async <T>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  endpoint: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any,
  config?: AxiosRequestConfig,
  requiresToken: boolean = false, // Flag to indicate if the API call needs a token
): Promise<AxiosResponse<T>> => {  // Return the full AxiosResponse, not just the data
  try {
    // Add token to headers if required
    const headers = requiresToken
      ? { Authorization: `Bearer ${getToken()}` }
      : {};

    const response: AxiosResponse<T> = await apiClient({
      method,
      url: endpoint,
      data,
      headers: { ...headers, ...config?.headers }, // Merge headers with any custom ones passed in config
      ...config,
    });

    // Return the full response object
    return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // Typecast the error as AxiosError to access its specific properties
    const axiosError = error as AxiosError;

    // Logging error for debugging
    debugLog(`API Error: ${axiosError.response?.status} - ${axiosError.message}`);

    // Handle the error properly, return more detailed error if needed
    throw axiosError.response?.data || axiosError.message || 'Unknown error';
  }
};

export default apiService;

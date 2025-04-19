export const AuthEndpoints = {
  login: '/todos/1',
};

export const TaskEndpoints = {
  getAllTasks: '/todos',
  getTask: (id: number) => `/todos/${id}`,
};

export const MainEndpoints = {
  userDetails: '/user-details',
};
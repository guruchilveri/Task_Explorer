export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
};

export type MainStackParamList = {
  Tabs: undefined;
  TaskDetail: { taskId: number };
};

export type TabStackParamList = {
  Tasks: undefined;
};
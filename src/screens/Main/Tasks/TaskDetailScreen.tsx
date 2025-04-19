import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { AppBackground, TextComponent, Loader, Button } from '../../../Components';
import { getTaskById } from '../../../api/services/TaskServices/taskServices';
import type { ITask } from '../../../api/services/TaskServices/taskServices';
import { ColorTheme } from '../../../assets';
import AppStyles from '../../../utils/AppStyles';
import { updateStoredTask, getStoredTasks } from '../../../utils/storage';

type RootStackParamList = {
  TaskDetail: { taskId: number };
};

type TaskDetailScreenRouteProp = RouteProp<RootStackParamList, 'TaskDetail'>;

const TaskDetailScreen = () => {
  const route = useRoute<TaskDetailScreenRouteProp>();
  const [task, setTask] = useState<ITask | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const loadStoredTask = async () => {
    const storedTasks = await getStoredTasks();
    const storedTask = storedTasks.find(t => t.id === route.params.taskId);
    if (storedTask) {
      setTask(storedTask);
      return true;
    }
    return false;
  };

  const fetchTaskDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getTaskById(route.params.taskId);
      if (response?.status === 200) {
        setTask(response.data);
      }
    } catch (err) {
      setError('Failed to fetch task details. Please try again.');
      // Try to load from storage if network fetch fails
      const loaded = await loadStoredTask();
      if (!loaded) {
        setError('Task details are not available offline.');
      }
    } finally {
      setLoading(false);
    }
  };

  const animateTask = () => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 20,
        friction: 2,
        useNativeDriver: true,
      })
    ]).start();
  };

  useEffect(() => {
    const initializeTask = async () => {
      fadeAnim.setValue(0);
      scaleAnim.setValue(0.8);
      await loadStoredTask();
      fetchTaskDetails();
      animateTask();
    };
    initializeTask();
  }, [route.params.taskId]);

  const animateToggle = () => {
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 0.95,
        tension: 100,
        friction: 5,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 3,
        useNativeDriver: true,
      })
    ]).start();
  };

  const toggleTaskStatus = async () => {
    if (task) {
      animateToggle();
      const updatedTask = {
        ...task,
        completed: !task.completed,
      };
      setTask(updatedTask);

      // Update in storage
      const result = await updateStoredTask(updatedTask);
      if (!result) {
        setError('Failed to update task status.');
        setTask(task); // Revert the change if storage update fails
      }
    }
  };

  return (
    <AppBackground>
      <View style={styles.container}>
        {error ? (
          <View style={styles.errorContainer}>
            <TextComponent style={styles.errorText}>{error}</TextComponent>
            <Button
              text="Retry"
              onPress={fetchTaskDetails}
              buttonStyle={{
                paddingVertical: 8,
                paddingHorizontal: 16,
              }}
            />
          </View>
        ) : task ? (
          <Animated.View style={[
            styles.card,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }]
            }
          ]}>
            <TextComponent style={styles.label}>Title</TextComponent>
            <TextComponent style={styles.title}>{task.title}</TextComponent>

            <TextComponent style={styles.label}>User ID</TextComponent>
            <TextComponent style={styles.value}>{task.userId}</TextComponent>

            <TextComponent style={styles.label}>Status</TextComponent>
            <TextComponent style={[
              styles.status,
              { color: task.completed ? ColorTheme.Success : ColorTheme.Error }
            ]}>
              {task.completed ? '✓ Completed' : '✗ Incomplete'}
            </TextComponent>

            <Button
              text={`Mark as ${task.completed ? 'Incomplete' : 'Complete'}`}
              onPress={toggleTaskStatus}
              buttonStyle={{
                marginTop: 24,
                backgroundColor: task.completed ? ColorTheme.Error : ColorTheme.Success
              }}
            />
          </Animated.View>
        ) : null}
      </View>
      <Loader isVisible={loading} />
    </AppBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: ColorTheme.White,
    borderRadius: 8,
    padding: 16,
    ...AppStyles.shadow,
  },
  label: {
    color: ColorTheme.Grey,
    fontSize: 14,
    marginTop: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 4,
  },
  value: {
    fontSize: 16,
    marginTop: 4,
  },
  status: {
    fontSize: 16,
    marginTop: 4,
    fontWeight: 'bold',
  },
  toggleButton: {
    marginTop: 24,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  toggleButtonText: {
    color: ColorTheme.White,
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  errorText: {
    color: ColorTheme.Error,
    marginBottom: 16,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: ColorTheme.ThemeColor,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  retryText: {
    color: ColorTheme.White,
  },
});

export default TaskDetailScreen;
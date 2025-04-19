import React, { useEffect, useState, useCallback, useRef } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet, RefreshControl, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppBackground, TextComponent, Loader, Button } from '../../../Components';
import { getAllTasks } from '../../../api/services/TaskServices/taskServices';
import type { ITask } from '../../../api/services/TaskServices/taskServices';
import { ColorTheme } from '../../../assets';
import AppStyles from '../../../utils/AppStyles';
import { MainStackParamList } from '../../../navigation/types';
import { getStoredTasks, storeTasks } from '../../../utils/storage';

type FilterType = 'all' | 'completed' | 'incomplete';
type HomeScreenNavigationProp = NativeStackNavigationProp<MainStackParamList, 'Tabs'>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterType>('all');
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const loadStoredTasks = async () => {
    const storedTasks = await getStoredTasks();
    if (storedTasks.length > 0) {
      setTasks(storedTasks);
      animateTasks();
    }
  };

  const animateTasks = useCallback(() => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const fetchTasks = async (showLoader = true) => {
    if (showLoader) {
      setLoading(true);
    }
    setError(null);
    try {
      const response = await getAllTasks();
      if (response?.status === 200 && Array.isArray(response.data)) {
        setTasks(response.data);
        await storeTasks(response.data);
        animateTasks();
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      console.error('Task fetch error:', err);
      setError('Failed to fetch tasks. Please try again.');
      // Try to load from storage as fallback
      await loadStoredTasks();
    } finally {
      if (showLoader) {
        setLoading(false);
      }
      setRefreshing(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchTasks(false);
  }, []);

  useEffect(() => {
    const initializeTasks = async () => {
      await loadStoredTasks();
      fetchTasks();
    };
    initializeTasks();
  }, []);

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true;
  });

  const renderTask = ({ item }: { item: ITask }) => (
    <Animated.View
      style={[
        styles.taskItem,
        {
          opacity: fadeAnim
        }
      ]}
    >
      <TouchableOpacity
        onPress={() => navigation.navigate('TaskDetail', { taskId: item.id })}
      >
        <View style={styles.taskContent}>
          <TextComponent style={styles.taskTitle}>{item.title}</TextComponent>
          <TextComponent style={[
            styles.status,
            { color: item.completed ? ColorTheme.Success : ColorTheme.Error }
          ]}>
            {item.completed ? '✓ Completed' : '✗ Incomplete'}
          </TextComponent>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  const FilterButton = ({ type, label }: { type: FilterType; label: string }) => (
    <Button
      text={label}
      onPress={() => setFilter(type)}
      buttonStyle={[
        {
          paddingVertical: 8,
          paddingHorizontal: 16,
          borderRadius: 20,
          backgroundColor: filter === type ? ColorTheme.ThemeColor : ColorTheme.White,
        },
      ]}
      textStyle={{
        color: filter === type ? ColorTheme.White : ColorTheme.ThemeColor,
        fontSize: 14,
      }}
    />
  );

  return (
    <AppBackground>
      <View style={styles.container}>
        <View style={styles.filterContainer}>
          <FilterButton type="all" label="All" />
          <FilterButton type="completed" label="Completed" />
          <FilterButton type="incomplete" label="Incomplete" />
        </View>

        {error ? (
          <View style={styles.errorContainer}>
            <TextComponent style={styles.errorText}>{error}</TextComponent>
            <Button
              text="Retry"
              onPress={() => fetchTasks()}
              buttonStyle={{
                paddingVertical: 8,
                paddingHorizontal: 16,
              }}
            />
          </View>
        ) : (
          <FlatList
            data={filteredTasks}
            renderItem={renderTask}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.listContainer}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={[ColorTheme.ThemeColor]}
              />
            }
          />
        )}
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
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    justifyContent: 'space-around',
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: ColorTheme.White,
  },
  activeFilter: {
    backgroundColor: ColorTheme.ThemeColor,
  },
  filterText: {
    color: ColorTheme.ThemeColor,
  },
  activeFilterText: {
    color: ColorTheme.White,
  },
  listContainer: {
    flexGrow: 1,
  },
  taskItem: {
    backgroundColor: ColorTheme.White,
    borderRadius: 8,
    marginBottom: 8,
    padding: 16,
    ...AppStyles.shadow,
  },
  taskContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskTitle: {
    flex: 1,
    marginRight: 8,
  },
  status: {
    fontSize: 12,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: ColorTheme.Error,
    marginBottom: 16,
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

export default HomeScreen;
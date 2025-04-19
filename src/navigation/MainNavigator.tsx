import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import TaskDetailScreen from '../screens/Main/Tasks/TaskDetailScreen';
import { MainStackParamList } from './types';

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Tabs' component={TabNavigator} />
            <Stack.Screen
                name='TaskDetail'
                component={TaskDetailScreen}
                options={{
                    headerShown: true,
                    title: 'Task Details',
                }}
            />
        </Stack.Navigator>
    );
};

export default MainNavigator;
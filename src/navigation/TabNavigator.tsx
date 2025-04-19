import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Main/Tasks/HomeScreen';
import { TabStackParamList } from './types';
import { TextComponent, Button } from '../Components';
import { useAuth } from '../context/AuthContext';
import { ColorTheme } from '../assets';
import Images from '../assets/images';

const Tab = createBottomTabNavigator<TabStackParamList>();

const TabNavigator = () => {
    const { logout } = useAuth();

    return (
        <Tab.Navigator screenOptions={{ headerShown: true }}>
            <Tab.Screen
                name="Tasks"
                component={HomeScreen}
                options={{
                    title: 'Task Explorer',
                    headerTitleAlign: 'center',
                    tabBarIcon: ({ focused }) => (
                        <Images.AvailableSlots
                            width={24}
                            height={24}
                            fill={focused ? ColorTheme.ThemeColor : ColorTheme.Grey}
                        />
                    ),
                    headerRight: () => (
                        <Button
                            text="Logout"
                            onPress={logout}
                            buttonStyle={{
                                marginRight: 16,
                                backgroundColor: 'transparent',
                                elevation: 0,
                                shadowOpacity: 0,
                                paddingVertical: 8,
                                paddingHorizontal: 12,
                            }}
                            textStyle={{
                                color: ColorTheme.Error,
                                fontSize: 14,
                            }}
                        />
                    )
                }}
            />
        </Tab.Navigator>
    );
};

export default TabNavigator;
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import { RootStackParamList } from './types';
import { AuthProvider, useAuth } from '../context/AuthContext';

const RootStack = createNativeStackNavigator<RootStackParamList>();

const NavigationContent = () => {
    const { isLoggedIn } = useAuth();

    return (
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
            {isLoggedIn ? (
                <RootStack.Screen name="Main" component={MainNavigator} />
            ) : (
                <RootStack.Screen name="Auth" component={AuthNavigator} />
            )}
        </RootStack.Navigator>
    );
};

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <AuthProvider>
                <NavigationContent />
            </AuthProvider>
        </NavigationContainer>
    );
};

export default AppNavigator;

import React, { useEffect, useState } from 'react';
import { Animated } from 'react-native';
import { TextComponent } from '../index';
import AppStyles from '../../utils/AppStyles';
import { ColorTheme } from '../../assets';
import styles from './StyleToast';

interface ToastProps {
  message: string;
  visible: boolean;
  type?: 'success' | 'error';
}

const Toast: React.FC<ToastProps> = ({ message, visible, type = 'success' }) => {
  const [position] = useState(new Animated.Value(-100)); // Start above the screen

  useEffect(() => {
    if (visible) {
      // Slide down with bounce effect
      Animated.spring(position, {
        toValue: 50, // Position where it will settle
        tension: 3, // Controls bounce effect
        friction: 2, // Controls resistance
        useNativeDriver: true,
      }).start();

      setTimeout(() => {
        // Slide back up
        Animated.timing(position, {
          toValue: -100, // Move out of screen
          duration: 500,
          useNativeDriver: true,
        }).start();
      }, 3002);
    }
  }, [visible]);

  return (
    <Animated.View style={[
      styles.toast,
      type === 'success' ? styles.success : styles.error,
      { transform: [{ translateY: position }] },
    ]}>
      <TextComponent style={[AppStyles.H5, { color: ColorTheme.White }]}>
        {type === 'success' ? 'Success' : 'Error'}
      </TextComponent>
      <TextComponent style={[AppStyles.Body1, { color: ColorTheme.White }]}>
        {message}
      </TextComponent>
    </Animated.View>
  );
};

export default Toast;
